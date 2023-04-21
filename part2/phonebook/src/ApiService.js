import axios from 'axios'

const baseUrl = "http://localhost:3001/persons";

const addPerson = (person) => {
  axios
    .post(baseUrl, person)
    .then(response =>{
      console.log(response.data);
    });
}

const deletePerson = (id) => {
  axios
    .delete(`${baseUrl}/${id}`)
    .then(response =>{
      console.log(response.data);
    });
}

export { addPerson, deletePerson };