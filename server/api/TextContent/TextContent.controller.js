'use strict';

var _ = require('lodash');
var TextContent = require('./TextContent.model');

// Get list of TextContents
exports.index = function(req, res) {
  TextContent.find(function (err, TextContents) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(TextContents);
  });
};
exports.schema = function(req, res) {
  return res.status(200).json(TextContent.schema.paths);
};
// Get a single TextContent
exports.show = function(req, res) {
  TextContent.findById(req.params.id, function (err, TextContent) {
    if(err) { return handleError(res, err); }
    if(!TextContent) { return res.status(404).send('Not Found'); }
    return res.json(TextContent);
  });
};

// Creates a new TextContent in the DB.
exports.create = function(req, res) {
  TextContent.create(req.body, function(err, TextContent) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(TextContent);
  });
};

// Updates an existing TextContent in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TextContent.findById(req.params.id, function (err, TextContent) {
    if (err) { return handleError(res, err); }
    if(!TextContent) { return res.status(404).send('Not Found'); }
    var updated = _.merge(TextContent, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(TextContent);
    });
  });
};

// Deletes a TextContent from the DB.
exports.destroy = function(req, res) {
  TextContent.findById(req.params.id, function (err, TextContent) {
    if(err) { return handleError(res, err); }
    if(!TextContent) { return res.status(404).send('Not Found'); }
    TextContent.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
