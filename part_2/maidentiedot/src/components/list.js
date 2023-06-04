import Weather from './weather.js'

const ShowButton = ( {country, action} ) => {
	return (
		<>
			<button onClick={() => action(country.name.common)}>show</button>
		</>
	)
}

const Country = ( {country} ) => {
	const languages = Object.values(country.languages)
	const name = country.name.common
	const capital = country.capital
	const photo = country.flags.png
	const alt = country.flags.alt
	const area = country.area
	return (
		<>
			<h1>{name}</h1>
			<p>Capital: {capital}</p>
			<p>Area: {area}</p>
			<p>languages: </p>
			<ul>
				{languages.map((langugage) => (
					<li key={langugage}>{langugage}</li>
				))}
			</ul>
			<img src={photo} alt={alt} />
			<Weather city={capital} />
		</>
	)
}

const List = ( {countries, updateFilter} ) => {
	const len = countries.length
	if (len === 1) {
		return (
			<>
				<Country country={countries[0]} />
			</>
		)
	}
	if (len > 10) {
		return (
			<>
				<p>Too many matches, specify another filter</p>
			</>
		)
	} else {
		return (
			<>
				<ul>
					{countries.map((item) => (
						<li key={item.cca3}>{item.name.common}
						<ShowButton
							country={item}
							action={updateFilter}/>
						</li>
					))}
				</ul>
			</>
		)
	}
}

export default List