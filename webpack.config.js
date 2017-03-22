
module.exports = {
    entry: './src/rot.ts',
    output: {
        filename: './dist/rot.js'
    },
    resolve: {
        extensions: ['', '.ts']
    },
    module: {
        loaders: [
            { test: /.ts$/, loader: 'awesome-typescript-loader' }
        ]
    }
}