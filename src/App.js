import React, { useState } from 'react';
import ct from 'countries-and-timezones';

function App() {

  const [countrySelected, setCountry] = useState(null);
  //sets countrySelected as default as emtpy, think of it like a variable that needs to get updated
  const [timezones, setTimezones] = useState([]);
  //this is an array of different time zones for the future
  const [chosenTimeZone, getChosenTimeZone] = useState(null);
  const allCountries = Object.values(ct.getAllCountries());
  //get all countries but turns it into an array so it can get iterated over 
  const [showSelection, setShowSelection] = useState([]);
  const [allChoices, setAllChoices] = useState([]);

  const handleAddSelection = () => {
    if(countrySelected && chosenTimeZone){
      const newSelection = {
        country: countrySelected.name,
        timezone: chosenTimeZone
      };
      setAllChoices(prevChoices => [...prevChoices, newSelection])
      console.log(allChoices);
    }
  }

  const handleClear = () => {
    setAllChoices([]);
  }
  //event handler
  const countrySelectHandles = (e) => {
    const country = e.target.value;
    //set var as selected country
    const selected = ct.getCountry(country);
    setCountry(selected);
    //set chosen country to country selected
    setTimezones(Object.values(ct.getTimezonesForCountry(country)));
    //find timeZones for that country and set it equal to timezones
  };

  const timeZoneSelectHandles = (e) => {
    const timeZone = e.target.value;
    getChosenTimeZone(timeZone);
  };

  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1>TimeSync version #1</h1>

      {/*first method, select country and get timezones*/}

      <label>select a country: </label>
      <select onChange={countrySelectHandles}>
        {/* select dropdown every time it changes call the event handler*/}
        <option value="">---select a country---</option>
        {allCountries.map((country) => (
          <option key={country.id} value = {country.id}>
            {country.name}
          </option>
        ))}
      </select>

        {/* 
          <h2>Timezone</h2>
          <ul>
            {timezones.map((timezone) =>(
              <li key={timezone.name}>
                {timezone.name} UTC {timezone.utcOffsetStr}
              </li>
            ))}
          </ul> 
        */}
     
      <label>Select a timezone</label>
      <select onChange={timeZoneSelectHandles}>
        <option value="">---select a timezone---</option>
        {timezones.map((timezone) =>(
          <option key={timezone.name} value={timezone.name}>
            {timezone.name};
          </option>
        ))}
      </select>

      <button onClick={handleAddSelection}>Add country here</button>
      {/* {(
        <>
        <p>Chosen country: {countrySelected ? countrySelected.name : "None selected"} </p>
        <p>Chosen Timezone: {chosenTimeZone}</p>
        </>
      )} */}
      <h2>All Choices Updated</h2>
      <ul>
        {allChoices.map((choice, index) =>(
          <li key={index}>
            {choice.country} - {choice.timezone}
          </li>
        ))}
      </ul>
      
      <button onClick={handleClear}> clear all chocies </button>
    </div>
  );
}

export default App;
