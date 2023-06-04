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

export default FilterForm