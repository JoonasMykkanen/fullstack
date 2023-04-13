import { useState } from 'react'

const DisplayText = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value}) => {
	return (
		<tr>
				<td>{text}</td>
				<td>{value}</td>
		</tr>
	)
}
const Statistics = ({good, neutral, bad}) => {
	const sum = good + neutral + bad
	const good_val = good * 1
	const bad_val = bad * -1
	const posPrecentage = good / sum * 100
	const average = (good_val + bad_val) / sum
	if (sum === 0) {
		return (
			<p>No feedbacks given yet..</p>
		)
	}
	return (
		<table>
			<tbody>
				<StatisticLine text='Good' value={good} />
				<StatisticLine text='Neutral' value={neutral} />
				<StatisticLine text='Bad' value={bad} />
				<StatisticLine text='All' value={sum} />
				<StatisticLine text='Average' value={average} />
				<StatisticLine text='Positive' value={posPrecentage} />	
			</tbody>
		</table>
	)
}	

const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>{text}</button>
	)
}

const App = (props) => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const handleGood = () => setGood(good + 1)
	const handleNeutral = () => setNeutral(neutral + 1)
	const handleBad = () => setBad(bad + 1)

	return (
		<div>
			<DisplayText text="Unicafe feedback" />
			<Button handleClick={handleGood} text='Good' />
			<Button handleClick={handleNeutral} text='Neutral' />
			<Button handleClick={handleBad} text='Bad' />
			<DisplayText text='Statistics' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App