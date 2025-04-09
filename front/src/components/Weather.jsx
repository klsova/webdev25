import './Weather.css';
import { useState, useEffect } from 'react';
import requestWeatherData from '../services/Request';


import symbol1 from '../assets/1.svg';
import symbol2 from '../assets/2.svg';
import symbol3 from '../assets/3.svg';
import symbol21 from '../assets/21.svg';
import symbol22 from '../assets/22.svg';
import symbol23 from'../assets/23.svg';
import symbol31 from'../assets/31.svg';
import symbol32 from'../assets/32.svg';
import symbol33 from'../assets/33.svg';
import symbol41 from'../assets/41.svg';
import symbol42 from'../assets/42.svg';
import symbol43 from'../assets/43.svg';
import symbol51 from'../assets/51.svg';
import symbol52 from'../assets/52.svg';
import symbol53 from'../assets/53.svg';
import symbol61 from'../assets/61.svg';
import symbol62 from'../assets/62.svg';
import symbol63 from'../assets/63.svg';
import symbol64 from'../assets/64.svg';
import symbol71 from'../assets/71.svg';
import symbol72 from'../assets/72.svg';
import symbol73 from'../assets/73.svg';
import symbol81 from'../assets/81.svg';
import symbol82 from'../assets/82.svg';
import symbol83 from'../assets/83.svg';
import symbol91 from'../assets/91.svg';
import symbol92 from'../assets/92.svg'



/*/function setBackground(weather) {
      if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/rain.jpg'
    } else if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/snow.jpg'
    } else if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/sunny.jpg'
    } else if (weather === "insert weather type") {
        document.body.style.backgroundImage = './assets/cloudy.jpg'
    }
}
/*/

/*/
1 selkeää
2 puolipilvistä
21 heikkoja sadekuuroja
22 sadekuuroja
23 voimakkaita sadekuuroja
3 pilvistä
31 heikkoa vesisadetta
32 vesisadetta
33 voimakasta vesisadetta
41 heikkoja lumikuuroja
42 lumikuuroja
43 voimakkaita lumikuuroja
51 heikkoa lumisadetta
52 lumisadetta
53 voimakasta lumisadetta
61 ukkoskuuroja
62 voimakkaita ukkoskuuroja
63 ukkosta
64 voimakasta ukkosta
71 heikkoja räntäkuuroja
72 räntäkuuroja
73 voimakkaita räntäkuuroja
81 heikkoa räntäsadetta
82 räntäsadetta
83 voimakasta räntäsadetta
91 utua
92 sumua
/*/



const Weather = () => {

    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const weatherSymbols = {
        1: symbol1,
        2: symbol2,
        3: symbol3,
        21: symbol21,
        22: symbol22,
        23: symbol23,
        31: symbol31,
        32: symbol32,
        33: symbol33,
        41: symbol41,
        42: symbol42,
        43: symbol43,
        51: symbol51,
        52: symbol52,
        53: symbol53,
        61: symbol61,
        62: symbol62,
        63: symbol63,
        64: symbol64,
        71: symbol71,
        72: symbol72,
        73: symbol73,
        91: symbol81,
        82: symbol82,
        83: symbol83,
        91: symbol91,
        92: symbol92
    }

    useEffect(() => {
        const loadWeatherData = async () => {
            try {
                const data = await requestWeatherData()
                setWeather(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        loadWeatherData();
}, []);

    if (loading) return <div>Loading weather data...</div>
    if (error) return <div>Error: {error}</div>
    if (!weather) return <div>No weather data available</div>

    const weatherImage = weatherSymbols[weather.symbol]
    
    return (
        <div className="weather-container">
            <h1>
                Turku
            </h1>
            <div>
                <strong>Temperature:</strong> {weather.temperature} °C
            </div>
            <div>
                <strong>Wind Speed:</strong> {weather.windSpeedMS} m/s
            </div>
            <div>
                <strong>Wind Direction:</strong>
            </div>
            <div>
                <strong>Precipitation:</strong> {weather.rain} mm
            </div>
            <div>
                <img src={weatherImage} className='WeatherIcon'/>
            </div>
        </div>
    )
}

export default Weather;