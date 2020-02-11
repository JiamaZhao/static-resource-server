const http = require('http');
const chalk = require('chalk');
const defaultConfig = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(defaultConfig.port, defaultConfig.hostname, () => {
  console.log(chalk.green(`Server running at http://${defaultConfig.hostname}:${defaultConfig.port}/`));
});
