
const apiKey = '1057c30581fce41e7df886393bc1cbde';
var displayArr = [];


function getLocation() {
  var requestLocationUrl = 'https://geo.ipify.org/api/v2/country?apiKey=at_ISBBqf17juCrVU1Zzw7bnNc4HPe4U&ipAddress=8.8.8.8'
  fetch(requestLocationUrl) 
  .then(function(response){
    return response.json();
  })
  .then(function(currentLocation) {
    let tempArr = [];
    tempArr.push(currentLocation);
    console.log(temp);
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
getLocation();
    // geoLocate();