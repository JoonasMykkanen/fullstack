import { List, PersonForm, FilterForm } from './components/Phonebook.js'
import pbService from './services/persons.js'
import { useState, useEffect } from 'react'

const App = () => {
	const [persons, setPersons] = useState([])
  	const [newName, setNewName] = useState('')
  	const [newNumber, setNumber] = useState('')
  	const [filter, setFilter] = useState('')

  	const nameChange = (event) => setNewName(event.target.value)
  	const numberChange = (event) => setNumber(event.target.value)
  	const updateFilter = (event) => setFilter(event.target.value)

	useEffect (() => {
		pbService.getAll().then(list => {setPersons(list)})
			.catch(error => {console.log('could not get list from server')})
	}, [])

	const updatePersonalInfo = (id) => {
		const person = persons[id]
		if (window.confirm(`${person.name} is already in phonebook, update number?`)) {
			console.log('user accepted update prompt')
			pbService.update(person.id, {name: person.name, number: newNumber})
				.then(response => {
					const updatedPersons = [...persons]
					updatedPersons[id] = { ...updatedPersons[id], name: person.name, number: newNumber }
					setPersons(updatedPersons)
					console.log('updated number succesfully')
				})
				.catch(error => {console.log('Error updating number')})
		} else {
			console.log('user rejected update prompt')
		}
	}

	const  checkList = (name) => {
		const lowerName = name.toLowerCase()
		for (let i = 0; i < persons.length; i++) {
			const lowerPersonsName = persons[i].name.toLowerCase()
			if (lowerPersonsName === lowerName) {
				updatePersonalInfo(i)
				return (true)
			}
		}
		return (false)
	}

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
		} else {
			console.log('User cancelled delete')
		}
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