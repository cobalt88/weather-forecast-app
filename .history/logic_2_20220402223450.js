
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
    console.log(displayArr)
  })
};

// function forecastDisplayHandler() {

//   console.log(forecastArr);
//   // console.log(displayArr)
//   var now = moment().format('dddd MMMM do YYYY, h:mm a');
//   var currentCity = displayArr[0].EnglishName;
//   let weather = forecastArr[0].DailyForecasts[0].Day;
//   console.log(weather)

// todayContainer.innerHTML += 
//   ` <h2 id="city">${currentCity}</h2>
//     <h4 id="date">${now}</h4>
//       <p>Day:<img alt="Weather Icon"></p>
//       <p>Night:<img alt="Weather Icon 2"></p>
//       <p id="temp">Current temp</p>
//       <p id="wind">Wind Speed</p>
//       <p id="humidity">Current Humidity</p>`

// for (var i = 0; i < displayArr.length; i++) {

//   var date = displayArr[i].Date;
  
//   forecastContainer.innerHTML +=
//       `<div id="day ${i}" class="card col-3">
//       <h2 id="date">${date}</h2>
//       <img alt="Weather Icon">
//       <p id="temp">${temp}</p>
//       <p id="wind">${wind}</p>
//       <p id="humidity">${humidity}</p>
//     </div>`
    
// }

// }


$("#search-button").on("click", function () {
  searchInput = $(this).siblings("#searchInput").val();
  geoLocate();
});



