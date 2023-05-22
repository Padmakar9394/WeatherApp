const inptBox = document.querySelector(".inpt-box");
const searchBtn = document.querySelector('#search-btn');
const imgEle = document.querySelector("#img");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");
const temp = document.querySelector("#temp");
const description = document.querySelector("#description");
const humidity = document.querySelector("#humi");
const windSpeed = document.querySelector("#wind-spd");


async function weatherData(city) {
    const api_key = "8d62fa61ba0a2152b570399d91f75a66";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const info = await fetch(`${url}`).then((response) => {
        const data = response.json();
        return data;
    });

    console.log(info);

    if(info.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temp.innerHTML = `${Math.round(info.main.temp - 273.15)}°C`;
    description.innerHTML = `${info.weather[0].description}`;
    humidity.innerHTML = `${info.main.humidity}%`;
    windSpeed.innerHTML = `${info.wind.speed}Km/H`;

    switch(info.weather[0].main){
        case 'Clouds':
            imgEle.src = "./assets/cloud.png";
            break;
        case 'Clear':
            imgEle.src = "./assets/clear.png";
            break;
        case 'Rain':
            imgEle.src = "./assets/rain.png";
            break;
        case 'Mist':
            imgEle.src = "./assets/mist.png";
            break;
        case 'Snow':
            imgEle.src = "./assets/snow.png";
            break;

    }


}

searchBtn.addEventListener('click',() => {
    weatherData(inptBox.value);
})