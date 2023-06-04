import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {city} ) => {
	const [weatherData, setWeatherData] = useState(null);

	const api_key = process.env.REACT_APP_API_KEY
	const base = 'http://api.weatherapi.com/v1/'
	const url = `${base}current.json?key=${api_key}&q=${city}&aqi=no`

	useEffect(() => {
		axios
		  	.get(url)
		  	.then(response => {
				if (response.status === 200) {
			  		setWeatherData(response.data)
				} else {
			  		console.log('Problem getting weather data')
				}
		  	})
		  	.catch(error => {
				console.error(error)
			})
	}, [url])

	if (!weatherData) {
		return <p>Loading weather data...</p>
	}

	const temp = weatherData.current.temp_c
	const wind = weatherData.current.wind_kph
  	const src = `https:${weatherData.current.condition.icon}`
	const txt = `https:${weatherData.current.condition.text	}`
	return (
		<>
			<h2>Weather in {city}</h2>
			<p>Temperature {temp} celsius</p>
			<img src={src} alt={txt} />
			<p>Wind {wind} kph</p>
		</>
	)
}

export default Weather