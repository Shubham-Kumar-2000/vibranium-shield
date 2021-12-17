const apiCallFromRequest = require('./Request')
const getUser = require('./GetUser')

const http = require('http')
const https = require('https');
const axios = require('axios');

_EXTERNAL_URL = 'https://juspay.shubhamgeek.xyz/users';
// _EXTERNAL_URL = 'http://localhost:4000/users';


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
                await failStatus404((response, i, headers) => {
                    let finalResponse = "";
                    if(headers.toString().includes('Main')) {
                        console.log('From MAIN SERVER');
                        finalResponse += "From MAIN SERVER";
                    }
                    else {
                        console.log('From DUMMY SERVER');
                        finalResponse += "From DUMMY SERVER";
                    }
                    finalResponse += "\n"+response;
                    console.log(response+" "+i)
                    res.write(finalResponse);
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
        callExternalApiUsingHttp(function (response, headers) {
            let finalResponse = "";
            if(headers.toString().includes('Main')) {
                console.log('From MAIN SERVER');
                finalResponse+="From MAIN SERVER";
            }
            else {
                console.log('From DUMMY SERVER');
                finalResponse+="From DUMMY SERVER";
            }
            console.log(response);
            finalResponse+="\n"+response;
           // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            res.write(finalResponse);
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
            let finalResponse = "";
            if(response.headers.toString().includes('Main')) {
                console.log('From MAIN SERVER');
                finalResponse += "From MAIN SERVER";
            }
            else {
                console.log('From DUMMY SERVER');
                finalResponse += "From DUMMY SERVER";
            }
            console.log(JSON.stringify(response.data,null,4))
            finalResponse += "\n" + response.data.toString();
            res.write(finalResponse);
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
            return callback(data, resp.rawHeaders);
            // console.log(JSON.stringify(data));
        });

    }).on("error", (err) => {

        console.log("Error: " + err.message);
    });
}

let failStatus404 = async (callback, i) => {
    https.get(_EXTERNAL_URL+"/"+i, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            return callback(data, i, resp.rawHeaders);
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
            console.log('From DUMMY SERVER');
            res.write(response);
            res.end();
        })
        .catch((err) => {
            console.log("ERROR:"+err);
            console.log('From MAIN SERVER');
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
        .then(async function (response) {
            let finalResponse = "";
            if(response.headers.toString().includes('Main')) {
                finalResponse += "From MAIN SERVER";
                console.log('From MAIN SERVER');
            }
            else{
                console.log('From DUMMY SERVER');
                finalResponse += "From DUMMY SERVER";
            }
            console.log( JSON.stringify(response.data,null,4));
            finalResponse += "\n"+response.data+""
            res.write(finalResponse);
            res.end();
        })
        .catch((err) => {
            console.log("ERROR:"+err);
        });
}

console.log("service running on 4444 port....");