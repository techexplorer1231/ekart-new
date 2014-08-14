'use strict';

var express = require('express');
var controller = require('./product.controller');

var usercontroller = require('../user/user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/random/:category/:count', controller.random);

module.exports = router;