import { useState } from 'react'

const Button = ({text, handleClick}) =>{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = (props) =>{
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.endl}</td>
    </tr>  
    )
}

const Statistics = ({good, bad, neutral}) => {
  if(good + neutral + bad === 0){
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
    return (
      <>
      <h1>statistics</h1>
      <table>
      <StatisticLine text = "good" value = {good} endl = ""></StatisticLine>
      <StatisticLine text = "neutral" value = {neutral} endl = ""></StatisticLine>
      <StatisticLine text = "bad" value = {bad} endl = ""></StatisticLine>
      <StatisticLine text = "all" value = {bad + good + neutral} endl = ""></StatisticLine>
      <StatisticLine text = "average" value = {(bad + good + neutral)/3} endl = ""></StatisticLine>
      <StatisticLine text = "positive" value = {(good/(neutral + bad + good)) * 100} endl = "%"></StatisticLine>
      </table>
      </>
    )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const badClick = () => setBad(bad + 1)
  const neutralClick = () => setNeutral(neutral + 1)


  return (
    <div>
      <h1>give feedback</h1>
      <Button text = "good" handleClick={goodClick}></Button><Button text = "neutral" handleClick={neutralClick}></Button><Button text = "bad" handleClick={badClick}></Button>
      <Statistics good = {good} bad = {bad} neutral = {neutral}></Statistics>
    </div>
  )
}

export default App
