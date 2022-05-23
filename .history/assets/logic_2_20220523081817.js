
const apiKey = '486a30fe2a4040f404391459060015ad';
var displayArr = [];
var geoArr = [];
var oneCallDataArr = [];
var searchInput = localStorage.getItem('lastSearch');
var lat = '';
var lon = '';
var forecastContainer = document.getElementById('5-day-container');
var currentDay = document.getElementById('today');
const history = document.getElementById('history');
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
  //note to self, add function to convert current time to unix time with moments and compare to values in this object to get current temp
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
  let windDir = oneCallDataArr[0].daily[0].wind_deg;
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

  let tempKd = oneCallDataArr[0].daily[i].temp.day;
  let tempKe = oneCallDataArr[0].daily[i].temp.eve;
  let tempKmax = oneCallDataArr[0].daily[i].temp.max;
  let tempKmin = oneCallDataArr[0].daily[i].temp.min;

  let tempFd = Math.round((tempKd - 273.15) * 1.8 + 32);
  // let tempFd = kelvinToImperial(tempKd);
  let tempFe = Math.round((tempKe - 273.15) * 1.8 + 32);
  let tempFmin = Math.round((tempKmin - 273.15) * 1.8 + 32);
  let tempFmax = Math.round((tempKmax - 273.15) * 1.8 + 32);

  let humidity = oneCallDataArr[0].daily[i].humidity;
  let uvIndex = oneCallDataArr[0].daily[i].uvi;
  let icon = oneCallDataArr[0].daily[i].weather[0].icon;
  let uvStyle = (uvIndex < 2) ? 'uvMin' : (uvIndex < 5) ? 'uvModerate' : (uvIndex < 7) ? 'uvHigh' : (uvIndex < 10) ? 'uvSevere' : 'uvExtreme';


  let iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`

  forecastContainer.innerHTML +=
      `
      <div id="day ${i}" class="card col-6">
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



const storage = () => {
  storedStuff = localStorage.getItem(city);
  history.push(storedStuff);
}

function displayHistory() {
for(var i = 0; i < searchHistoryArr.length; i++) {

  if (i < 5) {
    var text = searchHistoryArr[i];
  
    historyContainer.innerHTML += 
      `<li>${text}</li>`
    }
  }
}

$("#search-button").on("click", function () {
  searchInput = $(this).siblings("#searchInput").val();
  localStorage.setItem('city', searchInput);
  geoLocate();
  storage();
});

$(".list-button").on("click", function(){
  let test = $(this)
  console.log(test);
});



$(document).ready(function(){

  $('#city-one').text = `${historyArr[0]}`;
  $('#city-two').text = `${historyArr[1]}`;
  $('#city-three').text = `${historyArr[2]}`;
  $('#city-four').text = `${historyArr[3]}`;
  $('#city-five').text = `${historyArr[4]}`;
  searchInput = 'Orlando';
  geoLocate();

console.log(historyArr[0])
  // loadStorage()
  // displayHistory()
} );




