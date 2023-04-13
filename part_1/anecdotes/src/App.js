import { useState } from 'react'

const DisplayHeading = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const DisplayFavorite = ({anecdotes}) => {
	let count = 0
	let idx = 0
	let i = 0
	while (i < anecdotes.length) {
		if (anecdotes[i].votes > count) {
			count = anecdotes[i].votes
			idx = i
		}
		i++
	}
	if (count === 0) {
		return (
			<div>
				<DisplayHeading text='Anecdote with most votes'/>
				<p>No votes yet, vote at least once to see favourite anecdote!</p>
			</div>
		)
	} else {
		return (
			<div>
				<DisplayHeading text='Anecdote with most votes'/>
				<p>{anecdotes[idx].text}</p>
				<p>Has {anecdotes[idx].votes} votes.</p>
			</div>
		)
	}
}

const App = () => {
	const [anecdotes, updateData] = useState([
		{ text: 'If it hurts, do it more often.', votes: 0 },
		{ text: 'Adding manpower to a late software project makes it later!', votes: 0 },
		{ text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
		{ text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
		{ text: 'Premature optimization is the root of all evil.', votes: 0 },
		{ text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
		{ text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', votes: 0 },
		{ text: 'The only way to go fast, is to go well.', votes: 0 },
	])
	const [idx, setIndex] = useState(0)
	const incrementIndex = () => {
		if (idx >= anecdotes.length - 1) {
			setIndex(0)
		} else {
			setIndex(idx + 1)
		}
		console.log('current index', idx)
	}
	const voteThis = () => {
		const newArr = [...anecdotes]
		newArr[idx].votes += 1
		console.log('votes: ', newArr[idx].votes)
		updateData(newArr)
	}

	return (
		<div>
			<DisplayHeading text='Anecdote of the day'/>
			<p>{anecdotes[idx].text}</p>
			<p>Has {anecdotes[idx].votes} votes.</p>
			<Button handleClick={incrementIndex} text='next anecdote'/>
			<Button handleClick={voteThis} text='vote'/>
			<DisplayFavorite anecdotes={anecdotes}/>
		</div>
	)
}

export default App