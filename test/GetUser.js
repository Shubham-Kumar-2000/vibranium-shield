
const https = require('https');

_EXTERNAL_URL = 'https://juspay.shubhamgeek.xyz/';
//give a valid token value for authorized request else unauthorized request
const options = {
    hostname: 'https://juspay.shubhamgeek.xyz',
    path: '/users',
    auth: {
        "type": "bearer",
        "bearer": [
            {
                "key": "token",
                "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTljOWQ2YzRlMTgwYTUwOGZhMDcwMDEiLCJlbWFpbCI6InRlc3RAaTJsLmNvbSIsIm5hbWUiOiJUZXN0MSIsInBhc3N3b3JkIjoiMTIzNCIsImhhc2giOiJiOWQxZTVjYjcyMGQzMjQxYjFmZGIwNjhiZTgwMzY5ODZiNGM3ZmRmNTU2MTc3YTY5ZDM2MGJkMDFlZGY5ZjhiOThlNWZkYjhlOTUzNmE4MDM1YjZiNzMxMTdhOTIyNmY2Y2RkOTU5NDgyYWM5Yzg5NTI1MzAxMTQ4MDRiNDJiMTVmNDFhYTMyMWZjYWVjYTQ2NzRmNGE5MWE5ZjJmZTQ2Njk5ZWM3NGU2OTk2Mjg5MTgyNDllNGM2MmFjOWZkOGRhMjMyZmVmNWQxODczNzkyYTFkZGM2Nzc3ZTFiMDc0YTQ1OGMyMjU4MzhhODQ1YjBkODQyNzc1YTQwNDFkNTczNGNkZmQzMDgwNzY3MTA4NTc4YmNmMGYxMDU2YzgzMjJjN2Y0NWE4MTY0NDU1MzE2N2JjYWQwMDU2ODQ4YzE1NzNjOGI3ODVhOWU5ZDJiZjk4YjlkZGI4ZDg1NTA2YjIzNTJjN2M5ODUxZTY1OGY4NGYwZDA1YmZlMTkzNTUyZDU5YTc0OTgzMzdiNDcwYWMxYzQwYmJlYmNkOTNlOTk3ZmVlZTIyZjRhMzMwYjc4YTI0YzYyNTlkNWRlNGYwMGJjNzk0ODJmYzNmOGQ0MTYwNTUxNDRjMDhjYmQxNjczY2U4OGEzM2VjOWY5OTVjMjkwM2Y0NjNlOTgwMDIzN2FlODQ4ZTc1OTM0MGU4Y2Y3MTU4NzEwZTZjYzk1OTVkZTcxYmVkNjU3YTEwMTFmYjhkNzVlYzNjN2Q0YjBmYzhlNDViY2Q3MDIxOWUwZTQwZDIwZTk3OTg5MjFhMDk3YjVmNzFhYjEyMDFiNWJkMDUxMmY2ZTUwNDhjOGU3OGEzOGE4ZWFmZjM3NTBjMWE4YTFlMGY1M2E3ODZhNTcyZGJhODEzZmUyOTE4N2NlZTBmYzBkMTJjMmZhMDE0MmZlNDhiNmM3OTI2M2U0NjM1ZDQ4YjM1YmM2OTYwNjBlZGU4N2NjZTIwOGQ2MWE5OTk5OTgwMjU1NmMwNDc1ZDdiMjJkNDU0NzQzMTFmYjcyMjdkNGM1ZDA1MzM0M2QxODI4NTgzNjk1OWZlMjU5MTdlMWNkOTYwM2EzNzFjNjk1NzExNWM0ZWZlM2FiZGI1NTMyNDYyMmRlMTYzYzI3OTBkNTY5MWZkYjEzZWEzNzNhMmVlN2RhYTE2ODFjZjczYTYxNGYxNGFmZWIyOWUxOTZmZTY1ODhlOTZkY2E0MjFmYzM5NzU4ZGJlMmM4Yjk4ZDZiMjE5N2VhY2FiNjliY2Y4MTIyZjBjMzY4ZmU4YzQ0NzI3NjQ2MjEwZDQ4ZmJiMGQ2ZTc3YTg5YWNkMjdmMzg3ZjBiYmMxNTZmZjMyN2Y1OGVhOTk2Iiwic2FsdCI6IjdmYWZiZjdlMTY3YjM0ODJhNzdmOGQwNGFkMGM4NzMyIiwiY3JlYXRlZEF0IjoiMjAyMS0xMS0yM1QwNzo1MTowOC4yMDhaIiwidXBkYXRlZEF0IjoiMjAyMS0xMS0yM1QwNzo1MTowOC4yMDhaIiwiX192IjowLCJpYXQiOjE2Mzc2NTk2NTksImV4cCI6MTYzNzY2Njg1OX0.qB0SYYusoOW1Ab1jzejkED4dxegxPc_KpRI5QFCjIps",
                "type": "string"
            }
        ]
    },
    method: 'GET',
    headers: {
        'X-Forwarded-For': 'xxx',
        'User-Agent': 'Googlebot',
        "Authorization": "Accept"
    },
};

callExternalApiUsingHttp = (callback) => {
    https.get(_EXTERNAL_URL, options,(resp) => {
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

failStatus404 = (callback) => {
    https.get(_EXTERNAL_URL+"123", (resp) => {
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

module.exports.callApi = callExternalApiUsingHttp;
module.exports.callApi1 = failStatus404;