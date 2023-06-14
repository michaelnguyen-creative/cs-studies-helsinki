import { useState, useEffect } from 'react'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'
import Contact from './Contact.jsx'
import Notification from './Notification.jsx'
import contactService from '../services/contactService.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    contactService.getAll().then((initialContact) => {
      setPersons(initialContact)
    })
  }, [])

  const addToPersons = (e) => {
    e.preventDefault()
    const newContact = { name: newName, phone: newPhone }

    const checkExistedContact = (contactObj) =>
      persons.find(
        (p) => p.name === contactObj.name || p.phone === contactObj.phone
      )

    const updateContact = () => {
      const idToUpdate = checkExistedContact(newContact).id
      // console.log(idToUpdate)
      contactService
        .update(idToUpdate, newContact)
        .then((returnedContact) => {
          setPersons(
            persons.map((p) => (p.id !== idToUpdate ? p : returnedContact))
          )
          setNewName('')
          setNewPhone('')
        })
        .catch((error) => {
          console.log(error)
          setStatus(`${newContact.name} has already been deleted`)
          setTimeout(() => setStatus(''), 3000)
        })
    }

    const createContact = () => {
      contactService.create(newContact).then((returnedContact) => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewPhone('')

        setStatus(`Added ${returnedContact.name}`)
        setTimeout(() => setStatus(''), 3000)
      })
    }

    if (checkExistedContact(newContact) !== undefined) {
      if (
        // eslint-disable-next-line no-alert
        window.confirm(
          `${newName} is already added to phonebook. Would you like to replace the old one?`
        )
      ) {
        updateContact()
      }
      setNewName('')
      setNewPhone('')
      return
    }

    createContact()
  }

  const deleteContact = (e) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure to delete this contact?')) {
      const remainingContact = persons.filter(
        (person) => person.id !== Number(e.target.id)
      )
      // console.log(remainingContact)
      setPersons(remainingContact)
      contactService.remove(e.target.id)
    }
  }

  const addName = (e) => {
    setNewName(e.target.value)
  }

  const addPhone = (e) => {
    setNewPhone(e.target.value)
  }

  const searchPeople = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Notification status={status} />
      <Filter persons={persons} search={search} searchPeople={searchPeople} />
      <h2>Add a new</h2>
      <PersonForm
        addToPersons={addToPersons}
        addName={addName}
        newName={newName}
        addPhone={addPhone}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Contact persons={persons} deleteContact={deleteContact} />
    </div>
  )
}
export default App
