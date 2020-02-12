const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const defaultConfig = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
	const url = req.url;
	const filePath = path.join(defaultConfig.root, url);
    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404');
            return;
        }
        if (stats.isFile()) {
            console.log(chalk.yellow('当前是文件'));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res); // 用createStream比readFile好
        } else if (stats.isDirectory()) {
            console.log(chalk.yellow('当前是文件夹'));
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.error(err);
                    res.end('404');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('content-type', 'text/plain');
                res.end(files.join(','));
            });
        }
    });
});

server.listen(defaultConfig.port, defaultConfig.hostname, () => {
	console.log(
		chalk.green(
			`Server running at http://${defaultConfig.hostname}:${defaultConfig.port}/`
		)
	);
});
