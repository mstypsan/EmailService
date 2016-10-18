'use strict';
var _ = require('lodash');
var winston = require('winston');
var emailService = require('../libs/emailService');

function sendEmail(req, res) {
  req.checkBody('subject', 'Please enter the subject of the e-mail').notEmpty();
  req.checkBody('content', 'Please enter the content of the e-mail').notEmpty();
  req.checkBody('recipient', 'Please enter a valid recipient e-mail').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    var errorMessages = _.map(errors, 'msg');
    res.status(400);
    return res.json({success: false, errors: errorMessages});
  }

  var recipient = req.body.recipient;
  var subject = req.body.subject;
  var content = req.body.content;

  winston.info('Email ready to be sent to: ' + recipient);
  emailService.sendEmail(recipient, subject, content);

  res.status(200).end();
}

module.exports = {
  sendEmail: sendEmail
};
