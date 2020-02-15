const { exec } = require('child_process');

// 区分mac和windows
module.exports = url => {
    switch(process.platform) {
    case 'darwin':
        exec(`open ${url}`);
        break;
    case 'win32':
        exec(`start ${url}`);
        break;
    }
}