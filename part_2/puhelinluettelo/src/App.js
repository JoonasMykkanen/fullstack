import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const inputChange = (event) => {
	setNewName(event.target.value)
  }

  const handleClick = (event) => {
	event.preventDefault()
	setPersons([...persons, {name: newName }])
	setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleClick}>
        <div>
          name: <input 
		  type="text"
		  value={newName}
		  onChange={inputChange}
		  />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
		{persons.map((person, index) => (
			<li key={index}>{person.name}</li>
		))}
	  </ul>
    </div>
  )
}

export default App