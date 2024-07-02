import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({ setquery, setunits }) => {
  const [city, setcity] = useState("");

  const handleSearchClick = () =>{
    if(city !== "") setquery({ q: city });
  };

  const handleLocatioClick =() =>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) =>{
        const {latitude, longitude} = position.coords
        setquery({lat: latitude, lon: longitude})
      })
    }
  }

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text" value={city} onChange={(e) => setcity(e.currentTarget.value)}
          className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
          placeholder="search by city..."
        />
        <BiSearch
          fontSize={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          fontSize={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocatioClick}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-centre"></div>
      <button className="text-2xl font-medium transition ease-out hover:scale-125"
      onClick={() => setunits("metric")}
      >
        °C
      </button>
      <p className="text-2xl font-small mx-2 my-2"> | </p>
      <button className="text-2xl font-medium transition ease-out hover:scale-125"
      onClick={() => setunits("imperial")}
      >
        °F
      </button>
    </div>
  );
};

export default Input;
