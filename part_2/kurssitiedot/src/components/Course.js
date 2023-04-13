const Header = ({course}) => <h2>{course}</h2>

const Part = ({data}) => <p>{data.name} {data.exercises}</p>

const Content = ({parts}) => {
	return (
		<>
			{parts.map (part => (
				<Part key={part.name} data={part}/>
			))}
		</>
	)
}

const Total = ({parts}) => {
	const sum = parts.reduce((total, part) => total + part.exercises, 0)
	return (
		<p>Total of {sum} exercises</p>
	)	
}

const Course = ({course}) => {
	return (
		<>
			<Header course={course.name}/>
			<Content parts={course.parts}/>
			<Total parts={course.parts}/>
		</>
	)
}

export default Course