const ResetButton = ( {action} ) => {
	return (
		<>
			<button onClick={action}>reset</button>
		</>
	)
}

const FilterForm =  ( {filter, updateFilter, setFilter} ) => {
	const handleReset = () => {
		setFilter('')
	}
	return (
		<>
			<>
				filter shown with: <input
				type="text"
				value={filter}
				onChange={updateFilter}
				/>
				<ResetButton action={handleReset}/>
			</>
		</>
	)
}

export default FilterForm