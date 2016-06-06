const util = require('util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opn = require('opn');
const pkg = require('./package.json');

const port = pkg.config.devPort;
const host = pkg.config.devHost;

const configPath = process.argv[2] || './webpack/config';
const config = require(configPath);

const server = new WebpackDevServer(
  webpack(config),
  config.devServer
);

server.listen(port, host, function (err) {
  if (err) { console.log(err); }
  const url = util.format('http://%s:%d', host, port);
  console.log('Listening at %s', url);
  opn(url);
});
