'use strict';

var express = require('express');
var controller = require('./catalogo.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/sign_s3', controller.sign_request);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('guest'), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
