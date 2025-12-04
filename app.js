const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const API_KEY = "50f692f0042a1842fcc78e0ae81d1e2c";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const locationIcon = document.getElementById("location");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getCurrentWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const renderCurrentWeather = (data) => {
  console.log(data);
  const weatherJsx = `
  <h1>
  ${data.name},${data.sys.country}
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

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert(`Please Enter City Name`);
  }
  const currentData = await getCurrentWeatherByName(cityName);
  renderCurrentWeather(currentData);
};

const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
  renderCurrentWeather(currentData);
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
