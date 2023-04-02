import { useState } from 'react'

const Filter = (props) =>{
  return (
    <div>
    filter by name: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm =(props) =>{
  return (
    <form onSubmit={props.handleNewPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handlePersonChange}/>
    </div>
    <div>number: <input value={props.newNumber}  onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const PeopleView = ({filter, persons}) =>{
  if(filter === ''){
    return (
      <>
        {persons.map(person =>(
          <p>{person.name} {person.number}</p>
        ))}
      </>
    )
  }
  else{
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        {filtered.map(person =>(
          <p>{person.name} {person.number}</p>
        ))}
      </>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')


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

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilterChange = {handleFilterChange}/>
      <h2>add a new entry</h2>
      <PersonForm newName ={newName} newNumber = {newNumber} handlePersonChange = {handlePersonChange} handleNewPerson = {handleNewPerson} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <PeopleView filter={filter} persons = {persons}/>
    </div>
  )
}

export default App
