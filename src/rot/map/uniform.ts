
import { Map } from './map'
import { Feature, Room, Corridor } from './features';
import '../extensions/array';

export interface UniformOptions {
    roomWidth?: [number, number];
    roomHeight?: [number, number];
    roomDugPercentage?: number;
    timeLimit?: number;
}

/**
 * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
 * @augments ROT.Map.Dungeon
 */
export class Uniform extends Map {

	private _options;
	private _roomAttempts: number;
	private _corridorAttempts: number;
	private _connected;
	private _unconnected;
	private _map;
	private _dug;
	private _rooms;
	private _corridors;

    constructor(width: number = null, height: number = null, options: UniformOptions = {}) {
        super(width, height);

        this._options = {
            roomWidth: [3, 9], /* room minimum and maximum width */
            roomHeight: [3, 5], /* room minimum and maximum height */
            roomDugPercentage: 0.1, /* we stop after this percentage of level area has been dug out by rooms */
            timeLimit: 1000 /* we stop after this much time has passed (msec) */
        };
        for (const p in options) { this._options[p] = options[p]; }

        this._roomAttempts = 20; /* new room is created N-times until is considered as impossible to generate */
        this._corridorAttempts = 20; /* corridors are tried N-times until the level is considered as impossible to connect */

        this._connected = []; /* list of already connected rooms */
        this._unconnected = []; /* list of remaining unconnected rooms */
        
        this._digCallback = this._digCallback.bind(this);
        this._canBeDugCallback = this._canBeDugCallback.bind(this);
        this._isWallCallback = this._isWallCallback.bind(this);
    }

    /**
     * Create a map. If the time limit has been hit, returns null.
     * @see ROT.Map#create
     */
    create(callback) {
        const t1 = Date.now();
        while (1) {
            const t2 = Date.now();
            if (t2 - t1 > this._options.timeLimit) { return null; } /* time limit! */
        
            this._map = this._fillMap(1);
            this._dug = 0;
            this._rooms = [];
            this._unconnected = [];
            this._generateRooms();
            if (this._rooms.length < 2) { continue; }
            if (this._generateCorridors()) { break; }
        }
        
        if (callback) {
            for (let i=0;i<this._width;i++) {
                for (let j=0;j<this._height;j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
        }
        
        return this;
    }

    /**
     * Generates a suitable amount of rooms
     */
    private _generateRooms() {
        const w = this._width-2;
        const h = this._height-2;

        do {
            var room = this._generateRoom();
            if (this._dug/(w*h) > this._options.roomDugPercentage) { break; } /* achieved requested amount of free space */
        } while (room);

        /* either enough rooms, or not able to generate more of them :) */
    }

    /**
     * Try to generate one room
     */
    private _generateRoom() {
        let count = 0;
        while (count < this._roomAttempts) {
            count++;
            
            const room = Room.createRandom(this._width, this._height, this._options);
            if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) { continue; }
            
            room.create(this._digCallback);
            this._rooms.push(room);
            return room;
        } 

        /* no room was generated in a given number of attempts */
        return null;
    }

    /**
     * Generates connectors beween rooms
     * @returns {bool} success Was this attempt successfull?
     */
    private _generateCorridors() {
        let cnt = 0;
        while (cnt < this._corridorAttempts) {
            cnt++;
            this._corridors = [];

            /* dig rooms into a clear map */
            this._map = this._fillMap(1);
            for (let i=0;i<this._rooms.length;i++) { 
                const room = this._rooms[i];
                room.clearDoors();
                room.create(this._digCallback); 
            }

            this._unconnected = this._rooms.slice().randomize();
            this._connected = [];
            if (this._unconnected.length) { this._connected.push(this._unconnected.pop()); } /* first one is always connected */
            
            while (1) {
                /* 1. pick random connected room */
                const connected = this._connected.random();
                
                /* 2. find closest unconnected */
                const room1 = this._closestRoom(this._unconnected, connected);
                
                /* 3. connect it to closest connected */
                const room2 = this._closestRoom(this._connected, room1);
                
                const ok = this._connectRooms(room1, room2);
                if (!ok) { break; } /* stop connecting, re-shuffle */
                
                if (!this._unconnected.length) { return true; } /* done; no rooms remain */
            }
        }
        return false;
    }

    /**
     * For a given room, find the closest one from the list
     */
    private _closestRoom(rooms, room) {
        let dist = Infinity;
        const center = room.getCenter();
        let result = null;
        
        for (let i=0;i<rooms.length;i++) {
            const r = rooms[i];
            const c = r.getCenter();
            const dx = c[0]-center[0];
            const dy = c[1]-center[1];
            const d = dx*dx+dy*dy;
            
            if (d < dist) {
                dist = d;
                result = r;
            }
        }
        
        return result;
    }

    private _connectRooms(room1, room2) {
        /*
            room1.debug();
            room2.debug();
        */

        const center1 = room1.getCenter();
        const center2 = room2.getCenter();

        const diffX = center2[0] - center1[0];
        const diffY = center2[1] - center1[1];

		let end: number[];
		let index:number;
		let dirIndex1: number;
		let dirIndex2: number;
		let min: number;
		let max: number;

        if (Math.abs(diffX) < Math.abs(diffY)) { /* first try connecting north-south walls */
            dirIndex1 = (diffY > 0 ? 2 : 0);
            dirIndex2 = (dirIndex1 + 2) % 4;
            min = room2.getLeft();
            max = room2.getRight();
           	index = 0;
        } else { /* first try connecting east-west walls */
            dirIndex1 = (diffX > 0 ? 1 : 3);
            dirIndex2 = (dirIndex1 + 2) % 4;
            min = room2.getTop();
            max = room2.getBottom();
            index = 1;
        }

        const start = this._placeInWall(room1, dirIndex1); /* corridor will start here */
        if (!start) { return false; }

        if (start[index] >= min && start[index] <= max) { /* possible to connect with straight line (I-like) */
            end = start.slice();
            let value = null;
            switch (dirIndex2) {
                case 0: value = room2.getTop()-1; break;
                case 1: value = room2.getRight()+1; break;
                case 2: value = room2.getBottom()+1; break;
                case 3: value = room2.getLeft()-1; break;
            }
            end[(index+1)%2] = value;
            this._digLine([start, end]);
            
        } else if (start[index] < min-1 || start[index] > max+1) { /* need to switch target wall (L-like) */

            const diff = start[index] - center2[index];
            switch (dirIndex2) {
                case 0:
                case 1:	var rotation = (diff < 0 ? 3 : 1); break;
                case 2:
                case 3:	var rotation = (diff < 0 ? 1 : 3); break;
            }
            dirIndex2 = (dirIndex2 + rotation) % 4;
            
            end = this._placeInWall(room2, dirIndex2);
            if (!end) { return false; }

            let mid = [0, 0];
            mid[index] = start[index];
            let index2 = (index+1)%2;
            mid[index2] = end[index2];
            this._digLine([start, mid, end]);
            
        } else { /* use current wall pair, but adjust the line in the middle (S-like) */
        
            let index2 = (index+1)%2;
            end = this._placeInWall(room2, dirIndex2);
            if (!end) { return false; }
            let mid = Math.round((end[index2] + start[index2])/2);

            const mid1 = [0, 0];
            const mid2 = [0, 0];
            mid1[index] = start[index];
            mid1[index2] = mid;
            mid2[index] = end[index];
            mid2[index2] = mid;
            this._digLine([start, mid1, mid2, end]);
        }

        room1.addDoor(start[0], start[1]);
        room2.addDoor(end[0], end[1]);
        
        index = this._unconnected.indexOf(room1);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room1);
        }

        index = this._unconnected.indexOf(room2);
        if (index != -1) {
            this._unconnected.splice(index, 1);
            this._connected.push(room2);
        }
        
        return true;
    }

    private _placeInWall(room, dirIndex) {
        let start = [0, 0];
        let dir = [0, 0];
        let length = 0;
        
        switch (dirIndex) {
            case 0:
                dir = [1, 0];
                start = [room.getLeft(), room.getTop()-1];
                length = room.getRight()-room.getLeft()+1;
            break;
            case 1:
                dir = [0, 1];
                start = [room.getRight()+1, room.getTop()];
                length = room.getBottom()-room.getTop()+1;
            break;
            case 2:
                dir = [1, 0];
                start = [room.getLeft(), room.getBottom()+1];
                length = room.getRight()-room.getLeft()+1;
            break;
            case 3:
                dir = [0, 1];
                start = [room.getLeft()-1, room.getTop()];
                length = room.getBottom()-room.getTop()+1;
            break;
        }
        
        const avail = [];
        let lastBadIndex = -2;

        for (var i=0;i<length;i++) {
            const x = start[0] + i*dir[0];
            const y = start[1] + i*dir[1];
            avail.push(null);
            
            const isWall = (this._map[x][y] == 1);
            if (isWall) {
                if (lastBadIndex != i-1) { avail[i] = [x, y]; }
            } else {
                lastBadIndex = i;
                if (i) { avail[i-1] = null; }
            }
        }
        
        for (var i=avail.length-1; i>=0; i--) {
            if (!avail[i]) { avail.splice(i, 1); }
        }
        return (avail.length ? avail.random() : null);
    }

    /**
     * Dig a polyline.
     */
    private _digLine(points) {
        for (let i=1;i<points.length;i++) {
            const start = points[i-1];
            const end = points[i];
            const corridor = new Corridor(start[0], start[1], end[0], end[1]);
            corridor.create(this._digCallback);
            this._corridors.push(corridor);
        }
    }

    private _digCallback(x, y, value) {
        this._map[x][y] = value;
        if (value == 0) { this._dug++; }
    }

    private _isWallCallback(x, y) {
        if (x < 0 || y < 0 || x >= this._width || y >= this._height) { return false; }
        return (this._map[x][y] == 1);
    }

    private _canBeDugCallback(x, y) {
        if (x < 1 || y < 1 || x+1 >= this._width || y+1 >= this._height) { return false; }
        return (this._map[x][y] == 1);
    }
}

