import React, { useState } from 'react';
import ct from 'countries-and-timezones';
import { useEffect } from 'react';

export default function Times() {

    const allCountries = Object.values(ct.getAllCountries());
    const [countrySelected, setCountry] = useState(null);
    const [timezones, setTimezones] = useState([]);
    const [chosenTimeZone, getChosenTimeZone] = useState(null);
    const [allChoices, setAllChoices] = useState([]);
    const [now, setNow] = useState(new Date());
    const [checked, setChecked] = useState({});

    const selectedItems = allChoices.filter(choice =>
        checked[`${choice.country}-${choice.timezone}`]
    );

    const handleSelectedClear = () => {
        const updatedChoices = allChoices.filter(choice => !selectedItems.includes(choice));
        setAllChoices(updatedChoices);
        setChecked({});
    }

    const handleCheckBox = (key) => {
        setChecked(previous => ({
            ...previous, [key]: !previous[key]
        }));
    }

    const countrySelectHandles = (e) => {
        const country = e.target.value;
        const selected = ct.getCountry(country);
        setCountry(selected);
        setTimezones(Object.values(ct.getTimezonesForCountry(country)));
    };

    const timeZoneSelectHandles = (e) => {
        const timeZone = e.target.value;
        getChosenTimeZone(timeZone);
    };

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
            else {
                alert("Please select a country and timezone that you have not already added");
            }
        }
        else {
            alert("Please select a country and timezone");
        }
    }

    const handleClear = () => {
        setAllChoices([]);
        setChecked({});
    }

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
        <div className="min-h-screen text-white flex flex-col items-center py-8">
            <div className="w-full max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between rounded-1xl p-6 mb-8">

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-8xl font-extrabold tracking-tight mb-2">TIMESYNC</h1>
                        <p className="text-lg text-blue-300 font-medium">Connecting time and world</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-gradient-to-r from-blue-900 to-blue-300 rounded-xl p-6 shadow">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                        <select className="selection block w-full md:w-56 px-4 py-2 rounded-lg bg-slate-300 text-black border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={countrySelectHandles}>
                            <option value="">---Select a country---</option>
                            {allCountries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <select className="selection block w-full md:w-56 px-4 py-2 rounded-lg bg-slate-300 text-black border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={timeZoneSelectHandles}>
                            <option value="">---Select a timezone---</option>
                            {timezones.map((timezone) => (
                                <option key={timezone.name} value={timezone.name}>
                                    {timezone.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="button mt-4 md:mt-0 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-white font-semibold transition" onClick={handleAddSelection}>Add Time</button>
                </div>

                <div className="bg-slate-800 rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                        <h2 className="text-2xl font-bold">My Times</h2>
                        <div className="flex gap-2">
                            <button className="button px-4 py-2 bg-blue-500 hover:bg-red-200 rounded-lg text-black font-semibold transition" onClick={handleClear}>Clear all</button>
                            <button className="button px-4 py-2 bg-blue-500 hover:bg-yellow-200 rounded-lg text-black font-semibold transition" onClick={handleSelectedClear}>Clear selected</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {allChoices.map((choice, index) => {
                            const key = `${choice.country}-${choice.timezone}-${index}`;
                            return (
                                <div key={key} className="eachChoice bg-slate-900 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 shadow hover:shadow-xl transition">
                                    <div className="showTime flex-1 text-center">
                                        <h1 className="text-3xl font-mono font-bold text-green-200">{getTimeForZone(choice.timezone)}</h1>
                                    
                                    </div>
                                    <label className="flex flex-col items-center md:items-start gap-1 flex-1">
                                        <span className="selectedText text-lg font-semibold">{choice.country}</span>
                                        <span className="selectedText text-blue-300 text-sm">{choice.timezone}</span>
                                         
                                    </label>
                                    <input
                                            type="checkbox"
                                            className="mt-2 w-5 h-5 accent-blue-300"
                                            checked={checked[`${choice.country}-${choice.timezone}`]}
                                            onChange={() => handleCheckBox(`${choice.country}-${choice.timezone}`)}
                                        />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

}
