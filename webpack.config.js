const path = require('path');
const fs = require('fs');
const url = require('url');

const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [{
      // Include ts, tsx, js, and jsx files.
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new Dotenv({ path: './.env' }),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp('public/index.html')
    })
  ]
};
