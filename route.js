const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const  {promises: promisesFs} = fs;

module.exports = async function(req, res, filePath) {
    try {
        const stats = await promisesFs.stat(filePath);
        if (stats.isFile()) {
            console.log(chalk.yellow('当前是文件'));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res); // s用createStream比readFile好
        } else if (stats.isDirectory()) {
            console.log(chalk.yellow('当前是文件夹'));
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.error(err);
                    res.end(err.toString());
                    return;
                }
                const tplPath = path.join(__dirname, 'template/index.html');
                const tplStr = fs.readFileSync(tplPath).toString(); //todo: 尝试异步
                res.statusCode = 200;
                res.setHeader('content-type', 'text/html');
                const html = ejs.render(tplStr, {
                    test: '加玛'
                });
                res.end(html);
                res.end(files.join(','));
            });
        }
    } catch (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(err.toString());
    }
};