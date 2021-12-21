"use strict";
const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../services/passport')

const { getTodos, createTodo } = require('../controllers/todos')

router.route('/').get(passport.authenticate('jwt', { session: false }), getTodos)

router.route('/').post(passport.authenticate('jwt', { session: false }), createTodo)

module.exports = router