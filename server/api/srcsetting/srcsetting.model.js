'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../user/user.model')

var SrcsettingSchema = new Schema({
  owner: { type: Schema.ObjectId, ref: 'User' },
  createdDate: Date,
  modifiedDate: Date,

  shortCode: String,
  delay: Number,
  twitter: {},
  facebook: {},
  author: String,
  theMessage: String,
  actionBtnText: String,
  ctaText: String,
  inputPlaceholder: String,
  submitBtnText: String,
  destUrl: String,
  title: String,

  mailchimp: {
    listId: String,
    apiKey: String
  },

  show: {
    twitterProfilePicUrl: Boolean,
    facebookProfilePicUrl: Boolean
  }
});

module.exports = mongoose.model('Srcsetting', SrcsettingSchema);