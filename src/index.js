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

//Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = "63°";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperautreElement = document.querySelector("h1");
  temperautreElement.innerHTML = "17°";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

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

let searchForm = document.querySelector("form#location-search");
searchForm.addEventListener("submit", seekCity);

//week 5 - add search engine and current location button
//search engine

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
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

let buttonCurrentLocation = document.querySelector("button#current-location");
buttonCurrentLocation.addEventListener("click", getCurrentPosition);
