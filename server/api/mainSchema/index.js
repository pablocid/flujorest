'use strict';

var express = require('express');
var controller = require('./mainSchema.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/schema', controller.schema);
router.get('/sections/:section', controller.section);
router.get('/sections/:section/:main', controller.sectionMain);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
