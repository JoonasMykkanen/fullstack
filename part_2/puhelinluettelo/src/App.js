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

	 const List = ( {persons, filter} ) => {
		const trimmed = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
		return (
			<ul>
				{trimmed.map((person, index) => (
				<li key={index}>
					<span>{person.name} {person.number}</span>
				</li>
				))}
			</ul>
		)
	 }

  	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with: <input
				type="text"
				value={filter}
				onChange={updateFilter}
				/>
			</div>
			<h1>add a new</h1>
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
			<List persons={persons} filter={filter}/>
		</div>
 	)
}

export default App