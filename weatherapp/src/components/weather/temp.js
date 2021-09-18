// api.openweathermap.org/data/2.5/weather?q=bangalore&appid=7af8a2df5e0e3e0853ca30fc3a0b05e1
import React , {useState , useEffect} from 'react'
import "./style.css";
import Weathercard from './weathercard';

export const Temp = () => {
     const [searchValue, setSearchValue] = useState("bangalore");
     const [TempInfo , setTempInfo] = useState({});
     const getWeatherInfo = async() => {
         try {
             let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=7af8a2df5e0e3e0853ca30fc3a0b05e1`;

             let res = await fetch(url);
             let data = await res.json();

             const { temp , humidity ,pressure } = data.main;
             const{main :weathermood} = data.weather[0];
             const { name } = data;
             const { speed } = data.wind;
             const { country , sunset } = data.sys;

             const myNewWeatherInfo = {
                 temp,
                 humidity,
                 pressure,
                 weathermood,
                 name,
                 speed,
                 country,
                 sunset,
             };
             setTempInfo(myNewWeatherInfo);
            } catch (error) {
             console.log(error);
         }
     };
     useEffect(() => {
        getWeatherInfo();
     },[]);
             
    return (
       <>
            <div className= "wrap">
                <div className="search">
                    <input type="search"
                    placeholder="search..."
                    autoFocus
                    id="search"
                    className="searchTerm"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="searchButton" 
                    type="button"
                    onClick={getWeatherInfo}>
                    Search</button>
                </div>
                </div>
                <Weathercard TempInfo={TempInfo} />
                
                </> 
    );
};
export default Temp;