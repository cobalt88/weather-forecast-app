
const apiKey = '1057c30581fce41e7df886393bc1cbde';
var displayArr = [];
var geoArr = [];
var searchInput = '';
var lat = 


function geoLocate() {
  var requestLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=1057c30581fce41e7df886393bc1cbde`
  fetch(requestLocationUrl) 
  .then(function(response){
    return response.json();
  })
  .then(function(currentLocation) {
    let tempArr = [];
    tempArr.push(currentLocation);
    geoArr = tempArr;
  })
};

$("#search-button").on("click", function () {
  searchInput = $(this).siblings("#searchInput").val();
  geoLocate();
});



