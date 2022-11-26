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

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row row-cols-5 forecast-five-day">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
   <div class="col forecast">
    <div class="card-body">
    <img
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
     alt=""
      id="forecast-weather-icon"
     class="forecast-weather-icon"
     width="40px" />
    <div class="weather-forecast-date">${day}</div>
      <div class="weather-forecast-range">
       <span class="weather-forecast-high" id="weather-forecast-high" >20°</span >
        <span class="weather-forecast-low" id="weather-forecast-low"></span>/  7°</span>
       </div>
       </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1ff30ddad379948c02a74a24o8b4fb6t";
  let units = "metric";
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units${units}`;
  axios.get(apiUrl).then(displayForecast);
}

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
  celsiusTemperature = response.data.temperature.current;
  let temperature = Math.round(celsiusTemperature);
  let currentTemperature = document.querySelector("h1");
  currentTemperature.innerHTML = `${temperature}°`;

  let city = document.querySelector("#location");
  let country = document.querySelector("#country");
  city.innerHTML = `${response.data.city}, `;
  country.innerHTML = `${response.data.country}`;

  let currentConditions = document.querySelector("h4");
  currentConditions.innerHTML = `${response.data.condition.description}`;

  let feelsLike = Math.round(response.data.temperature.feels_like);
  let currentFeels = document.querySelector("#feels-like");
  currentFeels.innerHTML = `${feelsLike}°`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `${windSpeed} m/s`;

  let weatherImageSource = response.data.condition.icon_url;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", `${weatherImageSource}`);

  getForecast(response.data.coordinates);
}

function findCity(city) {
  let apiWeatherKey = "1ff30ddad379948c02a74a24o8b4fb6t";
  let units = "metric";
  let apiWeatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiWeatherKey}&units=${units}`;
  axios.get(`${apiWeatherUrl}`).then(showWeather);
}

function seekCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("input#search-location");
  findCity(searchCity.value);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiWeatherKey = "1ff30ddad379948c02a74a24o8b4fb6t";
  let units = "metric";
  let apiWeatherUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiWeatherKey}&units=${units}`;
  axios.get(apiWeatherUrl).then(showWeather);
}

//current location button

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Celsius and Fahrenheit conversion

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${fahrenheitTemperature}°`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperautreElement = document.querySelector("h1");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
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
