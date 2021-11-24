module.exports = {
    MaxRequestLimit: 5, // Max request limit per ttl rr
    ttl: 5 * 60, // time to live in seconds rr
    DummyOrigin: 'www.google.com', // rr
    Origin: 'www.google.com',
    ReCaptcha: {
        Key: 'XX',
        Sceret: 'XX'
    },
    AuthHeader: 'authorization',
    AcceptedMethods: ['OPTIONS'], // rr
    InvalidOptions: {
        keyStatus: [404, 407],
        pattern: {
            key: 'userAgent', //userAgent // url // path // domain // ip // method
            value: '*.'
        },
        value: 2
    },
    plugins: [
        'ReCaptcha',
        'IP',
        'FingerPrinter',
        'Authorization',
        'Invalid-Response'
    ], // rr
    rules: [
        {
            type: 'Rate',
            value: 1
        },
        {
            type: 'ReCaptcha-limit',
            value: 0.4
        },
        {
            type: 'ReCaptcha-range',
            max: 0.7,
            min: 0.3,
            value: 5
        },
        {
            type: 'Auth-accept'
            // pattern: ""
        },
        {
            type: 'Pattern',
            server: '' // Original or Dummy
        },
        {
            type: 'Reject-Bot'
        }
    ] // rr
};
