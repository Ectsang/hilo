'use strict';

var express = require('express');
var controller = require('./srcsetting.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/i/:id', controller.show);
router.get('/:code', controller.showByShortcode);
router.post('/', controller.create);
router.put('/:code', controller.update);
router.patch('/:code', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;