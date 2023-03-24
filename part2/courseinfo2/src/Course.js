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
  

  export default Course