const Header = ({course}) => <h2>{course}</h2>

const Total = ({parts}) => {
  var sum = parts.reduce((total, curPart) => {
    return total + curPart.exercises
  },0)

  return (
    <b>Total of {sum} exercises</b>
  )
}

const Part = ({part}) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Course = ({course}) => {
  console.log(course.name);
  return(
    <div>
    <Header course={course.name} />
    {course.parts.map( part =>
      <Part key={part.id} part={part}></Part>
    )}
    <Total parts={course.parts} />
    </div>
  )

}

const Courses = ({courses}) => {
  return courses.map(course => (
    <Course key={course.id} course={course} />
  ))
}

const App = () => {
  const courses = [
  {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  return (
  <>
  <h1>Web development curriculum</h1>
  <Courses courses={courses} />
  </>
  )
}

export default App