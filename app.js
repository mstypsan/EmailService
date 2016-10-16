'use strict';

require('le_node');
var dotenv = require('dotenv');
var winston = require('winston');
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');

var emailSender = require('./controllers/emailSender');

dotenv.config();


var app = express();

//TODO test that form could also pass or only json? https://github.com/expressjs/body-parser
//TODO invalid json error? http://stackoverflow.com/questions/15819337/catch-express-bodyparser-error
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.use(validator());

app.post('/email-service/email/send', emailSender.sendEmail);

app.server = app.listen(app.settings.port, function () {
  winston.info('listening on port %d in %s mode', app.settings.port, app.settings.env);
});

module.exports = app;
