const request = require('request');
const apiKey = '166d00e26d3ff2c6149e89feccc5c59a';

module.exports.getWeather = (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},dk&units=metric&appid=${apiKey}`;
  const weatherResponse = {
    city: city,
    temperature: null,
    humidity: null,
    wind: null,
    error: null
  }
  return new Promise(function(resolve, reject) {
    request(url, function (err, response, body) {
      if (err) {
        reject(err);
      } else {
        const weather = JSON.parse(body);
        if (weather.main === undefined) {
          weatherResponse.error = 'Error, please try again';
        } else {
          const windDirection = getDirection(weather.wind.deg);
          weatherResponse.temp = `${weather.main.temp} ℃`;
          weatherResponse.humidity = weather.main.humidity;
          weatherResponse.wind = `${weather.wind.speed} m/s ${windDirection}`;
        }
        resolve(weatherResponse);
      }
    });
  });
}

getDirection = (angle) => {
  var directions = ['nord', 'nordvest', 'vest', 'sydvest', 'syd', 'sydøst', 'øst', 'nordøst'];
  return directions[Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8];
}
