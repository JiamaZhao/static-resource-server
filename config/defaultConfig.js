module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: 9527,
    // compress: /\.(html|js|css|md)/,
    cacheOpt: {
        maxAge: 2, // 单位s
        cacheControl: true, // 是否开启cacheControl
        lastModified: true, // 开启lastModified校验
        etag: true // 开启
    }
};