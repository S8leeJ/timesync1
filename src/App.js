import React, { useState } from 'react';
import ct from 'countries-and-timezones';

function App() {

  const [countrySelected, setCountry] = useState('');
  //sets countrySelected as default as emtpy, think of it like a variable that needs to get updated
  const [timezones, setTimezones] = useState([]);
  //this is an array of different time zones for the future

  const allCountries = Object.values(ct.getAllCountries());
  //get all countries but turns it into an array so it can get iterated over 


  const countrySelectHandles = (e) => {
    const country = e.target.value;
    //set var as selected country
    setCountry(country);
    //set chosen country to country selected
    setTimezones(Object.values(ct.getTimezonesForCountry(country)));
    //find timeZones for that country and set it equal to timezones
  }

  return (
    <div style={{ padding: '2rem' }}>
      <label>select a country: </label>
      <select onChange={countrySelectHandles}>
        <option value="">---select a country---</option>
        {allCountries.map((country) => (
          <option key={country.id} value = {country.id}>
            {country.name}
          </option>
        ))}
      </select>

      <h2>wddwd</h2>
      <ul>
        {timezones.map((timezone) =>(
          <li key={timezone.name}>
            {timezone.name} - 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
