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
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`); // 设置强缓存，刷新页面没有用的，要再打开一个新标签，才会生效，在network面板的size选项可看到‘disk Cache’
    }
    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString()); // stats.atime上次访问时间；stats.mtime上次修改时间;stats.ctime创建时间
    }
    if (etag) {
        res.setHeader('ETag', `${stats.size}_${Date.parse(stats.mtime)}`); // if-none-match似乎有长度限制，客户端得到
    }
}
module.exports = function isCacheValid(stats, req, res) {
    refreshRes(stats, res);
    const ifModifiedSince = req.headers['if-modified-since'];
    const ifNoneMatch = req.headers['if-none-match'];
    if (!ifModifiedSince && !ifNoneMatch) {
        return false;
    }
    if (ifModifiedSince && ifModifiedSince !== res.getHeader('Last-Modified')) {
        return false;
    }
    if (ifNoneMatch && ifNoneMatch !== res.getHeader('ETag')) {
        return false;
    }
    return true;
}

