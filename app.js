const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const API_KEY = "50f692f0042a1842fcc78e0ae81d1e2c";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert(`Please Enter City Name`);
  }
  const currentData = await getCurrentWeatherByName(cityName);
  console.log(currentData);
};

searchButton.addEventListener("click", searchHandler);
