
const zlib = require('zlib');

module.exports = function compress(rs, req ,res) {
    const acceptEncoding = req.headers['accept-encoding'];
    if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        return rs.pipe(zlib.createGzip());
    }
    else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        return rs.pipe(zlib.creasteDeflate());
    }
    else if(!acceptEncoding || !acceptEncoding.match(/\bgzip\b/)) {
        return rs.pipe(zlib.gzip());
    }
}