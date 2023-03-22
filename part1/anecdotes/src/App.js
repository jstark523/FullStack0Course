import { useState } from 'react'

const Votes = ({selected, votes}) =>{
  return (
    <div>
    has {votes[selected]} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [values, setValues] = useState(new Uint8Array(10))


  function getRandomInt(max) {
    var num = Math.floor(Math.random() * max)
    return (num === selected) ? getRandomInt(max) : num

  }

  const randSaying = () => {
    setSelected(getRandomInt(7))
  }

  const addVote = () => {
    const copy = [...values]
    copy[selected] += 1
    setValues(copy)
  }

  return (
    <div>
      {anecdotes[selected]}
      <Votes selected={selected} votes = {values}></Votes>
      <div>
      <button onClick={addVote}>vote</button><button onClick={randSaying}>next anecdote</button>
      </div>
    </div>
  )
}

export default App