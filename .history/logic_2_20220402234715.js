
const apiKey = '486a30fe2a4040f404391459060015ad';
var displayArr = [];
var geoArr = [];
var oneCallDataArr = [];
var searchInput = '';
var lat = '';
var lon = '';
var forecastContainer = document.getElementById('5-day-container');
var currentDay = document.getElementById('current-day')


function geoLocate() {
  var requestLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`
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
    console.log(oneCallDataArr)
  })
};

function forecastDisplayHandler() {

  var now = moment().format('dddd MMMM do YYYY, h:mm a');
  var currentCity = geoArr[0][0].name;
  //note to self, add function to convert current time to unix time with moments and compare to values in this object to get current temp
  var tempKc = oneCallDataArr[0].daily[0].temp.day;
  var tempKmax = oneCallDataArr[0].hourly[0].temp.max;
  var tempKmin = oneCallDataArr[0].daily[0].temp.min;
  var tempFc = Math.round((tempKc - 273.15) * 1.8 + 32);
  var tempFmin = Math.round((tempKmin - 273.15) * 1.8 + 32);
  var tempFmax = Math.round((tempKmax - 273.15) * 1.8 + 32);
  var wind = '';
  var humidity = '';
  currentDay.innerHTML += 
  ` <h2 id="city">${currentCity}</h2>
    <h4 id="date">${now}</h4>
    <img alt="Weather Icon">
    <p id="temp">Day Temp: ${tempFd}</p>
    <p id="temp">Evening Temp: ${tempFe}</p>
    <p id="temp">Max Temp: ${tempFmin}</p>
    <p id="temp">Min Temp: ${tempFmax}</p>
    <p id="wind">${wind}</p>
    <p id="humidity">${humidity}</p>`

for (var i = 1; i < 6; i++) {

  var unixTime = oneCallDataArr[0].daily[i].dt;
  var dateString = moment.unix(unixTime).format("MM/DD/YYYY");
  console.log(dateString)
  var tempKd = oneCallDataArr[0].daily[i].temp.day;
  var tempKe = oneCallDataArr[0].daily[i].temp.eve;
  var tempKmax = oneCallDataArr[0].daily[i].temp.max;
  var tempKmin = oneCallDataArr[0].daily[i].temp.min;
  var tempFd = Math.round((tempKd - 273.15) * 1.8 + 32);
  var tempFe = Math.round((tempKe - 273.15) * 1.8 + 32);
  var tempFmin = Math.round((tempKmin - 273.15) * 1.8 + 32);
  var tempFmax = Math.round((tempKmax - 273.15) * 1.8 + 32);
  var wind = '';
  var humidity = '';

  forecastContainer.innerHTML +=
      `<div id="day ${i}" class="card col-2">
      <h2 id="date">${dateString}</h2>
      <img alt="Weather Icon">
      <p id="temp">Day Temp: ${tempFd}</p>
      <p id="temp">Evening Temp: ${tempFe}</p>
      <p id="temp">Max Temp: ${tempFmin}</p>
      <p id="temp">Min Temp: ${tempFmax}</p>
      <p id="wind">${wind}</p>
      <p id="humidity">${humidity}</p>
    </div>`
};
}
$("#search-button").on("click", function () {
  searchInput = $(this).siblings("#searchInput").val();
  geoLocate();
});



