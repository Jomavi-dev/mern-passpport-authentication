"use strict";
const userRouter = require('express').Router()
const passport = require('passport')
const passportConfig = require('../services/passport')

const { createUser, login, logout, checkAdmin, auth } = require('../controllers/users')

userRouter.route('/register').post(createUser)

userRouter.route('/login').post(passport.authenticate('local', { session: false }), login)

userRouter.route('/logout').get(passport.authenticate('jwt', { session: false }), logout)

userRouter.route('/admin').get(passport.authenticate('jwt', { session: false }), checkAdmin)

userRouter.route('/auth').get(passport.authenticate('jwt', { session: false }), auth)

module.exports = userRouter



















































    // const userIn = {
    //   username: 'hi@mavi.co',
    //   password: '1234',
    //   // role: 'admin'
    // }
    // const user = new User(userIn)
    // user.save((err, doc) => {
    //   if (err)
    //     console.log(err)
    //   console.log(doc)
    // })