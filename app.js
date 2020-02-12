const http = require('http');
const path = require('path');
const chalk = require('chalk');
const defaultConfig = require('./config/defaultConfig');
const route = require('./route');

const server = http.createServer((req, res) => {
    const url = req.url;
    const filePath = path.join(defaultConfig.root, url);
    route(req, res, filePath);
});

server.listen(defaultConfig.port, defaultConfig.hostname, () => {
    console.log(
        chalk.green(
            `Server running at http://${defaultConfig.hostname}:${defaultConfig.port}/`
        )
    );
});
