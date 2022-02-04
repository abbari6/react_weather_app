import React, { useEffect, useState } from 'react';
import './style.css'
import WeatherCard from './weatherCard';
const Temp = () => {
const [searchValue, setSearchValue] = useState("srinagar");
const [tempInfo, setTempInfo] = useState({});

const getWeatherInfo = async () => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=24ee39b98d69a358b04e84767dc2fbc7`;

        const res = await fetch(url);
        const data = await res.json();
      const {temp, humidity, pressure} = data.main;
      const {main: weathermood} = data.weather[0];
      const {name} = data;
      const {speed} =data.wind;
      const{country, sunset} = data.sys;
        const myNewWheaterInfo = {
            temp,
            humidity,
             pressure,
              weathermood,
               name,
               speed,
                country,
                 sunset,
        }
        setTempInfo(myNewWheaterInfo);
    }   catch (error) {
        console.log(error);
    }
};

useEffect(()=> {
    getWeatherInfo();
}, []);

    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search"
                        placeholder='Enter city name..'
                        id='search'
                        autoFocus
                        className='searchTerm'
                        value={searchValue}
                        onChange={setSearchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className='searchButton'
                    onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            < WeatherCard tempInfo={tempInfo} />
         
        </>
    )
}
export default Temp;
