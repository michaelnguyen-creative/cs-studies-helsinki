const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('node:path')
const personsRoute = require('./controllers/persons.js')
const infoRoute = require('./controllers/info.js')
const middlewares = require('./utils/middlewares.js')

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')))
}

morgan.token('persons', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] :response-time ms :persons')
)

app.use('/api/info', infoRoute)
app.use('/api/persons', personsRoute)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app
