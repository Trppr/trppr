module.exports = {
    entry: "./client/client.jsx",
    output: {
        path: __dirname + "/client",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: { presets: ['es2015', 'react'] }
        }
      ]
    }
}
