var inputCity = document.getElementById("search-input");
var currentWeatherEl = document.getElementById("current-weather");
var forcastWeatherEl = document.getElementById("forcast-weather");
var savedCitiesEl = document.getElementById("past-searches");

var searchedCities = [];

//var sampleAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=Portland&limit=2&appid=9f46b29f8f812614f70bace845940332'
//var weatherAPI = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=9f46b29f8f812614f70bace845940332'

function searchCity() {
  getLatLon();
}

function getLatLon(city) {
  inputCity = inputCity.value.trim();
  console.log(inputCity);

  var geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputCity + '&limit=1&appid=9f46b29f8f812614f70bace845940332'
  console.log(geocodingAPI)

  fetch(geocodingAPI) 
    .then(function(response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      currentWeather(data[0].lat, data[0].lon);
      console.log(data);
    })
    
}


function currentWeather(lat, lon) {
  var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=9f46b29f8f812614f70bace845940332'
  console.log(weatherAPI); 

  fetch(weatherAPI)
    .then(function(response) {
      console.log(response.status);
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      displayWeather(data);
    })

};

function displayWeather(data) {
  console.log(data);
  
  var cityName = document.createElement('h2');
  cityName.textContent = data.city.name;
  console.log(cityName);

  var date = document.createElement('h3');
  date.textContent = data.list.dt;
  console.log(date);

  var weatherIcon = document.createElement('h3');
  weatherIcon.textContent = data.weather.icon;
  console.log(weatherIcon);

  var temp = document.createElement('h1');
  temp.textContent = data.list.main.temp;
  console.log(temp);

  var humidity = document.createElement('h3');
  humidity.textContent = data.list.main.humidity;
  console.log(humidity);

  var windSpeed = document.createElement('h3');
  windSpeed.textContent = data.list.wind.speed;
  console.log(windSpeed);

  
}

document.getElementById('search-button').addEventListener('click', searchCity);