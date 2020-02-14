const defaultConfig = require('../config/defaultConfig');
const {
    maxAge,
    cacheControl, // 是否开启cacheControl
    lastModified, // 开启lastModified校验
    etag // 开启
} = defaultConfig.cacheOpt;

function refreshRes(stats, res) {
    /**
     * stats对象说明
     * {
     *  size: 文件大小
     *  atime: 最近访问时间
     *  isFile：方法，是否是文件
     *  isDirectory: 方法，是否是目录 
     * }
     */
    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`);
    }
    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString()); // stats.atime上次访问时间；stats.mtime上次修改时间;stats.ctime创建时间
    }
    if (etag) {
        res.setHeader('ETag', `${stats.size}-${stats.mtime.toUTCString()}`);
    }
}
module.exports = function isCacheValid(stats, req, res) {
    refreshRes(stats, res);
    return false;
}

