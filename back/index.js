const express = require('express')
const axios = require('axios')
const xml2js = require('xml2js')
const app = express()
const cors = require('cors')

app.use(cors())


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/fetch-xml', async (request, response) => {
  try {
    const jsonData = await fetchXML();
    response.json(jsonData)
  } catch (error) {
    response.status(500).send('Error fetching XML')
  }

})

async function fetchXML() {
  const now = new Date().toISOString()
  const next = new Date()
  next.setHours(next.getHours() + 1,0,0,0)

  const apiUrl = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::meps::surface::point::simple&place=turku&starttime=${now}&endtime=${next.toISOString()}&parameters=Temperature,WindspeedMS,WindDirection,PrecipitationAmount,WeatherSymbol3`

  try {
    const response = await axios.get(apiUrl, {
      responseType: 'text'
    })

    const xmlData = response.data

    const jsonData = xmlToJson(xmlData)

    return jsonData

  } catch (error) {
    throw error
  }

}

async function xmlToJson(xmlString) {
  const parser = new xml2js.Parser({ explicitArray: false });
  try {
      const result = await parser.parseStringPromise(xmlString);

      return result;
  } catch (error) {
      console.error('Error parsing XML:', error);
      throw error;
  }
}



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})