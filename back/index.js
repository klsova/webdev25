const express = require('express')
const axios = require('axios')
const xml2js = require('xml2js')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require("dotenv").config()

app.use(cors())
app.use(express.json())

const Commentschema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        comment: { type: String, required: true }

    }
);

const Comment = mongoose.model("Comment", Commentschema)

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))


app.get("/comments/", async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        console.error(error);
    }
});

app.post("/comments/", async (req, res) => {
    try {
        const { ID, name, comment } = req.body;
        const newComment = new Comment({ ID, name, comment});
        res.json(newComment);
    } catch (error) {
        console.error(error);
    }
});

app.delete("/comments/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: "Comment deleted" });
        await comment.remove()
    }
    catch (error) {
        console.error(error);
    }
}
);

app.get('/fetch-xml', async (request, response) => {
  try {
    const jsonData = await fetchXML();
    response.json(jsonData)
  } catch (error) {
    response.status(500).send('Error fetching XML')
  }

})

async function fetchXML() {
  const now = new Date()
  const next = new Date()

  const nowUTC = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  const nextUTC = new Date(next.getTime() + 3 * 60 * 60 * 1000);
  nextUTC.setHours(nextUTC.getHours() + 1,0,0,0)

  const nowISO = nowUTC.toISOString()

  const apiUrl = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::meps::surface::point::simple&place=turku&starttime=${nowISO}&endtime=${nextUTC.toISOString()}&parameters=Temperature,WindspeedMS,WindDirection,PrecipitationAmount,WeatherSymbol3`

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