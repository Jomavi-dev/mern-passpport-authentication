const mongoose = require('mongoose')

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true },
  () => console.log('MongoDB connection established successfully'))

const conn = mongoose.connection
conn.on('error', console.error.bind(console, 'MongoDB connection error:'))
