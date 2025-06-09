import React, { useState } from 'react';
import ct from 'countries-and-timezones';
import { useEffect } from 'react';
import './App.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


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
      if (!allChoices.some(choice =>
        choice.country === newSelection.country && choice.timezone === newSelection.timezone
      )) {
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
    <div className="App">
      <div className="header">

        <div className="anim">
          <DotLottieReact
            src="https://lottie.host/17c75c4a-6533-404e-ae55-3d8bd7cd4608/jDEk3gXCqF.lottie"
            autoplay
            loop
          />
        </div>

        <div className="text">
          <h1>TIMESYNC</h1>
          <p>Connecting time and world</p>
        </div>
      </div>

      <div className="addTime">
        <div className="select">

          <select className="selection" onChange={countrySelectHandles}>
            <option value="">---Select a country---</option>
            {allCountries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>

          <select className="selection" onChange={timeZoneSelectHandles}>
            <option value="">---Select a timezone---</option>
            {timezones.map((timezone) => (
              <option key={timezone.name} value={timezone.name}>
                {timezone.name};
              </option>
            ))}
          </select>
        </div>
        <div className="addTimeButton">
          <button className="button" onClick={handleAddSelection}>Add Time</button>
        </div>
      </div>

      <div className="choices">
        <h2>My Times</h2>
        <button className="button" onClick={handleClear}> clear all choices </button>
        <button className="button" onClick={handleSelectedClear}> clear selected choices </button>

        <div className="selectedChoices">


          {allChoices.map((choice, index) => {
            const key = `${choice.country}-${choice.timezone}-${index}`;
            return (
              <div key={key} className="eachChoice">

                <div className="showTime">
                  <h1>{getTimeForZone(choice.timezone)}</h1>
                </div>

                <label>
                  <div className="selectedText">
                    <h2>
                      {choice.country}
                    </h2>
                  </div>
                  <div className="selectedText">

                    {choice.timezone}

                  </div>
                  <input
                    type="checkbox"
                    checked={checked[`${choice.country}-${choice.timezone}`]}
                    onChange={() => handleCheckBox(`${choice.country}-${choice.timezone}`)}
                  />



                </label>
              </div>
            );
          })}

        </div>

      </div >


    </div >
  );
}

export default App;
