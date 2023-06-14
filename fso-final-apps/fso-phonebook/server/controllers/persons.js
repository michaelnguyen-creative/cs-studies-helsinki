const express = require('express')
const Person = require('../models/person.js')

const personsRoute = express.Router()

personsRoute.get('/', (_req, res) => {
  Person.find({}).then((result) => {
    res.json(result)
  })
})

personsRoute.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => next(err))
})

personsRoute.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => {
      next(err)
    })
})

personsRoute.post('/', (req, res, next) => {
  const { body } = req

  if (body === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  return person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((err) => next(err))
})

personsRoute.put('/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err))
})

module.exports = personsRoute
