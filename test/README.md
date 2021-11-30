# Getting Started with Testing

### `npm i`

Use this to install all the required dependencies.

### `node app.js`

Use this to start the testing server.
Then you can hit routes mentioned below and observe result in the console.
- `/request` : Just a request to server.
- `/rateCheck` : Makes 10 simultaneous request to the server.
- `/reCaptchaCheck` : Tries to bypass recaptcha.
- `/failStatusCode` : Runs some invalid routes.
- `/passAuthHeaderCheck` : Sends request with a dummy auth header.
- `/failAuthHeaderCheck` : Sends request without a dummy auth header.
- `/failRejectBot` : Send request disguising as a google bot.
- `/failPatternCheck` : Send a Known vunerablity of php i.e. https://blog.qualys.com/product-tech/2019/10/30/php-remote-code-execution-vulnerability-cve-2019-11043
