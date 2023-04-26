let weather = {
  apiKey: "faa9c8b13594e252ea1c8991a8c332f7",
}

let storedData = {
  forecastData: "",
  latitude: 0,
  longitude: 0,
  hrly: true
};

function fetchCurrentWeather(city) {
  var weatherData = {
    latitude: "",
    longitude: "",
    hrly: true
  };
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+weather.apiKey
  )
  .then(function (response){
    return response.json();
  })
  .then(function (data) {
    weatherData.latitude = data.coord.lat;
    weatherData.longitude = data.coord.lon;
    console.log(weatherData.latitude);
    console.log(weatherData.longitude);
    fetchWeatherForecast(weatherData.latitude, weatherData.longitude, true);
    return displayCurrentWeather(data);
  })
}

function fetchWeatherForecast(latitude, longitude, displayHrly) {
  fetch(
  "https://api.openweathermap.org/data/3.0/onecall?lat="+latitude+"&lon="+longitude+"&units=imperial&appid="+weather.apiKey //link
  )
  .then((response) => response.json())
  .then(function (data) {
    storedData.forecastData = data;
    storedData.latitude = latitude;
    storedData.longitude = longitude;
    if (displayHrly) {
      return displayHourlyForecast(data);
    }
    return displayDailyForecast;
  })
  return storedData;
}

function displayCurrentWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, temp_min, temp_max} = data.main;
  document.querySelector(".city").innerText = name;
  document.querySelector(".sec2-icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temp").innerText = Math.round(temp) + " °F";
  document.querySelector(".high-temp").innerText = "High: " + Math.round(temp_max) + " °F";
  document.querySelector(".low-temp").innerText = "Low: " + Math.round(temp_min) + " °F";
  document.querySelector(".weather").classList.remove("loading");
  getWeatherBackground(data);
}

function displayHourlyForecast(data) {
  const icon1 = data.hourly[0].weather[0].icon;
  const icon2 = data.hourly[1].weather[0].icon;
  const icon3 = data.hourly[2].weather[0].icon;
  const icon4 = data.hourly[3].weather[0].icon;
  const icon5 = data.hourly[4].weather[0].icon;

  document.getElementById("container1-icon").src = "https://openweathermap.org/img/wn/"+icon1+"@2x.png";
  document.getElementById("container2-icon").src = "https://openweathermap.org/img/wn/"+icon2+"@2x.png";
  document.getElementById("container3-icon").src = "https://openweathermap.org/img/wn/"+icon3+"@2x.png";
  document.getElementById("container4-icon").src = "https://openweathermap.org/img/wn/"+icon4+"@2x.png";
  document.getElementById("container5-icon").src = "https://openweathermap.org/img/wn/"+icon5+"@2x.png";

  const temp1 = data.hourly[0].temp;
  const temp2 = data.hourly[1].temp;
  const temp3 = data.hourly[2].temp;
  const temp4 = data.hourly[3].temp;
  const temp5 = data.hourly[4].temp;

  const hr1 = convertToHr(data, data.hourly[0].dt);
  const hr2 = convertToHr(data, data.hourly[1].dt);
  const hr3 = convertToHr(data, data.hourly[2].dt);
  const hr4 = convertToHr(data, data.hourly[3].dt);
  const hr5 = convertToHr(data, data.hourly[4].dt);

  document.getElementById("container1-temp").innerText = Math.round(temp1) + " °F";
  document.getElementById("container2-temp").innerText = Math.round(temp2) + " °F";
  document.getElementById("container3-temp").innerText = Math.round(temp3) + " °F";
  document.getElementById("container4-temp").innerText = Math.round(temp4) + " °F";
  document.getElementById("container5-temp").innerText = Math.round(temp5) + " °F";

  document.getElementById("container1-time").innerText = hr1;
  document.getElementById("container2-time").innerText = hr2;
  document.getElementById("container3-time").innerText = hr3;
  document.getElementById("container4-time").innerText = hr4;
  document.getElementById("container5-time").innerText = hr5; 
}

function displayDailyForecast(data) {
  const icon1 = data.daily[1].weather[0].icon;
  const icon2 = data.daily[2].weather[0].icon;
  const icon3 = data.daily[3].weather[0].icon;
  const icon4 = data.daily[4].weather[0].icon;
  const icon5 = data.daily[5].weather[0].icon;

  document.getElementById("container1-icon").src = "https://openweathermap.org/img/wn/"+icon1+"@2x.png";
  document.getElementById("container2-icon").src = "https://openweathermap.org/img/wn/"+icon2+"@2x.png";
  document.getElementById("container3-icon").src = "https://openweathermap.org/img/wn/"+icon3+"@2x.png";
  document.getElementById("container4-icon").src = "https://openweathermap.org/img/wn/"+icon4+"@2x.png";
  document.getElementById("container5-icon").src = "https://openweathermap.org/img/wn/"+icon5+"@2x.png";

  let {min, max} = data.daily[1].temp;
  document.getElementById("container1-temp").innerText = "H: " + Math.round(max) + "°" + " L: " + Math.round(min)+ "° ";
  ({min, max} = data.daily[2].temp);
  document.getElementById("container2-temp").innerText = "H: " + Math.round(max) + "°" + " L: " + Math.round(min)+ "° ";
  ({min, max} = data.daily[3].temp);
  document.getElementById("container3-temp").innerText = "H: " + Math.round(max) + "°" + " L: " + Math.round(min)+ "° ";
  ({min, max} = data.daily[4].temp);
  document.getElementById("container4-temp").innerText = "H: " + Math.round(max) + "°" + " L: " + Math.round(min)+ "° ";
  ({min, max} = data.daily[5].temp);
  document.getElementById("container5-temp").innerText = "H: " + Math.round(max) + "°" + " L: " + Math.round(min)+ "° ";

  const hr1 = convertToDay( data.daily[1].dt);
  const hr2 = convertToDay( data.daily[2].dt);
  const hr3 = convertToDay( data.daily[3].dt);
  const hr4 = convertToDay( data.daily[4].dt);
  const hr5 = convertToDay( data.daily[5].dt);

  document.getElementById("container1-time").innerText = hr1;
  document.getElementById("container2-time").innerText = hr2;
  document.getElementById("container3-time").innerText = hr3;
  document.getElementById("container4-time").innerText = hr4;
  document.getElementById("container5-time").innerText = hr5;
}

function convertToHr(data, unixTime) {
  const adjustedUnixTime = unixTime + data.timezone_offset;
  console.log(adjustedUnixTime);
  const date = new Date(adjustedUnixTime *1000);
  hours = date.getUTCHours();
  console.log(hours);
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  var strTime = hours + ':00' + ' ' + ampm;
  return strTime;
}

function convertToDay(unixTime) {
  const dayNum = (Math.floor((unixTime / 86400) + 4)) % 7;
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return weekday[dayNum];
}

function search() {
  fetchCurrentWeather(document.querySelector(".search-bar").value);
  document.querySelector(".hr-button").style.backgroundColor = 'white';
  document.querySelector(".day-button").style.backgroundColor = 'rgb(72, 72, 72)';
  document.querySelector(".day-button").style.color = 'white';
  document.querySelector(".card").style.borderColor = 'rgba(60, 60, 60, 0.386)';
}

function getHourlyForecast() {
  let weatherData = fetchWeatherForecast(storedData.latitude, storedData.longitude, true);
  displayHourlyForecast(weatherData.forecastData);
  document.querySelector(".hr-button").style.backgroundColor = 'white';
  document.querySelector(".day-button").style.backgroundColor = 'rgb(72, 72, 72)';
  document.querySelector(".day-button").style.color = 'white';
}

function getDailyForecast() {
  let weatherData = fetchWeatherForecast(storedData.latitude, storedData.longitude, false);
  displayDailyForecast(weatherData.forecastData);
  document.querySelector(".day-button").style.backgroundColor = 'white';
  document.querySelector(".day-button").style.color = 'black';
  document.querySelector(".hr-button").style.backgroundColor = 'rgb(72, 72, 72)';
}

function getWeatherBackground(data) {
  const id = data.weather[0].id;
  const time = data.dt;
  if (id < 300) {
    document.body.style.backgroundImage = "url('weather-backgrounds/thunderstorm.jpg')";
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
  }
  else if (id >= 300 && id < 500) {
    document.body.style.backgroundImage = "url('weather-backgrounds/drizzle.jpg')";
  }
  else if (id >= 500 && id < 600) {
    document.body.style.backgroundImage = "url('weather-backgrounds/rain.jpg')";
  }
  else if (id >= 600 && id < 700) {
    if (time > data.sys.sunset || time < data.sys.sunrise) {
      document.body.style.backgroundImage = "url('weather-backgrounds/snow-night.jpg')";
    }
    else {
      document.body.style.backgroundImage = "url('weather-backgrounds/snow-day.jpg')";
    }
  }
  else if (id == 701 || id == 741) {
    document.body.style.backgroundImage = "url('weather-backgrounds/fog.jpg')";
  }
  else if (id == 721) {
    document.body.style.backgroundImage = "url('weather-backgrounds/haze.jpg')";
  }
  else if (id == 781) {
    document.body.style.backgroundImage = "url('weather-backgrounds/tornado.jpg')";
  }
  else if (id == 800) {
    if(time > data.sys.sunset || time < data.sys.sunrise) {
      document.body.style.backgroundImage = "url('weather-backgrounds/clear-night.jpg')";
      document.querySelector(".card").style.borderColor = 'rgba(255, 255, 255, 0.386)';
    }
    else {
      document.body.style.backgroundImage = "url('weather-backgrounds/clear-day-sky.jpg')";
    }
  }
  else if (id == 801) {
    if(time > data.sys.sunset || time < data.sys.sunrise) {
      document.body.style.backgroundImage = "url('weather-backgrounds/cloudy-night-sky.jpg')";
      document.querySelector(".card").style.borderColor = 'rgba(255, 255, 255, 0.386)';
    }
    else {
      document.body.style.backgroundImage = "url('weather-backgrounds/few-clouds.jpg')";
    }
  }
  else if (id == 802) {
    if(time > data.sys.sunset || time < data.sys.sunrise) {
      document.body.style.backgroundImage = "url('weather-backgrounds/cloudy-night-sky.jpg')";
      document.querySelector(".card").style.borderColor = 'rgba(255, 255, 255, 0.386)';
    }
    else {
      document.body.style.backgroundImage = "url('weather-backgrounds/scattered-clouds.jpg')";
    } 
  }
  else if (id == 803) {
    if(time > data.sys.sunset || time < data.sys.sunrise) {
      document.body.style.backgroundImage = "url('weather-backgrounds/cloudy-night-sky.jpg')";
      document.querySelector(".card").style.borderColor = 'rgba(255, 255, 255, 0.386)';
    }
    else {
      document.body.style.backgroundImage = "url('weather-backgrounds/broken-clouds.jpg')";
    }
  }
  else if (id == 804) {
    if(time > data.sys.sunset || time < data.sys.sunrise) {
      document.body.style.backgroundImage = "url('weather-backgrounds/cloudy-night-sky.jpg')";
      document.querySelector(".card").style.borderColor = 'rgba(255, 255, 255, 0.386)';
    }
    else{
      document.body.style.backgroundImage = "url('weather-backgrounds/overcast.jpg')";
    }
  }
}

function reverseGeocode(latitude, longitude) {
  var api_key = '43aca03bc26f4062923bbfd1135b82ad';
  var query = latitude + ',' + longitude;
  var api_url = 'https://api.opencagedata.com/geocode/v1/json'
  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';
  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);
  request.onload = function() {
    if (request.status === 200){
      var data = JSON.parse(request.responseText);
      fetchCurrentWeather(data.results[0].components.town); // city name
    } else if (request.status <= 500){
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };
  request.onerror = function() {
    console.log("unable to connect to server");
  };
  request.send(); 
}

function getLocation() {
  function success(data) {
    reverseGeocode(data.coords.latitude, data.coords.longitude); // gets current weather
    fetchWeatherForecast(data.coords.latitude, data.coords.longitude, true); // gets forecast
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, console.error);
  }
}

document.querySelector(".search-button").addEventListener("click", function() {
  search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
  if (event.key == "Enter") {
    search();
  }
});

getLocation();
