module.exports = {
    entry: "./client/landing.jsx",
    output: {
        path: __dirname + "/client",
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: { presets: ['es2015', 'react', 'stage-0'] }
        }
      ]
    }
}
