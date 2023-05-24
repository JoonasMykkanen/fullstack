import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')

  const nameChange = (event) => setNewName(event.target.value)

  const numberChange = (event) => setNumber(event.target.value)

  const handleClick = (event) => {
	event.preventDefault()
	if (checkList(newName) === false) {
		setNewName('')
		setNumber('')
		setPersons([...persons, {name: newName, number: number}])
	}
  }

  const  checkList = (name) => {
	for (let i = 0; i < persons.length; i++) {
		if (persons[i].name === name) {
			alert(`${name} is already added to phonebook`)
			return (true)
		}
	}
	return (false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleClick}>
        <div>
          name: <input 
		  type="text"
		  value={newName}
		  onChange={nameChange}
		  />
        </div>
		<div>
			number: <input 
			type="text"
			value={number}
			onChange={numberChange}
			/>
		</div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
		{persons.map((person, index) => (
			<li key={index}>
				<span>{person.name} {person.number}</span>
			</li>
		))}
	  </ul>
    </div>
  )
}

export default App