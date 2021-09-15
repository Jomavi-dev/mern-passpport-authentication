"use strict";
const todoRouter = require('express').Router()
const passport = require('passport')
const passportConfig = require('../services/passport')

const { getTodos, createTodo } = require('../controllers/todos')

todoRouter.route('/').get(passport.authenticate('jwt', { session: false }), getTodos)

todoRouter.route('/').post(passport.authenticate('jwt', { session: false }), createTodo)

module.exports = todoRouter