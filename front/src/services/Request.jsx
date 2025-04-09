import axios from 'axios'

/*
Returns an object with the following values:
temperature:
windSpeedMS:
windDirection:
rain:
symbol:
*/

const requestWeatherData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/fetch-xml')
    const parts = response.data["wfs:FeatureCollection"]["wfs:member"]

    const weather = {
      temperature: null,
      windSpeedMS: null,
      windDirection: null,
      rain: null,
      symbol: null,
      time: null,
      location: null
    };
  


    parts.forEach(part => {
      const element = part["BsWfs:BsWfsElement"]
      const parameterName = element["BsWfs:ParameterName"]
      const parameterValue = parseFloat(element["BsWfs:ParameterValue"])
      
    if (!weather.time) {
      weather.time = element["BsWfs: Time"]
      const [lat, lon] = element["BsWfs:Location"]["gml:Point"]["gml:pos"].trim().split('')
      weather.location = {
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      };
    }

    switch(parameterName) {
      case 'Temperature':
        weather.temperature = parameterValue;
        break;
      case 'WindspeedMS':
        weather.windSpeedMS = parameterValue;
        break;
      case 'WindDirection':
        weather.windDirection = parameterValue;
        break;
      case 'PrecipitationAmount':
        weather.rain = parameterValue;
        break;
      case 'WeatherSymbol3':
        weather.symbol = parameterValue;
        break;
    }
  });

  return weather;
} catch (error) {
  console.error('Error fetching weather data:', error);
  throw error;
}
};

export default requestWeatherData;
