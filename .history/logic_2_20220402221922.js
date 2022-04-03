
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
  // .then(oneCall());
  console.log(lat,lon)
};

function oneCall() {
  let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  fetch(oneCallApi)
  .then(response => {
    return response;
  })
  .then(allData => {
    let tempArr = [];
    tempArr.push(allData)
    oneCallDataArr = tempArr;
  })
};


$("#search-button").on("click", function () {
  searchInput = $(this).siblings("#searchInput").val();
  geoLocate();
});



