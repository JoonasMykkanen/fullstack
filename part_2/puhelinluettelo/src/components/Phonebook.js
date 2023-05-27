const FilterForm =  ( {filter, updateFilter} ) => {
	return (
		<>
			<div>
				filter shown with: <input
				type="text"
				value={filter}
				onChange={updateFilter}
				/>
			</div>
		</>
	)
}

const PersonForm = ( {newName, newNumber, numberChange, nameChange, handleClick} ) => {
	return (
		<>
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
					value={newNumber}
					onChange={numberChange}
					/>
				</div>
				<div>
					<button type="submit" onClick={handleClick}>add</button>
				</div>
			</form>
		</>
	)
}

const List = ( {persons, filter} ) => {
	const trimmed = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
	return (
		<>
			<h2>Numbers</h2>
			<ul>
				{trimmed.map((person, index) => (
				<li key={index}>
					<span>{person.name} {person.number}</span>	
				</li>
				))}
			</ul>
		</>
	)
 }

export { 
	List,
	PersonForm,
	FilterForm
}