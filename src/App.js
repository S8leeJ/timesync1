import React, { useState } from 'react';
import ct from 'countries-and-timezones';
import { useEffect } from 'react';


function App() {
  const allCountries = Object.values(ct.getAllCountries());
  //set the country (object)
  const [countrySelected, setCountry] = useState(null);
  //array of all of the timezones associated to each country
  const [timezones, setTimezones] = useState([]);
  //const to hold current chosenTimezone
  const [chosenTimeZone, getChosenTimeZone] = useState(null);
  const [allChoices, setAllChoices] = useState([]);
  const [now, setNow] = useState(new Date());
  const [checked, setChecked] = useState({});

  //get an array of the checked items
  const selectedItems = allChoices.filter(choice =>
    checked[`${choice.country}-${choice.timezone}`]
  );

  //updates the choices to only include nonChecked items whenever it is ran 
  const handleSelectedClear = () => {
    const updatedChoices = allChoices.filter(choice => !selectedItems.includes(choice));
    setAllChoices(updatedChoices);
    setChecked({});
  }

  //changes and sets the state of the check whenever clicked 
  const handleCheckBox = (key) => {
    setChecked(previous => ({
      ...previous, [key]: !previous[key]
    }));

  }

  //sets the country from the drop down event 
  const countrySelectHandles = (e) => {
    const country = e.target.value;
    const selected = ct.getCountry(country);
    setCountry(selected);
    setTimezones(Object.values(ct.getTimezonesForCountry(country)));
  };

  //sets the timezone from the drop down event 
  const timeZoneSelectHandles = (e) => {
    const timeZone = e.target.value;
    getChosenTimeZone(timeZone);
  };

  //sets an array of the selected country and timezone 
  const handleAddSelection = () => {
    if (countrySelected && chosenTimeZone) {
      const newSelection = {
        country: countrySelected.name,
        timezone: chosenTimeZone
      };
      if(!allChoices.some(choice =>
        choice.country === newSelection.country && choice.timezone === newSelection.timezone
      )){
        setAllChoices(prevChoices => [...prevChoices, newSelection])
      }
    }
  }

  //clears all of the selectedChoices and resets checks 
  const handleClear = () => {
    setAllChoices([]);
    setChecked({});
  }

  //for updating live times 
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeForZone = (zone) => {
    if (!zone) return null;
    return new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(now);
  };

  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h1>TimeSync version #1</h1>

      <label>select a country: </label>
      <select onChange={countrySelectHandles}>
        <option value="">---select a country---</option>
        {allCountries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>

      <label>Select a timezone</label>
      <select onChange={timeZoneSelectHandles}>
        <option value="">---select a timezone---</option>
        {timezones.map((timezone) => (
          <option key={timezone.name} value={timezone.name}>
            {timezone.name};
          </option>
        ))}
      </select>

      <button onClick={handleAddSelection}>Add country here</button>
      <h2>All Choices Updated</h2>
      <ul>
        {allChoices.map((choice, index) => {
          const key = `${choice.country}-${choice.timezone}-${index}`;
          return (
            <li key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={checked[`${choice.country}-${choice.timezone}`]}
                  onChange={() => handleCheckBox(`${choice.country}-${choice.timezone}`)}
                />
                {choice.country} - {choice.timezone}
              </label>
              <p>Local Time: {getTimeForZone(choice.timezone)}</p>
            </li>
          );
        })}
      </ul>
      <button onClick={handleClear}> clear all choices </button>
      <button onClick={handleSelectedClear}> clear selected choices </button>
    </div>
  );
}

export default App;
