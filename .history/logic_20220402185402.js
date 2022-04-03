var buttonContainerEl = document.querySelector('#city-list');
var forecastContainer = document.getElementById('5-day-container');
var todayContainer = document.getElementById('current-day')
var displayArr = [];
var forecastArr = [];
// var searchLocationArr = [];
var input = document.getElementById('searchInput');
var locationKey = '';

$("#search-button").on("click", function () {
  let text = $(this).siblings("#searchInput").val();
  console.log(displayArr)
  let searchUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI&q=${text}}`
  fetch(searchUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(searchLocation) {
      searchLocationArr.push(searchLocation);
    })
    .then(function(){
      displayArr = searchLocationArr;
    })
  })


function getLocation() {
  var requestLocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI&q=107.146.21.159'
  fetch(requestLocationUrl) 
  .then(function(response){
    return response.json();
  })
  .then(function(currentLocation) {
    let tempArr = [];
    tempArr.push(currentLocation);
    locationKey = tempArr[0].Key;
    getForecast();
  })
};


// function getCityList() {
// let requestUrl = "http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI";
// fetch(requestUrl)
//   .then(function(response){
//   return response.json();
// })
// .then(function(cityData){
//   for (var i = 0; i < cityData.length; i++) {
//     var location = document.createElement('li')
//     location.textContent = `${cityData[i].EnglishName}, ${cityData[i].Country.EnglishName}`;
//     buttonContainerEl.appendChild(location)
//     location.setAttribute('class', 'list-group-item ')
//     location.setAttribute('id', `${cityData[i].EnglishName}-${cityData[i].Country.EnglishName}` )

//   }
// });
// };

function getForecast() {

    
    var searchUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI`
    fetch(searchUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(forecast) {
        let tempArr = [];
       tempArr.push(forecast);
       forecastArr = tempArr;
       forecastDisplayHandler();
      })
      
  }



function forecastDisplayHandler() {

  console.log(forecastArr);

  var currentCity = forecastArr[0].EnglishName;

todayContainer.innerHTML += 
  ` <h2 id="city">${currentCity}</h2>
    <h2 id="date">Date</h2>
      <img alt="Weather Icon">
      <p id="temp">Current temp</p>
      <p id="wind">Wind Speed</p>
      <p id="humidity">Current Humidity</p>`




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

}



getLocation();
// getCityList();
