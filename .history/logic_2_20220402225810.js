
const apiKey = '486a30fe2a4040f404391459060015ad';
var displayArr = [];
var geoArr = [];
var oneCallDataArr = [];
var searchInput = '';
var lat = '';
var lon = '';


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
  })
  .then(function(){
    console.log(oneCallDataArr)
  })
};

function forecastDisplayHandler() {

  var now = moment().format('dddd MMMM do YYYY, h:mm a');
  var currentCity = geoArr[0][0].name;
$('#current-day').innerHTML += 
  ` <h2 id="city">${currentCity}</h2>
    <h4 id="date">${now}</h4>
      <p>Day:<img alt="Weather Icon"></p>
      <p>Night:<img alt="Weather Icon 2"></p>
      <p id="temp">Current temp</p>
      <p id="wind">Wind Speed</p>
      <p id="humidity">Current Humidity</p>`

for (var i = 0; i < 5; i++) {

var unixTime = oneCallDataArr[0].daily[i].dt;
var dateString = moment.unix(unixTime).format("MM/DD/YYYY");
console.log(dateString)
  return time;
}

  }
  
  // forecastContainer.innerHTML +=
  //     `<div id="day ${i}" class="card col-3">
  //     <h2 id="date">${time}</h2>
  //     <img alt="Weather Icon">
  //     <p id="temp">${temp}</p>
  //     <p id="wind">${wind}</p>
  //     <p id="humidity">${humidity}</p>
  //   </div>`
    





$("#search-button").on("click", function () {
  searchInput = $(this).siblings("#searchInput").val();
  geoLocate();
});



