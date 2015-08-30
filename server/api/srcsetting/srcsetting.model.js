'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model')

var SrcsettingSchema = new Schema({
  owner: [User],

  shortCode: String,
  delay: Number,
  twitterUser: String,
  twitterUrl: String,
  twitterProfilePicUrl: String,
  author: String,
  theMessage: String,
  actionBtnText: String,
  ctaText: String,
  inputPlaceholder: String,
  submitBtnText: String,
  destUrl: String,
  shareUrl: {
    text: String,
    url: String,
    hashtags: [],
    via: String
  },
  mailchimp: {
    listId: String,
    apiKey: String
  },
  meta: {
    title: String
  },
  show: {
    twitterProfilePicUrl: Boolean
  }
});

module.exports = mongoose.model('Srcsetting', SrcsettingSchema);