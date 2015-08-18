'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MailchimpSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Mailchimp', MailchimpSchema);