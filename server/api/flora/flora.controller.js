'use strict';

var _ = require('lodash');
var Flora = require('./flora.model');
var q = require('q');

// Get list of floras
exports.index = function(req, res) {
  Flora.find(function (err, floras) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(floras);
  }).limit(1);
};

// Get a single flora
exports.show = function(req, res) {
  Flora.findById(req.params.id, function (err, flora) {
    if(err) { return handleError(res, err); }
    if(!flora) { return res.status(404).send('Not Found'); }
    return res.json(flora);
  });
};

// Creates a new flora in the DB.
exports.create = function(req, res) {
  Flora.create(req.body, function(err, flora) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(flora);
  });
};

// Updates an existing flora in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Flora.findById(req.params.id, function (err, flora) {
    if (err) { return handleError(res, err); }
    if(!flora) { return res.status(404).send('Not Found'); }
    var updated = _.merge(flora, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(flora);
    });
  });
};

// Deletes a flora from the DB.
exports.destroy = function(req, res) {
  Flora.findById(req.params.id, function (err, flora) {
    if(err) { return handleError(res, err); }
    if(!flora) { return res.status(404).send('Not Found'); }
    flora.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

//pagination flora
exports.pagination = function(req, res) {
  var items = req.params.items;
  var page = req.params.page;
  var type = req.params.type;
  var find = {};
  if(type==='cultivated'){find={'type.id':1}; }
  if(type==='transgenic'){find={'type.id':4}; }
  if(type==='introduced'){find={'type.id':2}; }
  if(type==='native'){find={'type.id':3}; }

  q.all(
    [
      Flora.find(find).count().exec(),
      Flora.find(find).sort('name').skip(items*(page-1)).limit(items).exec()
    ])
    .spread(function(count,currPageCont){
      //console.log(count);
      var respuesta = {
        totalItems:count,
        items:items,
        totalPages:Math.ceil(count/items),
        currentPage:page,
        flora:currPageCont
      };
      res.status(200).json(respuesta);
    })
    .fail(function(err){ console.log(err);});
};

function handleError(res, err) {
  return res.status(500).send(err);
}
