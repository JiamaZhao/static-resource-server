const http = require('http');
const chalk = require('chalk');
const path = require('path');
const defaultConfig = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
	const url = req.url;
	const filePath = path.join(defaultConfig.root, url);
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.write('<html>');
	res.write('<body>');

	res.write(filePath);
	res.write('<body/>');
	res.end('<html/>');
});

server.listen(defaultConfig.port, defaultConfig.hostname, () => {
	console.log(
		chalk.green(
			`Server running at http://${defaultConfig.hostname}:${defaultConfig.port}/`
		)
	);
});
