import FilterForm from './components/filter.js'
import { useState, useEffect } from 'react'
import List from './components/list.js'
import axios from 'axios'

const App = () => {
	const [data, setData] = useState([])
	const [filter, setFilter] = useState('')

  	const updateFilter = (event) => setFilter(event.target.value)

	useEffect (() => {
		axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')	
			.then(response => {
				setData(response.data)
			})
	}, [])

	const filterList = (filter) => {
		return data.filter((item) =>
		  item.name.common.toLowerCase().includes(filter.toLowerCase())
		)
	  }

	const filteredItems = filterList(filter);

	return (
	  <div>
		<FilterForm
			filter={filter}
			updateFilter={updateFilter}
			setFilter={setFilter}/>
		<List
			countries={filteredItems}
			updateFilter={setFilter}/>
	  </div>
	)
  }
  
  export default App
