'use strict';

var _ = require('lodash');
var MainSchema = require('./mainSchema.model');

exports.schema = function(req, res) {
  return res.status(200).json(MainSchema.schema.paths);
};
// Get list of mainSchemas
exports.index = function(req, res) {
  MainSchema.find(function (err, mainSchemas) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(mainSchemas);
  });
};
exports.section = function(req, res) {
  MainSchema.find({section:req.params.section},function (err, mainSchemas) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(mainSchemas);
  });
};
exports.sectionMain = function(req, res) {
  var query={
    section:req.params.section,
    'properties':{
      $elemMatch:{
        id:'main',
        string:req.params.main
      }
    }
  };
  MainSchema.findOne(query,function (err, mainSchemas) {
    if(err) { return handleError(res, err); } //{id:'main',string:req.params.main,arrayMix:[],array:[]}
    return res.status(200).json(mainSchemas);
  });
};

exports.inputModels = function(req, res) {
  MainSchema.find({section:'inputModel'},function (err, mainSchemas) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(mainSchemas);
  });
};
// Get a single mainSchema
exports.show = function(req, res) {
  MainSchema.findById(req.params.id, function (err, mainSchema) {
    if(err) { return handleError(res, err); }
    if(!mainSchema) { return res.status(404).send('Not Found'); }
    return res.json(mainSchema);
  });
};

// Creates a new mainSchema in the DB.
exports.create = function(req, res) {
  MainSchema.create(req.body, function(err, mainSchema) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(mainSchema);
  });
};

// Updates an existing mainSchema in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  MainSchema.findById(req.params.id, function (err, mainSchema) {
    if (err) { return handleError(res, err); }
    if(!mainSchema) { return res.status(404).send('Not Found'); }
    var updated = _.extend(mainSchema, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(mainSchema);
    });
  });
};

// Deletes a mainSchema from the DB.
exports.destroy = function(req, res) {
  MainSchema.findById(req.params.id, function (err, mainSchema) {
    if(err) { return handleError(res, err); }
    if(!mainSchema) { return res.status(404).send('Not Found'); }
    mainSchema.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
