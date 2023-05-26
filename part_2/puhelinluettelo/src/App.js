import { List, PersonForm, FilterForm } from './components/Phonebook.js'
import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
	const [persons, setPersons] = useState([])
  	const [newName, setNewName] = useState('')
  	const [number, setNumber] = useState('')
  	const [filter, setFilter] = useState('')

  	const nameChange = (event) => setNewName(event.target.value)
  	const numberChange = (event) => setNumber(event.target.value)
  	const updateFilter = (event) => setFilter(event.target.value)

	useEffect(() => {
		console.log('effect')
		axios
		.get('http://localhost:3001/persons')
		.then(response => {
			console.log('promise fulfilled')
			setPersons(response.data)
		})
	}, [])

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
		<>
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
		</>
 	)
}

export default App