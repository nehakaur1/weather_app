document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "646f1f6c4fce476fbed174050250702"; // Your API key
  
    // Function to fetch weather data for a given location
    function fetchWeather(location) {
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const weatherInfoDiv = document.getElementById("weather-info");
          
          // Check if there's an error in the API response
          if (data.error) {
            weatherInfoDiv.innerHTML = `<p>Error: ${data.error.message}</p>`;
            return;
          }
  
          const locationName = data.location.name;
          const tempC = data.current.temp_c;
          const condition = data.current.condition.text;
          const icon = data.current.condition.icon;
  
          weatherInfoDiv.innerHTML = `
            <h2>${locationName}</h2>
            <img src="${icon}" alt="${condition}">
            <p>${tempC}°C</p>
            <p>${condition}</p>
          `;
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
          document.getElementById("weather-info").innerHTML = "<p>Failed to load weather data.</p>";
        });
    }
  
    // Initially, load weather for a default location (e.g., London)
    fetchWeather("London");
  
    // Add event listener to the search button
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", function() {
      const locationInput = document.getElementById("location").value;
      if (locationInput.trim() !== "") {
        fetchWeather(locationInput.trim());
      }
    });
  });
  