import { List, PersonForm, FilterForm } from './components/Phonebook.js'
import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	  ])	
  	const [newName, setNewName] = useState('')
  	const [number, setNumber] = useState('')
  	const [filter, setFilter] = useState('')

  	const nameChange = (event) => setNewName(event.target.value)
  	const numberChange = (event) => setNumber(event.target.value)
  	const updateFilter = (event) => setFilter(event.target.value)

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
			<FilterForm filter={filter} updateFilter={updateFilter}/>
			<PersonForm 
			newName={newName}
			number={number}
			numberChange={numberChange}
			nameChange={nameChange}
			handleClick={handleClick}
			/>
			<List persons={persons} filter={filter}/>
		</div>
 	)
}

export default App