import axios from 'axios'

export const addPerson = (person) => {
    axios
    .post("http://localhost:3001/persons", person)
    .then(response =>{
        console.log(response.data);
    });
}