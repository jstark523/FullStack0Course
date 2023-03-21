import { useState } from 'react'

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {bad + good + neutral}</p>
      <p>average {(bad + good + neutral)/3}</p>
      <p>positive {good/(neutral + bad + good)} %</p>
      </>
    )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button><button onClick={() => setNeutral(neutral + 1)}>Neutral</button><button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good = {good} bad = {bad} neutral = {neutral}></Statistics>
    </div>
  )
}

export default App
