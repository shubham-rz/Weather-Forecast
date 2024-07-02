import React, { useEffect, useState } from 'react'
import TopButton from './components/TopButton';
import Input from './components/Input';
import TimeLocation from './components/TimeLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';
import getFormatedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {

  const [query, setquery] = useState({q: 'goa'})
  const [units, setunits] = useState("metric")
  const [weather, setweather] = useState(null)

  const getWeather = async () =>{
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);


    await getFormatedWeatherData({ ...query, units }).then((data) => {
      toast.success(`Fetching weather data for ${data.name}, ${data.country} `);
      setweather(data);
    });

  };

  useEffect(() =>{
    getWeather();
  }, [query, units]);

  const formatBackground =() =>{
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold =units === "metric" ? 20:60 ;
    if (weather.temp <= threshold) return "from-cyan-600 to-lue-700";
    return "from-yellow-600 to-orange-700"

  }

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButton setquery={setquery}/>
      <Input setquery={setquery} setunits={setunits}/>

      {weather && (
        <>
        <TimeLocation weather={weather}/>
        <TempDetails weather={weather} units ={units}/>
        <Forecast title = "3 hour step forecast" data={weather.hourly}/>
        <Forecast title = "Daily forecast" data={weather.daily}/>
        </>
      )}
        <ToastContainer  autoClose= {2500} hideProgressBar={true} theme='colored'  />
      </div>
  );
};

export default App
