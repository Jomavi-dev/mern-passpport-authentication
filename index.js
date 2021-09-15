"use strict";
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cookieParser())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true },
  () => console.log('MongoDB connection established successfully'))

const conn = mongoose.connection
conn.on('error', console.error.bind(console, 'MongoDB connection error:'))

const usersRouter = require('./routes/users')
const todosRouter = require('./routes/todos')

// app.use('/api/v1/users', usersRouter)
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







