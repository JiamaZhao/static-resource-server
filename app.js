const http = require('http');
const path = require('path');
const chalk = require('chalk');
const defaultConfig = require('./config/defaultConfig');
const route = require('./route');
const openUrlInBrowser = require('./tools/openUrlInBrowser');

class Server {
    constructor(config) {
        this.config = Object.assign({}, defaultConfig, config);
    }
    start() {
        const server = http.createServer((req, res) => {
            const url = req.url;
            const filePath = path.join(this.config.root, url);
            route(req, res, filePath, this.config.root);
        });
        openUrlInBrowser(`http://${this.config.hostname}:${this.config.port}/`); // 自动打开浏览器

        server.listen(this.config.port, this.config.hostname, () => {
            console.log(
                chalk.green(
                    `Server running at http://${this.config.hostname}:${this.config.port}/`
                )
            );
        });
    }
}

module.exports = Server;
