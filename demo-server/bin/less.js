const serverless = require('serverless-http');
require("dotenv").config()
var app = require('../app');
module.exports.handler = serverless(app);