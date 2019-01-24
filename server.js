const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getWeather = require('./getWeather');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  const city = req.query && req.query.city ? req.query.city : 'Copenhagen';
  const fetchWeatherData = getWeather.getWeather(city);
  fetchWeatherData.then(function (result) {
    res.render('index', result);
  });
});

app.get('/city/:city',  function (req, res) {
  const city = req.params.city;
  const fetchWeatherData = getWeather.getWeather(city);
  fetchWeatherData.then(function (result) {
    res.status(result.error !== null ? 400 : 200).json(result);
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!'); // eslint-disable-line no-console
});
