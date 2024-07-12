document.getElementById('searchButton').addEventListener('click', function() {
    const apiCity = document.getElementById('city').value;
    const apiKey = "5c724fac2eecf2dbb2164ec73b38e56d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&units=metric&appid=${apiKey}`;

    // Show loader
    function showLoader() {
        document.getElementById('loader').style.display = 'block';
    }

    // Hide loader
    function hideLoader() {
        document.getElementById('loader').style.display = 'none';
    }

    // Fetch weather data
    showLoader();
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
            document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
            document.querySelector('.weather-info').style.display = 'block';
        })
        .catch(error => {
            alert('Something went wrong. Please try again.');
            console.error('Error fetching the weather data:', error);
        })
        .finally(() => {
            hideLoader();
        });
});
