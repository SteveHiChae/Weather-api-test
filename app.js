const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use( bodyParser.urlencoded( {extended: true} ) )

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
  const cityName = req.body.cityName
  const apiKey = 'fa61c58de40802be703a2d754563a151'
  const unit = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/weather?' +
    'q=' + cityName + '&appid=' + apiKey + '&units=' + unit

  https.get(url, (response) => {

    response.on('data', (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const country = weatherData.sys.country
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'

      res.write('<h1>Weather Forcast</h1>')
      res.write(`<p>The temperature in ${cityName} is ${temp} degrees Celcius. ${country}</p>`)
      res.write(`<p>The weather is currently ${description}</p>`)
      res.write(`<img src=${imgUrl}>`)
      res.send()
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
