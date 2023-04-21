import { useState, useEffect } from 'react'
import axios from 'axios'
import { addPerson, deletePerson } from './ApiService'

const Filter = (props) =>{
  return (
    <div>
    filter by name: <input value={props.filter} onChange={props.handleFilterChange}/>
    </div>
  )
}

const deleteFunc = (id, persons, setPersons) =>{
  const toDelete = persons.find(person => person.id === id);
  if(window.confirm(`Are you sure you want to delete ${toDelete.name}?`)){
    const otherPeople = persons.filter(person => person.id !== id);
    setPersons(otherPeople);
    deletePerson(id);
  }
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

const PeopleView = ({filter, persons, setPersons}) =>{
  if(filter === ''){
    return (
      <>
        {persons.map(person =>(
          <p>{person.name} {person.number} <button onClick={() => deleteFunc(person.id, persons, setPersons)}>Delete</button></p>
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  useEffect(() =>{
    console.log('effect');
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)
    })
  }, [])
  
  console.log('render', persons.length, 'notes')

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
      addPerson(newPerson);
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
      <PeopleView filter={filter} persons = {persons} setPersons={setPersons}/>
    </div>
  )
}

export default App
