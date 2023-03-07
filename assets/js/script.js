var inputCity = document.getElementById("search-input");
var currentWeatherEl = document.getElementById("current-weather");
var forcastWeatherEl = document.getElementById("forcast-weather");
var savedCitiesEl = document.getElementById("past-searches");

//var savedCities = JSON.parse(localStorage.getItem("savedCities"))
//if (savedCities == undefined) {
//   localStorage.setItem("savedCities", JSON.stringify([]))
//}

var searchedCities = [];

var todaysDate = dayjs().format('MMM D, YYYY')

//var sampleAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=Portland&limit=2&appid=9f46b29f8f812614f70bace845940332'
//var weatherAPI = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=9f46b29f8f812614f70bace845940332'


function searchCity() {
  getLatLon();
  saveCitySearch();
}

function saveCitySearch() {
  inputCity = inputCity.value.trim();
  console.log(inputCity);
 

  var savedCities = []
  savedCities.push(inputCity);
  localStorage.setItem('savedCities', JSON.stringify(savedCities));

  var storedCities = JSON.parse(localStorage.getItem('savedCities'));

  var pastCityEl = createElement('button');
  pastCityEl.setAttribute('value', storedCities)


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
  currentWeatherEl.setAttribute('class', 'show');
  
  // these will display
  var cityName = document.getElementById('city-name');
  cityName.innerHTML = data.city.name;
  console.log(cityName);

  var date = document.getElementById('date');
  date.innerHTML = todaysDate;
  console.log(date);

 // var weatherIcon = document.getElementById('weather-icon');
 // weatherIcon.setAttribute();
  //console.log(weatherIcon);

  var temp = document.getElementById('temp');
  temp.innerHTML = data.list[0].main.temp;
  console.log(temp);

  var humidity = document.getElementById('humidity');
  humidity.innerHTML = data.list[0].main.humidity;
  console.log(humidity);

  var windSpeed = document.getElementById('wind-speed');
  windSpeed.innerHTML = data.list[0].wind.speed;
  console.log(windSpeed);
 
  
  for (i=0; i<5; i++) {
    var forcastDaysEl = document.createElement('div')
    forcastDaysEl.classList.add('col', 'bg-success', 'rounded', 'p-1', 'm-1');
    
    var forcastDateEl = document.createElement('h3');
    var forcastDate = dayjs().add(i, 'day').format('MMM D, YYYY');
    forcastDateEl.textContent = forcastDate
    
    //var forcastIconEl = document.createElement('img')
    //forcastIconEl.setAttribute('src', )

    var forcastTempEl = document.createElement('h3');
    forcastTempEl.textContent = "temp: " + + "°F"
    console.log(forcastTempEl);

    var forcastWindSpeedEl = document.createElement('p');
    forcastWindSpeedEl.textContent = "Wind Speed: " + data + " mph"

    var forcastHumidityEl = document.createElement('p');
    forcastHumidityEl.textContent = "Humidity: " + data + "%"

    forcastDaysEl.append(forcastDateEl);

    forcastWeatherEl.append(forcastDaysEl);

  }

}


document.getElementById('search-button').addEventListener('click', searchCity);