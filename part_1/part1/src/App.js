// const App = () => {
// 	const course = 'Half Stack application development'
// 	const part1 = 'Fundamentals of React'
// 	const exercises1 = 10
// 	const part2 = 'Using props to pass data'
// 	const exercises2 = 7
// 	const part3 = 'State of a component'
// 	const exercises3 = 14
  
// 	return (
// 	  <div>
// 		<h1>{course}</h1>
// 		<p>
// 		  {part1} {exercises1}
// 		</p>
// 		<p>
// 		  {part2} {exercises2}
// 		</p>
// 		<p>
// 		  {part3} {exercises3}
// 		</p>
// 		<p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
// 	  </div>
// 	)
//   }

const Header = (props) => {
	return (
		<div>
			<h1>{props.data}</h1>
		</div>
	)
}

const Part = (props) => {
	const idx = props.index
	return (
		<>
			<p>{props.data[idx].str} {props.data[idx].int}</p>
		</>
	)
}

const Content = (props) => {
	return (
		<div>
			<Part data={props.data} index={0}/>
			<Part data={props.data} index={1}/>
			<Part data={props.data} index={2}/>
		</div>
	)
}

const Total = (props) => {
	return (
		<div>
			<p>Number of exercises {props.data}</p>
		</div>
	)
}

const App = () => {
	const content = [
		{ str: 'Fundamentals of React', int: 10},
		{ str: 'Using props to pass data', int: 7},
		{ str: 'State of a component', int: 14},
	]
	const total = content[0].int +  content[1].int +  content[2].int
	const course = 'Half Stack application development'

	return (
		<div>
			<Header data={course}/>
			<Content data={content}/>
			<Total data={total}/>
		</div>
	)
}

export default App