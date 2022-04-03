
const apiKey = '1057c30581fce41e7df886393bc1cbde';
var displayArr = [];


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
    displayArr = tempArr;
    getForecast();
  })
};

function geoLocate() {
fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`)
      .then(function(response) {
        return response.json;
      })
      .then(function(location) {
        tempArr = [];
        tempArr.push(location);
        console.log(location);
      })
};

$("#search-button").on("click", function () {
  let searchInput = $(this).siblings("#searchInput").val();
   
    });

    geoLocate();