// Get weather data from the API
const getWeatherData = async (city) => {
  const apiKey = "5a82874c34b6835f9dbf0ce081f3f74c";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error("City not found");
    }
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

// Display weather data on the page
const displayWeatherData = (data) => {
  if (data === null) {
    // Handle error case
    console.log("Failed to fetch weather data.");
    document.querySelector(".city").textContent = "City not found";
    document.querySelector(".temp").textContent = "";
    document.querySelector(".weather-icon").src = "";
    document.querySelector(".description").textContent = "";
    document.querySelector(".humidity").textContent = "";
    document.querySelector(".pressure").textContent = "";
    document.querySelector(".wind").textContent = "";
    document.querySelector(".rainfall-chances").textContent = "";
    return;
  }

  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity, pressure } = data.main;
  const { speed } = data.wind;
  const { rain } = data;
  let rainProbability = 0;

  if (rain) {
    if (rain["1h"]) {
      rainProbability = rain["1h"];
    } else if (rain["3h"]) {
      rainProbability = rain["3h"];
    }
  }

  // Update weather data in the DOM
  document.querySelector(".city").textContent = name.toUpperCase();
  document.querySelector(".temp").textContent = `${temp}°C`;
  document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".description").textContent = description.toUpperCase();
  document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
  document.querySelector(".pressure").textContent = `Pressure: ${pressure} Pa`;
  document.querySelector(".wind").textContent = `Wind Speed: ${speed} km/h`;
  document.querySelector(".rainfall-chances").textContent = `Probability of Rain: ${rainProbability}%`;
};

// Perform a weather search
const searchWeather = async () => {
  const cityInput = document.getElementById("search-input").value.trim();

  if (cityInput === "") {
    console.log("Please enter a city name.");
    return;
  }

  // Fetch weather data and display it
  const weatherData = await getWeatherData(cityInput);
  displayWeatherData(weatherData);
};

// Set default city to Fort Payne
const defaultCity = "Fort Payne";
getWeatherData(defaultCity).then(displayWeatherData);

// Attach event listener to search button
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchWeather);
