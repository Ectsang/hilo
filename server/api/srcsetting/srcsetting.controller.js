'use strict';

var _ = require('lodash');
var request = require('superagent');
var cheerio = require('cheerio');

var Srcsetting = require('./srcsetting.model');

// Get list of srcsettings
exports.index = function(req, res) {
  Srcsetting.find(function (err, srcsettings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(srcsettings);
  });
};

exports.listMine = function(req, res) {
  Srcsetting.find({ owner: req.params.id }, function (err, srcsettings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(srcsettings);
  });
};

// Get a single srcsetting
exports.show = function(req, res) {
  Srcsetting.findById(req.params.id, function (err, srcsetting) {
    if(err) { return handleError(res, err); }
    if(!srcsetting) { return res.status(404).send('Not Found'); }
    return res.json(srcsetting);
  });
};

// Get a single srcsetting by shortCode
exports.showByShortcode = function(req, res) {
  // Srcsetting.findOne({ shortCode: req.params.code }, function (err, srcsetting) {
  //   if(err) { return handleError(res, err); }
  //   if(!srcsetting) { return res.status(404).json({ success: false, code: 404, message: 'Shortcode not found'}); }
  //   return res.json(srcsetting);
  // });
  Srcsetting.findOne({ shortCode: req.params.code })
    .populate('owner')
    .exec(function (err, srcsetting) {
      if(err) { return handleError(res, err); }
      if(!srcsetting) { return res.status(404).json({ success: false, code: 404, message: 'Shortcode not found'}); }
      return res.json(srcsetting);
    });
};

exports.checkShortcode = function(req, res) {
  Srcsetting.findOne({ shortCode: req.params.code }, function (err, srcsetting) {
    if(err) { return handleError(res, err); }
    if(srcsetting) { return res.status(404).json({ success: false, code: 404, message: 'Shortcode is a duplicate'}); }
    return res.json({ success: true, code: 200, shortCode: req.params.code });
  });
}

exports.fetchTitleOf = function(req, res) {
  var apiCall = decodeURIComponent(req.params.url);
  request
  .get(apiCall)
  .end(function(err, response) {
    if(err) { return handleError(res, err); }
    var $ = cheerio.load(response.text);
    return res.json({ success:true, code: 200, htmlTitle: $('title').text() });
  });
}

// Creates a new srcsetting in the DB.
exports.create = function(req, res) {
  Srcsetting.create(req.body, function(err, srcsetting) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(srcsetting);
  });
};

// Updates an existing srcsetting in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Srcsetting.findOne({shortCode: req.params.code}, function (err, srcsetting) {
    if (err) { return handleError(res, err); }
    if(!srcsetting) { return res.status(404).send('Link Not Found'); }
    var updated = _.merge(srcsetting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(srcsetting);
    });
  });
};

exports.patch = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  Srcsetting.update({shortCode: req.params.code}, req.body, function (err, numAffected) {
    if (err) {
      console.log('patch error', err);
      return handleError(res, err);
    }
    console.log('numAffected', numAffected);
    if(numAffected.nModified === 0) { return res.status(404).end(); }

    return res.status(200).json(numAffected);
  });
};

// Deletes a srcsetting from the DB.
exports.destroy = function(req, res) {
  Srcsetting.findById(req.params.id, function (err, srcsetting) {
    if(err) { return handleError(res, err); }
    if(!srcsetting) { return res.status(404).send('Not Found'); }
    srcsetting.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}