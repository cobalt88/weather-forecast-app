
const apiKey = '486a30fe2a4040f404391459060015ad';
var displayArr = [];
var geoArr = [];
var oneCallDataArr = [];
var searchInput = localStorage.getItem('lastSearch');
var lat = '';
var lon = '';
var forecastContainer = document.getElementById('5-day-container');
var currentDay = document.getElementById('today');
const history = document.getElementById('history-container');
const historyArr = ['Orlando', 'New York', 'Denver', 'Dallas', 'Anchorage'];

function geoLocate() {
  var requestLocationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`
  fetch(requestLocationUrl) 
  .then(function(response){
    return response.json();
  })
  .then(function(currentLocation) {
    let tempArr = [];
    tempArr.push(currentLocation);
    geoArr = tempArr;
    let lat2 = geoArr[0][0].lat;
    lat = lat2;
    let lon2 = geoArr[0][0].lon;
    lon = lon2;
  })
.then(function(){
    oneCall();
  });
};

function oneCall() {
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`
  fetch(oneCallApi)
  .then(function(response){
    return response.json();
  })
  .then(function(allData) {
    let tempArr = [];
    tempArr.push(allData)
    oneCallDataArr = tempArr;
    forecastDisplayHandler();
  })
  .then(function(){
    // console.log(oneCallDataArr)
  })
};

  function kelvinToImperial (x) {
    Math.round((x - 273.15) * 1.8 + 32);
  }



const forecastDisplayHandler = async() => {
  forecastContainer.innerHTML = '';
  var now = moment().format('dddd MMMM do YYYY, h:mm a');
  var currentCity = geoArr[0][0].name;
  let tempKd = oneCallDataArr[0].daily[0].temp.day;
  let tempKmax = oneCallDataArr[0].daily[0].temp.max;
  let tempKmin = oneCallDataArr[0].daily[0].temp.min;
  let tempKe = oneCallDataArr[0].daily[0].temp.eve;

  let tempFd = Math.round((tempKd - 273.15) * 1.8 + 32);
  let tempFmin = Math.round((tempKmin - 273.15) * 1.8 + 32);
  let tempFmax = Math.round((tempKmax - 273.15) * 1.8 + 32);
  let tempFe = Math.round((tempKe - 273.15) * 1.8 + 32);

  let windSpeed = oneCallDataArr[0].daily[0].wind_speed;
  let windGust = oneCallDataArr[0].daily[0].wind_gust;
  let humidity = oneCallDataArr[0].daily[0].humidity;
  let uvIndex = oneCallDataArr[0].daily[0].uvi;
  let icon = oneCallDataArr[0].daily[0].weather[0].icon;
  let uvStyle = (uvIndex < 2) ? 'uvMin' : (uvIndex < 5) ? 'uvModerate' : (uvIndex < 7) ? 'uvHigh' : (uvIndex < 10) ? 'uvSevere' : 'uvExtreme';


  let iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`
  
   currentDay.innerHTML = 
  ` 

    <h2 id="city">${currentCity}</h2>
    <h4 id="date">${now}</h4>
    <img src="${iconSrc}" alt="Weather Icon">
    <p id="weather-${i}></p>
    <p id="temp-${i}">Day Temp: ${tempFd}</p>
    <p id="temp-${i}">Evening Temp: ${tempFe}</p>
    <p id="temp-${i}">Max Temp: ${tempFmax}</p>
    <p id="temp-${i}">Min Temp: ${tempFmin}</p>
    <p id="wind-${i}">Average Wind Speed: ${windSpeed}</p>
    <p id="wind-${i}">Wind Gust: ${windGust}</p>
    <p id="humidity-${i}">Relative Humidity: ${humidity}%</p>
    <p id="uv-index${i}" class="${uvStyle}">UV Index: ${uvIndex}</p>
    `;



for (var i = 1; i < 6; i++) {

  let unixTime = oneCallDataArr[0].daily[i].dt;
  let dateString = moment.unix(unixTime).format("MM/DD/YYYY");

  let tempKmax = oneCallDataArr[0].daily[i].temp.max;
  let tempKmin = oneCallDataArr[0].daily[i].temp.min;

  let tempFmin = Math.round((tempKmin - 273.15) * 1.8 + 32);
  let tempFmax = Math.round((tempKmax - 273.15) * 1.8 + 32);

  let humidity = oneCallDataArr[0].daily[i].humidity;
  let uvIndex = oneCallDataArr[0].daily[i].uvi;
  let icon = oneCallDataArr[0].daily[i].weather[0].icon;
  let uvStyle = (uvIndex < 2) ? 'uvMin' : (uvIndex < 5) ? 'uvModerate' : (uvIndex < 7) ? 'uvHigh' : (uvIndex < 10) ? 'uvSevere' : 'uvExtreme';


  let iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`

  forecastContainer.innerHTML +=
      `
      <div id="day ${i}" class="card col-10 col-sm-5 col-lg-3">
        <h2 id="date" class="card-title">${dateString}</h2>
          <img src="${iconSrc}" class="card-img-top" alt="Weather Icon"/>
            <p id="weather-${i}></p>
            <p id="temp-${i}">Max Temp: ${tempFmin}</p>
            <p id="temp-${i}">Min Temp: ${tempFmax}</p>
            <p id="humidity-${i}">Relative Humidity: ${humidity}%</p>
            <p id="uv-index${i}" class="${uvStyle}">UV Index: ${uvIndex}</p>
      </div>
    `
};
}


function addItem(searchInput) {
  var existingEntries = JSON.parse(localStorage.getItem("cities") || '[]');

  if (!existingEntries.includes(searchInput)) {
    existingEntries.push(searchInput);
    localStorage.setItem("cities", JSON.stringify(existingEntries));
  }
}


const storage = async() => {
  let storage = []
  storedStuff = await localStorage.getItem("city");
  if(storedStuff != undefined){
     storage.push(storedStuff);
  } 
 
  console.log(storage);
}

function displayHistory() {
  history.innerHTML = '';
for(var i = 0; i < 5; i++) {
  history.innerHTML +=  `<li class="list-group-item"><button type="button" id="list-button">${historyArr[i]}</button></li>`;
  }
}

$("#search-button").on("click", function () {
  searchInput = $(this).siblings("#searchInput").val();
  addItem(searchInput);
  geoLocate();
  
});

$("#list-button").on("click", function(){
  
  console.log('button has been clicked');
});



$(document).ready(function(){


  searchInput = 'Orlando';
  geoLocate();
  storage()
  displayHistory();
} );




