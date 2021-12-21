"use strict";
const express = require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(cookieParser())
app.use(express.json())

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const todosRouter = require('./routes/todos')

// app.use('/api/v1/users', usersRouter)
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/todos', todosRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


app.listen(port, () => console.log(`Server is runnning on http://localhost:${port}`))