"use strict";
const router = require('express').Router()
const passport = require('passport')
const passportConfig = require('../services/passport')

const { createUser, login, logout, checkAdmin, auth } = require('../controllers/users')

router.route('/register').post(createUser)

router.route('/login').post(passport.authenticate('local', { session: false }), login)

router.route('/logout').get(passport.authenticate('jwt', { session: false }), logout)

router.route('/admin').get(passport.authenticate('jwt', { session: false }), checkAdmin)

router.route('/auth').get(passport.authenticate('jwt', { session: false }), auth)

module.exports = router


// const user = {
//   username: 'hi@mavi.co',
//   password: '1234',
//   role: 'admin'
// }














































