import axios from 'axios'

const baseUrl = "/api/persons";

const addPerson = (person) => {
  return axios.post(baseUrl, person);
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const updateNumber = (person) => {
  return axios.put(`${baseUrl}/${person.id}`, person);
}

export { addPerson, deletePerson, updateNumber };