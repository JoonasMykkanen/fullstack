import { useState } from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({data}) => <p>{data.name} {data.exercises}</p>

const Content = ({parts}) => {
	return (
		<>
			<Part data={parts[0]} />
			<Part data={parts[1]} />
			<Part data={parts[2]} />
		</>
	)
}

const Total = ({parts}) => {
	const count1 = parts[0].exercises
	const count2 = parts[1].exercises
	const count3 = parts[2].exercises
	const sum = count1 + count2 + count3
	return (
		<p>Number of exercises {sum}</p>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
			{
			  name: 'Fundamentals of React',
			  exercises: 10
			},
			{
			  name: 'Using props to pass data',
			  exercises: 7
			},
			{
			  name: 'State of a component',
			  exercises: 14
			}
		  ]
	}
  
	return (
	  <div>
		<Header course={course.name}/>
		<Content parts={course.parts}/>
		<Total parts={course.parts}/>
	  </div>
	)
  }
  
  export default App