'use strict';

var _ = require('lodash');
var config = require('../../config/environment');
var mcapi = require('mailchimp-api');
var mc = new mcapi.Mailchimp(config.mailchimp.apiKey);

// Get list of mailchimps
exports.index = function(req, res) {

  return res.status(200).json({ message: 'api up' });
};

exports.subscribe = function(req, res) {

  mc.lists.subscribe(
    {
      id: req.params.listId,
      email: { email:req.body.email },
      double_optin: req.body.doubleOptin
    },
    function(data) {
      req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
      // res.redirect('/lists/'+req.params.id);

      return res.status(200).json({ success: true, data: data, flash: req.session.success_flash });
    },
    function(error) {
      if (error.error) {
        req.session.error_flash = error.code + ": " + error.error;
      } else {
        req.session.error_flash = 'There was an error subscribing that user';
      }
      // res.redirect('/lists/'+req.params.id);
      return res.status(500).json({ success: false, error: error, flash: req.session.success_flash });
    });
};

// // Get a single mailchimp
// exports.show = function(req, res) {
//   Mailchimp.findById(req.params.id, function (err, mailchimp) {
//     if(err) { return handleError(res, err); }
//     if(!mailchimp) { return res.status(404).send('Not Found'); }
//     return res.json(mailchimp);
//   });
// };

// // Creates a new mailchimp in the DB.
// exports.create = function(req, res) {
//   Mailchimp.create(req.body, function(err, mailchimp) {
//     if(err) { return handleError(res, err); }
//     return res.status(201).json(mailchimp);
//   });
// };

// // Updates an existing mailchimp in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Mailchimp.findById(req.params.id, function (err, mailchimp) {
//     if (err) { return handleError(res, err); }
//     if(!mailchimp) { return res.status(404).send('Not Found'); }
//     var updated = _.merge(mailchimp, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.status(200).json(mailchimp);
//     });
//   });
// };

// // Deletes a mailchimp from the DB.
// exports.destroy = function(req, res) {
//   Mailchimp.findById(req.params.id, function (err, mailchimp) {
//     if(err) { return handleError(res, err); }
//     if(!mailchimp) { return res.status(404).send('Not Found'); }
//     mailchimp.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.status(204).send('No Content');
//     });
//   });
// };

function handleError(res, err) {
  return res.status(500).send(err);
}