const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_HOST': `${process.env.API_HOST}`,
      'process.env.YOUTUBE_KEY': `${process.env.YOUTUBE_KEY}`,
      'process.env.WEBSOCKET_HOST': `${process.env.WEBSOCKET_HOST}`,
    }),
  ]
});
