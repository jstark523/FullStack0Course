import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '111-1111'}
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const handleNewPerson = (event) =>{
    event.preventDefault()
    const findName = persons.find(person => person.name === newName)
    const findNumber = persons.find(person => person.number === newNumber)
    if(findName){
      window.alert(`${newName} is already added to phonebook`)
    }
    else if(findNumber){
      window.alert(`${newNumber} is already added to phonebook`)
    }
    else if(newName === ''){
      window.alert(`No name entered.`)
    }
    else if(newNumber === ''){
      window.alert(`No number entered.`)
    }
    else{
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
    }
    const blank = ''
    setNewName(blank)
    setNewNumber(blank)
  }

  const handlePersonChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>number: <input value={newNumber}  onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>(
        <p>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default App
