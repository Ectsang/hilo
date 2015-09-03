// http://stackoverflow.com/questions/14459194/mongodb-how-to-design-twitter-style-followers-following-relation-model-in-mongo
// http://stackoverflow.com/questions/28421505/followers-mongodb-database-design
// http://blog.mongodb.org/post/61499097398/tracking-twitter-followers-with-mongodb
// http://blog.mongodb.org/post/65612078649/schema-design-for-social-inboxes-in-mongodb

'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
