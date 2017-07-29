const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "css/[name].bundle.css",
  publicPath: path.resolve(__dirname, 'dist')
});

module.exports = {
  entry: {
    index: './src/js/index.js',
    play: './src/js/play.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    host: "0.0.0.0",
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ['css-hot-loader'].concat(extractSass.extract({
        use: 'css-loader!postcss-loader!sass-loader',
        // use style-loader in development
        fallback: "style-loader"
      }))
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  },
  plugins: [
    extractSass
  ]
};