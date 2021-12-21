"use strict";
const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../services/passport')

const { login } = require('../controllers/users')

router.route('/auth/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }))

router.route('/auth/google/callback').post(passport.authenticate('google'), login)

module.exports = router