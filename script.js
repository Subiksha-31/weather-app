const apiKey = "weather_api_here";

async function getWeather() {

  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weather");
  const error = document.getElementById("error");

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Text data
    document.getElementById("city").innerText = data.name;
    document.getElementById("temperature").innerText =
      "Temperature: " + Math.round(data.main.temp) + "°C";
    document.getElementById("humidity").innerText =
      "Humidity: " + data.main.humidity + "%";
    document.getElementById("condition").innerText =
      "Condition: " + data.weather[0].main;

    // Weather icon logic
    const weatherIcon = document.getElementById("weatherIcon");
    const weatherMain = data.weather[0].main;

    if (weatherMain === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (weatherMain === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (weatherMain === "Clouds") {
      weatherIcon.src = "images/cloud.png";
    } else if (weatherMain === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherMain === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (weatherMain === "Snow") {
      weatherIcon.src = "images/snow.png";
    } else {
      weatherIcon.src = "images/clear.png";
    }

    weatherDiv.style.display = "block";
    error.style.display = "none";

  } catch (err) {
    weatherDiv.style.display = "none";
    error.style.display = "block";
  }
}
