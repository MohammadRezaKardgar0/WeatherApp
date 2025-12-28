import getWeatherData from "./utils/httpReq.js";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Thursday",
  "Wednesday",
  "Friday",
  "Saturday",
];

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");

const renderCurrentWeather = (data) => {
  const weatherJsx = `
  <h1>
  ${data.name}, ${data.sys.country}
  </h1>
  <div id="main">
  <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/>
  <span>${data.weather[0].main}</span>
  <p>${Math.round(data.main.temp)}°C</p>
  </div>
  <div id="info">
  <p>Humidity: <span>${data.main.humidity}%</span></p>
  <p>Wind Speed: <span>${data.wind.speed}M/s</span></p>
  </div>`;
  weatherContainer.innerHTML = weatherJsx;
};

const getWeekDay = (data) => {
  return DAYS[new Date(data * 1000).getDay()];
};

const renderForecastWeather = (data) => {
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJsx = `
    <div>
    <img src="https://api.openweathermap.org/img/w/${i.weather[0].icon}.png"/>
    <h3>${getWeekDay(i.dt)}</h3>
    <p>${Math.round(i.main.temp)}°C</p>
    <span>${i.weather[0].main}</span>
    </div>
    `;
    forecastContainer.innerHTML += forecastJsx;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert(`Please Enter City Name`);
  }
  const currentData = await getWeatherData("current", cityName);
  renderCurrentWeather(currentData);
  const foreCastData = await getWeatherData("forecast", cityName);
  renderForecastWeather(foreCastData);
};

const positionCallback = async (position) => {
  const currentData = await getWeatherData("current", position.coords);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(forecastData);
};

const errorCallback = (error) => {
  console.log(error);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("Your Browser Doesn't Support Geolocation");
  }
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
