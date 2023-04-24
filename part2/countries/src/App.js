import { useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({weather, got}) =>{
  if (weather !== null && got === true){
    return (
      <>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      <p>wind {weather.wind.speed} m/s</p>
      </>
    );
  }
}

const Result = ({result, setResult, setGot}) =>{  
  if(result.length !== 0){
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
          <h2>Weather in {result[0].name.common}</h2>
        </div>
      );
    }
    else if(result.length <= 10 && result.length > 1){
      setGot(false);
      return (
        <div>
          {result.map((country) => 
            <p>{country.name.common}<button onClick={() => setResult([country])}>show</button></p>
          )}
        </div>
      );
    }
    else{
      setGot(false);
      return (
        <p>Too many matches, please be more specific</p>
      );
    }
  }
}

function App() {
  const api_key = process.env.REACT_APP_API_KEY

  const [countryData, setCountryData] = useState(null);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState([]);
  const [weather, setWeather] = useState(null);
  const [got, setGot] = useState(false);


  useEffect(() =>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountryData(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  },[])

  useEffect(() => {
    if (result.length === 1){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&lat=${result[0].latlng[0]}&lon=${result[0].latlng[1]}&units=metric`)
      .then(response =>{
        setWeather(response.data);
        setGot(true);
    })}
  }, [result])


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
      <Result result = {result} setResult = {setResult} setGot = {setGot}/>
      <Weather weather={weather} got={got}/>
    </div>
  );
}

export default App;
