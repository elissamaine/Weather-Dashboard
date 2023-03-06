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
  var weatherAPI = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=9f46b29f8f812614f70bace845940332'
  console.log(weatherAPI); 

  fetch(weatherAPI)
    .then(function(response) {
      console.log(response.status);
      return response.json();
    })
    .then(function(data) {
      console.log(data)
    })

}

document.getElementById('search-button').addEventListener('click', searchCity);
