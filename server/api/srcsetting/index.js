'use strict';

var express = require('express');
var controller = require('./srcsetting.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/list/:id', controller.listMine);

router.get('/i/:id', controller.show);
router.get('/:code', controller.showByShortcode);
router.get('/checkShortcode/:code', controller.checkShortcode);

router.get('/fetchTitleOf/:url', controller.fetchTitleOf);

router.post('/', controller.create);
router.put('/:code', controller.update);
router.patch('/:code', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;