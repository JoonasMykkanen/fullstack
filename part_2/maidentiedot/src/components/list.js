const Country = ( {country} ) => {
	const languages = Object.values(country.languages)
	const name = country.name.common
	const capital = country.capital
	const photo = country.flags.png
	const alt = country.flags.alt
	const area = country.area
	return (
		<div>
			<h2>{name}</h2>
			<p>{capital}</p>
			<p>{area}</p>
			<p>languages: </p>
			<ul>
				{languages.map((langugage, id) => (
					<li key={id}>{langugage}</li>
				))}
			</ul>
			<img src={photo} alt={alt} />
		</div>
	)
}

const List = ( {countries} ) => {
	const len = countries.length
	if (len === 1) {
		return (
			<div>
				<Country country={countries[0]} />
			</div>
		)
	}
	if (len > 10) {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	} else {
		return (
			<div>
				<ul>
					{countries.map((item) => (
						<li key={item.cca3}>{item.name.common}</li>
					))}
				</ul>
			</div>
		)
	}
}

export default List