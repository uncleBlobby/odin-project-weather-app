let cityInput = document.getElementById('cityName');
let metricSelector = document.getElementById('metricSelector');
let imperialSelector = document.getElementById('imperialSelector');
let submitButton = document.getElementById('sendButton');

//get city input on submit click

let cityName = 'Regina';
let units = 'metric';

function getCityInput(){
    cityName = cityInput.value;
    console.log(cityName);
};

function getUnitPreference(){
    if(metricSelector.checked == true){
        units = 'metric';
    };
    if(imperialSelector.checked == true){
        units = 'imperial';
    };
};

submitButton.addEventListener("click", function(){
    getCityInput();
    getUnitPreference();
    getWeather();
});


async function getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiData.key}`, { mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);
    drawWeatherCard(weatherData);
};

//getWeather();

//draw weather card after response

function drawWeatherCard(weatherData){
    let weatherCard = document.getElementById('weatherCard');
    weatherCard.style.visibility = 'visible';
    let cityNameDisplay = document.getElementById('cityNameDisplay');
    let weatherMainDisplay = document.getElementById('weatherMainDisplay');
    let weatherDescriptionDisplay = document.getElementById('weatherDescriptionDisplay');
    let currentTempDisplay = document.getElementById('currentTempDisplay');
    let currentFeelsLikeDisplay = document.getElementById('currentFeelsLikeDisplay');
    let currentWindSpeedDisplay = document.getElementById('currentWindSpeedDisplay');
    let currentWindDirectionDisplay = document.getElementById('currentWindDirectionDisplay');
    let currentWindGustDisplay = document.getElementById('currentWindGustDisplay');


    cityNameDisplay.innerHTML = weatherData.name;
    weatherMainDisplay.innerHTML = weatherData.weather[0].main;
    weatherDescriptionDisplay.innerHTML = weatherData.weather[0].description;
    currentTempDisplay.innerHTML = `Temperature: ${weatherData.main.temp}`;
    currentFeelsLikeDisplay.innerHTML = `Feels like: ${weatherData.main.feels_like}`;
    currentWindSpeedDisplay.innerHTML = `Wind Speed: ${weatherData.wind.speed}`;
    currentWindDirectionDisplay.innerHTML = `Direction: ${convertWindDirection(weatherData.wind.deg)}`;
    currentWindGustDisplay.innerHTML = `Gust: ${weatherData.wind.gust}`;
};

function convertWindDirection(direction){
    if(direction == 270){
        return 'west';
    };
    if(direction >= 23 && direction <= 66){
        return 'north-east';
    };
    if(direction >=67 && direction <= 113){
        return 'east';
    };
    if(direction >= 114 && direction <= 158){
        return 'south-east';
    };
    if(direction >= 159 && direction <= 203){
        return 'south';
    };
    if(direction >= 204 && direction <= 249){
        return 'south-west';
    };
    if(direction >= 250 && direction <= 295){
        return 'west';
    };
    if(direction >= 296 && direction <= 341){
        return 'north-west';
    };
    if(direction >= 342 && direction <= 22){
        return 'north';
    };
};