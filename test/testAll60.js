const https = require('https');
const urls = ['rateCheck', 'failStatusCode', 'failRejectBot', 'failPatternCheck']
const EXTERNAL_URL = 'https://juspay.shubhamgeek.xyz/';

let callExternalApiUsingHttp = (URL, callback) => {
    https.get(URL, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            return callback(data, resp.rawHeaders);
            // console.log(JSON.stringify(data));
        });

    }).on("error", (err) => {

        console.log("Error: " + err.message);
    });
}
for(let i=0;i<urls.length;i++){
    callExternalApiUsingHttp(EXTERNAL_URL+urls[i], (response, headers) => {
        //console.log(response);
    })
    setTimeout(function() {
        //..
    }, 1100);
}