'use strict';

var _ = require('lodash');
var Srcsetting = require('./srcsetting.model');

// Get list of srcsettings
exports.index = function(req, res) {
  Srcsetting.find(function (err, srcsettings) {
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
  Srcsetting.findById(req.params.id, function (err, srcsetting) {
    if (err) { return handleError(res, err); }
    if(!srcsetting) { return res.status(404).send('Not Found'); }
    var updated = _.merge(srcsetting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(srcsetting);
    });
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