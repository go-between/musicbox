const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.AIRBRAKE_KEY': JSON.stringify(process.env.AIRBRAKE_KEY),
      'process.env.AIRBRAKE_PROJECT_ID': JSON.stringify(process.env.AIRBRAKE_PROJECT_ID),
      'process.env.API_HOST': JSON.stringify(process.env.API_HOST),
      'process.env.WEBSOCKET_HOST': JSON.stringify(process.env.WEBSOCKET_HOST),
    }),
  ]
});
