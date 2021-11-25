const https = require('https');

_EXTERNAL_URL = 'https://juspay.shubhamgeek.xyz/users/login';

const options = {
    hostname: 'https://juspay.shubhamgeek.xyz',
    path: '/users/login',
    method: 'POST',
    headers: {
        'X-Forwarded-For': 'xxx',
        'User-Agent': 'Foo'
    }
};


const Login = (callback) => {
    https.post(_EXTERNAL_URL, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            return callback(data);
            // console.log(JSON.stringify(data));
        });

    }).on("error", (err) => {

        console.log("Error: " + err.message);
    });
}

module.exports.callApi = Login;