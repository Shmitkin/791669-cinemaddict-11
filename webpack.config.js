'use strict';
const path = require('path');
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const pathToPublic = path.join(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: pathToPublic,
  },

  devtool: 'source-map',
  devServer: {
    contentBase: pathToPublic,
    watchContentBase: true,
  },

  plugins: [
      new MomentLocalesPlugin()
  ]
};