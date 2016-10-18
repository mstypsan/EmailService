'use strict';
var winston = require('winston');
var async = require('async');
var EmailMessage = require('./emailMessage');
var sendgridService = require('./sendgridService');
var mailgunService = require('./mailgunService');
var emailProviders = [sendgridService, mailgunService];

var sendEmail = function(recipient, subject, content){
  var sender = process.env.SENDER_EMAIL;

  var emailMessage = new EmailMessage(sender, recipient, subject, content);

  async.someSeries(emailProviders, sendEmailWithEveryProvider.bind(sendEmailWithEveryProvider, emailMessage), function (err, success) {
    if(success) {
      winston.info('Done processing e-mail');
    }
    else {
      winston.error('Unable to process e-mail for recipient: ' + recipient);
    }
  });
};

var sendEmailWithEveryProvider = function(emailMessage, emailProvider, callback) {
  emailProvider.sendEmail(emailMessage, function (error) {
      callback(null, !error);
  })
};

module.exports.sendEmail = sendEmail;
