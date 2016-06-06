const path = require('path');
const util = require('util');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer-core');
const loaders = require('./loaders.js');
const plugins = require('./plugins.js');

const DEBUG = process.env.NODE_ENV === 'development';
const jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));

const config = {
  context: path.resolve(pkg.config.srcDir),
  cache: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'source-map' : false,
  entry: pkg.config.entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/',
    filename: 'bundle.js',
    pathinfo: false
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json']
  },
  devServer: {
    contentBase: path.resolve(pkg.config.buildDir),
    hot: true,
    noInfo: false,
    inline: true,
    stats: { colors: true }
  }
};
module.exports = config;