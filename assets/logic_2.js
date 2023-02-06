const apiKey = "486a30fe2a4040f404391459060015ad";
var displayArr = [];
var geoArr = [];
var oneCallDataArr = [];
var lat = "";
var lon = "";
var forecastContainer = document.getElementById("5-day-container");
var currentDay = document.getElementById("today");
const history = document.getElementById("history-container");
let historyButton = document.getElementsByClassName("list-button");

function geoLocate(searchInput) {
  var requestLocationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`;
  fetch(requestLocationUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (currentLocation) {
      let tempArr = [];
      tempArr.push(currentLocation);
      geoArr = tempArr;
      let lat2 = geoArr[0][0].lat;
      lat = lat2;
      let lon2 = geoArr[0][0].lon;
      lon = lon2;
    })
    .then(function () {
      oneCall();
    });
}

function oneCall() {
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`;
  fetch(oneCallApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (allData) {
      let tempArr = [];
      tempArr.push(allData);
      oneCallDataArr = tempArr;
      forecastDisplayHandler();
    });
}

function kelvinToImperial(x) {
  Math.round((x - 273.15) * 1.8 + 32);
}

const forecastDisplayHandler = async () => {
  console.log(oneCallDataArr);
  forecastContainer.innerHTML = "";
  var now = new Date().toDateString();
  var currentCity = geoArr[0][0].name;
  let tempKd = oneCallDataArr[0].daily[0].temp.day;
  let tempKmax = oneCallDataArr[0].daily[0].temp.max;
  let tempKmin = oneCallDataArr[0].daily[0].temp.min;
  let tempKe = oneCallDataArr[0].daily[0].temp.eve;
  let tempKc = oneCallDataArr[0].current.temp;

  let tempFd = Math.round((tempKd - 273.15) * 1.8 + 32);
  let tempFmin = Math.round((tempKmin - 273.15) * 1.8 + 32);
  let tempFmax = Math.round((tempKmax - 273.15) * 1.8 + 32);
  let tempFe = Math.round((tempKe - 273.15) * 1.8 + 32);
  let tmepFc = Math.round((tempKc - 273.15) * 1.8 + 32);

  let windSpeed = oneCallDataArr[0].daily[0].wind_speed;
  let windGust = oneCallDataArr[0].daily[0].wind_gust;
  let humidity = oneCallDataArr[0].daily[0].humidity;
  let uvIndex = oneCallDataArr[0].daily[0].uvi;
  let icon = oneCallDataArr[0].daily[0].weather[0].icon;
  let uvStyle =
    uvIndex < 2
      ? "uvMin"
      : uvIndex < 5
      ? "uvModerate"
      : uvIndex < 7
      ? "uvHigh"
      : uvIndex < 10
      ? "uvSevere"
      : "uvExtreme";

  let iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  currentDay.innerHTML = ` 

  <div class="card-header"> 
    <div class="card-title">
        <h2 id="city">${currentCity}</h2>
      <h4 id="date">${now}</h4> 
    </div> 
    <div id="icon">
      <img src="${iconSrc}" alt="Weather Icon">
      <p id="temp">${tmepFc}°F</p>
    </div> 
    
  </div>
  <div class="card-body">
    <div class="tempInfo">
      <p id="weather-${i}"></p>
      <p id="temp-${i}">Day Temp: ${tempFd}</p>
      <p id="temp-${i}">Evening Temp: ${tempFe}</p>
      <p id="temp-${i}">Max Temp: ${tempFmax}</p>
      <p id="temp-${i}">Min Temp: ${tempFmin}</p>
    </div>
    <div class="otherInfo">
      <p id="wind-${i}">Average Wind Speed: ${windSpeed}</p>
      <p id="wind-${i}">Wind Gust: ${windGust}</p>
      <p id="humidity-${i}">Relative Humidity: ${humidity}%</p>
      <p id="uv-index${i}" class="${uvStyle}">UV Index: ${uvIndex}</p>
    </div>
  </div>
    `;

  for (var i = 1; i < 6; i++) {
    let unixTime = oneCallDataArr[0].daily[i].dt;
    let dateString = new Date(unixTime * 1000).toDateString();

    let tempKmax = oneCallDataArr[0].daily[i].temp.max;
    let tempKmin = oneCallDataArr[0].daily[i].temp.min;

    let tempFmin = Math.round((tempKmin - 273.15) * 1.8 + 32);
    let tempFmax = Math.round((tempKmax - 273.15) * 1.8 + 32);

    let humidity = oneCallDataArr[0].daily[i].humidity;
    let uvIndex = oneCallDataArr[0].daily[i].uvi;
    let icon = oneCallDataArr[0].daily[i].weather[0].icon;
    let uvStyle =
      uvIndex < 2
        ? "uvMin"
        : uvIndex < 5
        ? "uvModerate"
        : uvIndex < 7
        ? "uvHigh"
        : uvIndex < 10
        ? "uvSevere"
        : "uvExtreme";

    let iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    forecastContainer.innerHTML += `
      <div id="day ${i}" class="card col-10 col-sm-5 col-lg-3 col-xl-2">
        <h2 id="date" class="card-title">${dateString}</h2>
          <img src="${iconSrc}" class="card-img-top" alt="Weather Icon"/>
          <div class="card-body">
            <p id="weather-${i}></p>
            <p id="temp-${i}">Max Temp: ${tempFmin}</p>
            <p id="temp-${i}">Min Temp: ${tempFmax}</p>
            <p id="humidity-${i}">Relative Humidity: ${humidity}%</p>
            <p id="uv-index${i}" class="${uvStyle}">UV Index: ${uvIndex}</p>
            </div>
      </div>
    `;
  }
};

function addItem(searchInput) {
  var existingEntries = JSON.parse(localStorage.getItem("cities") || "[]");

  if (!existingEntries.includes(searchInput)) {
    existingEntries.splice(0, 0, searchInput);
    localStorage.setItem("cities", JSON.stringify(existingEntries));
  }
}

const storage = async () => {
  let storageArr = [];
  storedStuff = await JSON.parse(localStorage.getItem("cities"));
  if (storedStuff != undefined) {
    storageArr.push(...storedStuff);
  }
  return storageArr;
};

function displayHistory(storageArr) {
  history.innerHTML = "";
  for (var i = 0; i < 8; i++) {
    if (storageArr[i] != undefined)
      history.innerHTML += `<li class="list-group-item"><button type="button" class="list-button" onclick="let searchInput = '${storageArr[i]}'; geoLocate(searchInput)">${storageArr[i]}</button></li>`;
  }
}

const readyPage = async () => {
  let searchInput = "Orlando";
  geoLocate(searchInput);
  let storageArr = await storage();
  displayHistory(storageArr);
};

$("#search-button").on("click", function search() {
  let searchInput = $(this).siblings("#searchInput").val();
  addItem(searchInput);
  geoLocate(searchInput);
  storageArr = storage().then((res) => {
    displayHistory(res);
  });
});

$(document).ready(readyPage);
