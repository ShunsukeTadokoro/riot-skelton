const path = require('path');
const pkg = require('../package.json');

const DEBUG = process.env.NODE_ENV === 'development';
const TEST = process.env.NODE_ENV === 'test';

const fileLoader = 'file-loader?name=[path][name].[ext]';
const jsonLoader = ['json-loader'];

const sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../src/scss'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules')
];
sassParams.push('sourceMap', 'sourceMapContents=true');
const sassLoader = [
  'style-loader',
  'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader',
  'sass-loader?' + sassParams.join('&')
].join('!');
const cssLoader = [
  'style-loader',
  'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader'
].join('!');
const babelLoader = ['babel-loader'];

const loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: babelLoader
  },
  {
    test: /\.css$/,
    loader: cssLoader
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
    loader: fileLoader
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: jsonLoader
  },
  {
    test: /\.scss$/,
    loader: sassLoader
  }
];

module.exports = loaders;
