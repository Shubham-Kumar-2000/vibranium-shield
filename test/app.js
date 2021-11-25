const apiCallFromRequest = require('./Request')
const getUser = require('./GetUser')

const http = require('http')
const https = require('https');
const axios = require('axios');

_EXTERNAL_URL = 'https://juspay.shubhamgeek.xyz/users';

http.createServer( async (req, res) => {
        if(req.url === "/request"){
            apiCallFromRequest.callApi(function(response){
                //console.log(JSON.stringify(response));
                res.write(response);
                res.end();
            });
        }
        else if(req.url === "/rateCheck"){
            await callMultiple(10,res);
        }
        else if(req.url === "/reCaptchaCheck"){
            await callMultiple(1,res);
        }
        else if(req.url === "/failStatusCode"){
            for(let i=0;i<20;i++) {
                console.log(i);
                await sleep(3000);
                await failStatus404((response, i) => {
                    console.log(response+" "+i)
                    if(i===19) {
                        sleep(3000);
                        callMultiple(1, res);
                    }
                    res.write(response);
                    res.end();
                }, i)
            }
            //await callMultiple(1, res);
        }
        else if(req.url === "/passAuthHeaderCheck"){
            checkAuthHeader(true)
        }
        else if(req.url === "/failAuthHeaderCheck"){
            checkAuthHeader(false)
        }
        else if(req.url === "/failRejectBot"){
            failRejectBot(res);
        }
        else if(req.url === "/failPatternCheck"){
            failPatternCheck(res);
        }
        else{
            res.write("response");
            res.end();
        }
        
        // res.end();
}).listen(4444);

async function callMultiple(n,res){
    for(let i=0;i<n;i++) {
        console.log(i);
        callExternalApiUsingHttp(function (response) {
            console.log(response);
           // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            res.write(response);
            res.end()
        });
        await sleep(4000);
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let failPatternCheck = (res) => {
    let instance = axios.create({
        baseURL: 'https://juspay.shubhamgeek.xyz',
    });

    instance.get('/users?QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ')
        .then(function (response) {
            console.log(response)
            res.write(response.data.toString());
            res.end();
        })
        .catch((err) => {
            console.log("ERROR:"+err);
        });
}

let callExternalApiUsingHttp = (callback) => {
    https.get(_EXTERNAL_URL, (resp) => {
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

let failStatus404 = async (callback, i) => {
    https.get(_EXTERNAL_URL+i, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            return callback(data, i);
            // console.log(JSON.stringify(data));
        });

    }).on("error", (err) => {

        console.log("Error: " + err.message);
    });
}

let checkAuthHeader = (flag, res) => {
    let instance = axios.create({
        baseURL: 'https://juspay.shubhamgeek.xyz',
    });
    if(flag)
        axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
    instance.get('/users')
        .then(function (response) {
            res.write(response);
            res.end();
        })
        .catch((err) => {
            console.log("ERROR:"+err);
        });
}

let failRejectBot = (res) => {
    let instance = axios.create({
        baseURL: 'https://juspay.shubhamgeek.xyz',
        headers: {
            'User-Agent': 'Googlebot'
        }
    });

    instance.get('/users')
        .then(function (response) {
            console.log(response)
            res.write(response.data+"");
            res.end();
        })
        .catch((err) => {
            console.log("ERROR:"+err);
        });
}

console.log("service running on 4444 port....");