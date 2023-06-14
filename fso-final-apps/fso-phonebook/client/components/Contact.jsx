const Contact = ({ persons, deleteContact }) => {
  if (!persons) return ''
  return (
    <>
      {persons.map((person) => (
        <div key={person.id} className="contact-info">
          {person.name} {person.number}{' '}
          <button id={person.id} type="button" onClick={deleteContact}>
            delete
          </button>
        </div>
      ))}
    </>
  )
}

export default Contact
