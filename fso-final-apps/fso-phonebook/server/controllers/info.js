const express =  require('express')
const Person = require('../models/person.js')

const infoRoute = express.Router()

infoRoute.get('/health', (req, res) => {
  res.status(200).send('Ok')
})

infoRoute.get('/', (req, res) => {
  Person.find({}).then((result) => {
    const count = result.length
    const time = new Date()
    res.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`)
  })
})

module.exports = infoRoute
