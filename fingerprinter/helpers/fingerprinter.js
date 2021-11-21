const Fingerprint = require('express-fingerprint');
const useragent = require('express-useragent');
const GeoipLite = require('geoip-lite');

const geoIp = (next, req) => {
    const ip =req.body.ip;

    const geo = GeoipLite.lookup(ip);
    next(null, {
        XgeoIp: geo || {},
    });
};
exports.fingerprinter = Fingerprint({
    parameters: [
        geoIp,
        function(next, req) {
            next(null, useragent.parse(req.body.userAgent));
        },
    ],
});
