import { List, PersonForm, FilterForm } from './components/Phonebook.js'
import pbService from './services/persons.js'
import { useState, useEffect } from 'react'

const App = () => {
	// Init fields and phonebook list
	const [persons, setPersons] = useState([])
  	const [newName, setNewName] = useState('')
  	const [newNumber, setNumber] = useState('')
  	const [filter, setFilter] = useState('')

	// Define functions to manipulate list
  	const nameChange = (event) => setNewName(event.target.value)
  	const numberChange = (event) => setNumber(event.target.value)
  	const updateFilter = (event) => setFilter(event.target.value)

	// Get initial list from server
	useEffect (() => {
		pbService.getAll().then(list => {setPersons(list)})
			.catch(error => {console.log('could not get list from server')})
	}, [])

	// Looping trough list and checking for current input for matches
	// Returns true if found and in that case prompt error and return
	// true to signal function caller to not add name in the phonebook
	const  checkList = (name) => {
		const lowerName = name.toLowerCase()
		for (let i = 0; i < persons.length; i++) {
			const lowerPersonsName = persons[i].name.toLowerCase()
			if (lowerPersonsName === lowerName) {
				alert(`${name} is already added to phonebook`)
				return (true)
			}
		}
		return (false)
	}

	// checking if name is alraedy on the list
	// if it is not found, adds it to the database, fiels reseted in both cases
	const addButton = (event) => {
		event.preventDefault()
		const newItem = {name: newName, number: newNumber}
		if (checkList(newName) === false) {
			pbService
				.create(newItem)
				.then(updatedList => {
					setPersons([...persons, {name: newName, number: newNumber}])
					console.log('added new item to list')
				})
				.catch(error => {console.log('error with creating new person')})
		}
		setNewName('')
		setNumber('')
	}

	// delete index "id" from the database and then filter out the id from the local list
	// update list to make changes to screen
	const deleteButton = (id) => {
		const person = persons.find((person) => person.id === id)
		const name = person.name
		console.log(name)
		if (window.confirm(`Are you sure to remove "${name}" from the phonebook?`)) {
			pbService
				.remove(id)
				.then(updatedList => {
					setPersons(persons.filter((person) => person.id !== id))
					console.log('removed from database and updated the view')
				})
				.catch(error => {console.log(`error while removing person ${id} from list`)})
		}
		console.log('User cancelled delete')
	}
	
  	return (
		<>
			<div>
				<h2>Phonebook</h2>
				<FilterForm
					filter={filter}
					updateFilter={updateFilter}/>
				<PersonForm 
					newName={newName}
					newNumber={newNumber}
					numberChange={numberChange}
					nameChange={nameChange}
					action={addButton}/>
				<List
					persons={persons}
					action={deleteButton}
					filter={filter}/>
			</div>
		</>
 	)
}

export default App