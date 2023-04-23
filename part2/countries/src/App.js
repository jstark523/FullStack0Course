import { useEffect, useState} from 'react'
import axios from 'axios'

const Result = ({result}) =>{
  if(result !== null){
    if(result.length === 1){
      const languages = Object.values(result[0].languages);
      return (
        <div>
          <h1>{result[0].name.common}</h1>
          <p>Capital: {result[0].capital[0]}</p>
          <p>Area: {result[0].area}</p>
          <b>Languages:</b>
          <ul>
          {languages.map((language) => (
            <li>{language}</li>
          ))}
          </ul>
          <p>
          <font size= "+7">
          {result[0].flag}
          </font>
          </p>
        </div>
      );
    }
    else if(result.length <= 10 && result.length > 1){
      return (
        <div>
          {result.map((country) => 
            <p>{country.name.common}</p>
          )}
        </div>
      );
    }
    else{
      return (
        <p>Too many matches, please be more specific</p>
      );
    }
  }
}

function App() {
  const [countryData, setCountryData] = useState(null);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() =>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountryData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  },[])

  const searchFunc = () =>{
    const filteredCountries = countryData.filter(country => country.name.common.toLowerCase().includes(search));
    setResult(filteredCountries);
  }

  const handleSearchChange = (event) =>{
    setSearch(event.target.value.toLowerCase());
    searchFunc();
  }

  return (
    <div className="App">
      <p>
      find countries<input onChange={handleSearchChange}></input>
      </p>
      <Result result = {result}/>
    </div>
  );
}

export default App;
