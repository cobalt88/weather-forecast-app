
const apiKey = '1057c30581fce41e7df886393bc1cbde';
var displayArr = [];


function geoLocate() {
  var requestLocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI&q=107.146.21.159'
  fetch(requestLocationUrl) 
  .then(function(response){
    return response.json();
  })
  .then(function(currentLocation) {
    let tempArr = [];
    tempArr.push(currentLocation);
    console.log(tempArr);
  })
};

$("#search-button").on("click", function () {
  let searchInput = $(this).siblings("#searchInput").val();
   

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=orlando&limit=1&appid=1057c30581fce41e7df886393bc1cbde`)
      .then(function(response) {
        return response.json;
      })
      .then(function(data) {
        tempArr = [];
        tempArr.push(data);
        console.log(tempArr);
      })


}); geoLocate();