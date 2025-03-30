import axios from 'axios'

const Request = () => {
  axios
    .get('http://localhost:3001/fetch-xml')
    .then(response => {
      const weather = {
        temperature: response.data["wfs:FeatureCollection"]["wfs:member"]["0"]["BsWfs:BsWfsElement"]["BsWfs:ParameterValue"],
        windSpeedMS: response.data["wfs:FeatureCollection"]["wfs:member"]["1"]["BsWfs:BsWfsElement"]["BsWfs:ParameterValue"],
        windDirection: response.data["wfs:FeatureCollection"]["wfs:member"]["2"]["BsWfs:BsWfsElement"]["BsWfs:ParameterValue"],
        rain: response.data["wfs:FeatureCollection"]["wfs:member"]["3"]["BsWfs:BsWfsElement"]["BsWfs:ParameterValue"],
        symbol: response.data["wfs:FeatureCollection"]["wfs:member"]["4"]["BsWfs:BsWfsElement"]["BsWfs:ParameterValue"]
      }

      console.log(weather)

    })
    .catch(error => console.error(error))

  return response.data

}

export default Request