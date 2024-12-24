const API_KEY = /*8'4328a4a80380bb500e79fc3aacd6178'; */
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');

document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
                changeBackground(data.weather[0].main);
            } else {
                alert('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });
}

function displayWeather(data) {
    cityName.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = data.main.temp.toFixed(1);
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherResult.classList.remove('hidden');
}

function changeBackground(condition) {
    let backgroundUrl;
    switch (condition.toLowerCase()) {
        case 'clear':
            backgroundUrl = 'clear.jpg';
            break;
        case 'clouds':
            backgroundUrl = 'cloud.jpg';
            break;
        case 'rain':
            backgroundUrl = 'rain.jpg';
            break;
        case 'snow':
            backgroundUrl = 'snow.jpg';
            break;
        default:
            backgroundUrl = 'weather.jpg';
            break;
    }
    document.body.style.backgroundImage = `url(${backgroundUrl})`;
}