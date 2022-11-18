function formatCurrentDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let dayOfMonth = now.getDate();
  let year = now.getFullYear();
  let currentDay = `${day} ${dayOfMonth} ${month} ${year}`;
  return currentDay;
}

function formatCurrentTime(today) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let updateTime = `${hours}:${minutes}`;
  return updateTime;
}

let now = new Date();

let currentDate = document.querySelector("h3");
currentDate.innerHTML = formatCurrentDate(now);

let currentTime = document.querySelector("span#last-update");
currentTime.innerHTML = formatCurrentTime(now);

function searchCity(event) {
  event.preventDefault();
  let locationInput = document.querySelector("input#search-location");
  let h2 = document.querySelector("h2#location");
  if (locationInput.value) {
    h2.innerHTML = `${locationInput.value}`;
  } else {
    h2.innerHTML = null;
    alert("Please enter a city");
  }
}

function showWeather(response) {
  console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  let currentTemperature = document.querySelector("h1");
  currentTemperature.innerHTML = `${temperature}°`;

  let city = document.querySelector("h2#location");
  city.innerHTML = response.data.name;

  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempToday = document.querySelector("#temperature-high");
  maxTempToday.innerHTML = `high ${maxTemp}° | `;

  let minTemp = Math.round(response.data.main.temp_min);
  let minTempToday = document.querySelector("#temperature-low");
  minTempToday.innerHTML = `low ${minTemp}°`;

  let currentConditions = document.querySelector("h4");
  currentConditions.innerHTML = `${response.data.weather[0].description}`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${response.data.main.humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed} m/s`;

  let weatherImage = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherImage}@2x.png`
  );
}

function findCity(city) {
  let apiWeatherKey = "1537f4912e0d82594421bd7853bee396";
  let units = "metric";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=${units}`;
  axios.get(`${apiWeatherUrl}`).then(showWeather);
}

function seekCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("input#search-location");
  findCity(searchCity.value);
}

//current location button

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiWeatherKey = "1537f4912e0d82594421bd7853bee396";
  let units = "metric";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiWeatherKey}&units=${units}`;
  axios.get(apiWeatherUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Celsius and Fahrenheit conversion

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active-link");
  fahrenheitLink.classList.add("active-link");
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${fahrenheitTemperature}°`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperautreElement = document.querySelector("h1");
  fahrenheitLink.classList.remove("active-link");
  celsiusLink.classList.add("active-link");
  let celsiusTemperatureDisplay = Math.round(celsiusTemperature);
  temperautreElement.innerHTML = `${celsiusTemperatureDisplay}°`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("form#location-search");
searchForm.addEventListener("submit", seekCity);

let buttonCurrentLocation = document.querySelector("button#current-location");
buttonCurrentLocation.addEventListener("click", getCurrentPosition);

findCity("Sydney");
