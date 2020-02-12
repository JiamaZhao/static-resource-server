const chalk = require('chalk');
const fs = require('fs');
const  {promises: promisesFs} = fs;

module.exports = async function(req, res, filePath) {
    try {
        const stats = await promisesFs.stat(filePath);
        if (stats.isFile()) {
            console.log(chalk.yellow('当前是文件'));
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res); // 用createStream比readFile好
        } else if (stats.isDirectory()) {
            console.log(chalk.yellow('当前是文件夹'));
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.error(err);
                    res.end(err.toString());
                    return;
                }
                res.statusCode = 200;
                res.setHeader('content-type', 'text/plain');
                res.end(files.join(','));
            });
        }
    } catch (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(err.toString());
    }
};