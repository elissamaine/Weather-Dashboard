var inputCity = document.getElementById("search-input");
var currentWeatherEl = document.getElementById("current-weather");
var forcastWeatherEl = document.getElementById("forcast-weather");
var savedCitiesEl = document.getElementById("past-searches");


var searchedCities = [];

var todaysDate = dayjs().format('MMM D, YYYY')

//var sampleAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=Portland&limit=2&appid=9f46b29f8f812614f70bace845940332'
//var weatherAPI = 'api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=9f46b29f8f812614f70bace845940332'


function searchCity() {

  saveCitySearch(); 
  getLatLon();

}

function saveCitySearch() {
  inputCity = inputCity.value.trim(); 
  console.log(inputCity);
 

  var savedCities = []
  savedCities.push(inputCity);
  localStorage.setItem('savedCities', JSON.stringify(savedCities));

  var storedCities = JSON.parse(localStorage.getItem('savedCities'));

  var pastCityEl = document.createElement('button');
  pastCityEl.textContent = inputCity;
  pastCityEl.setAttribute('value', storedCities);
  pastCityEl.classList.add('btn', 'btn-success');
  savedCitiesEl.append(pastCityEl);
    
}

function getLatLon() {
  var inputCity2 = JSON.parse(localStorage.getItem('savedCities')).slice(-1);
  console.log(inputCity2)


  var geocodingAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputCity2 + '&limit=1&appid=9f46b29f8f812614f70bace845940332'
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

    var forcastTempEl = document.createElement('h4');
    forcastTempEl.textContent = "temp: " + data.list[8*i].main.temp + "°F"
    console.log(forcastTempEl);

    var forcastWindSpeedEl = document.createElement('p');
    forcastWindSpeedEl.textContent = "Wind Speed: " + data.list[8*i].wind.speed + " mph"

    var forcastHumidityEl = document.createElement('p');
    forcastHumidityEl.textContent = "Humidity: " + data.list[8*i].main.humidity + "%"

   forcastWeatherEl.append(forcastDaysEl);
  
    forcastDaysEl.append(forcastDateEl);
    //forcastDaysEl.append(forcastIconEl);
    forcastDaysEl.append(forcastTempEl);
    forcastDaysEl.append(forcastWindSpeedEl);
    forcastDaysEl.append(forcastHumidityEl);
    
    
  }
   
    

}


document.getElementById('search-button').addEventListener('click', searchCity);