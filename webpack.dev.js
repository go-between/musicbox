const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const fs = require('fs');
const url = require('url');

const Dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new Dotenv({ path: './.env' }),
  ]
});
