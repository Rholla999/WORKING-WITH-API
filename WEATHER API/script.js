const userCityInput = document.getElementById("cityInput");
const formEl = document.getElementById("formContainer");
const submitBtn = document.getElementById("getWeatherBtn");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const cityNameEl = document.getElementById("cityName");
const weatherIconEl = document.getElementById("weatherIcon");
const timeEl = document.getElementById('timeDisplay');
const dayEl = document.getElementById('dayEl');


let apiKey = '9505fd1df737e20152fbd78cdb289b6a'; 
let url = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey;


let now = new Date();

timeEl.innerHTML = now.toLocaleDateString();
dayEl.innerHTML = now.toLocaleDateString('en-us', {weekday: 'long'});
 
formEl.addEventListener("submit", (e) => { 
    e.preventDefault();
    if (userCityInput.value != "") {
        getWeather();
    } 
})


async function getWeather() { 
    try {
        const weatherApi = await fetch(url + "&q=" + userCityInput.value);
        const weatherDataRes = await weatherApi.json();
        console.log(weatherDataRes);
        if (weatherDataRes.cod === 200) {
            cityNameEl.textContent = weatherDataRes.name;
            temperatureEl.textContent = Math.round(weatherDataRes.main.temp) + "°C";
            descriptionEl.textContent = weatherDataRes.weather[0].description;
            humidityEl.textContent =  weatherDataRes.main.humidity + "%";
            windSpeedEl.textContent = weatherDataRes.wind.speed + " m/s";
            weatherIconEl.src = "http://openweathermap.org/img/wn/" + weatherDataRes.weather[0].icon + ".png";
        } else {
            cityNameEl.textContent = "City Not Found";
            temperatureEl.textContent = "-";
            descriptionEl.textContent = "-";
            humidityEl.textContent = "-";
            windSpeedEl.textContent = "-";
            weatherIconEl.src = "";
        }


    } catch (error) {
        console.log('Error fetching weather data:', error);
        cityNameEl.textContent = "Error Fetching Data";
        temperatureEl.textContent = "-";
        descriptionEl.textContent = "-";
        humidityEl.textContent = "-";
        windSpeedEl.textContent = "-";
        weatherIconEl.src = "";
    }
}

submitBtn.addEventListener("click", getWeather);