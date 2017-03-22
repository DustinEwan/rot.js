
import { Map } from './map';
/**
 * @class Dungeon map: has rooms and corridors
 * @augments ROT.Map
 */
export class Dungeon extends Map {
	protected _rooms;
	protected _corridors;

	constructor(width: number = null, height: number = null) {
		super(width, height);
		this._rooms = []; /* list of all rooms */
		this._corridors = [];
	}

	/**
	 * Get all generated rooms
	 * @returns {ROT.Map.Feature.Room[]}
	 */
	getRooms() {
		return this._rooms;
	}

	/**
	 * Get all generated corridors
	 * @returns {ROT.Map.Feature.Corridor[]}
	 */
	getCorridors() {
		return this._corridors;
	}
}