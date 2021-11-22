module.exports = {
    MaxRequestLimit: 5,
    ttl: 5 * 60,
    DummyOrigin: 'www.google.com',
    ReCaptcha: {
        Key: '6LfllkwdAAAAAOhViqvGkXvM8AM7CV16vRKuHYZR',
        Sceret: '6LfllkwdAAAAAAGTXniQVJb235LwdqEPucucaVHt'
    },
    AuthHeader: 'authorization',
    AcceptedMethods: ['OPTIONS'],
    InvalidOptions: {
        keyStatus: [404, 407],
        pattern: {
            key: 'userAgent',
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
    ],
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
            server: ''
        },
        {
            type: 'Reject-Bot'
        }
    ]
};
