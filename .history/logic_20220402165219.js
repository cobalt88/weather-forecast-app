var buttonContainerEl = document.querySelector('#city-list');
var dataArr = [];
var currentLocationArr = [];
var searchLocationArr = [];
var input = document.getElementById('searchInput');

$("#search-button").on("click", function () {
  let text = $(this).siblings("#searchInput").val();
  console.log(text);
  var searchUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI&q=${text}}`
  fetch(searchUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(searchLocation) {
      searchLocationArr = searchLocation
    })
    .then(function(){
      return searchLocation;

    })

  })



function getLocation() {
  var requestLocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/ipaddress?apikey=WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI&q=199.231.175.194'
  fetch(requestLocationUrl) 
  .then(function(response){
    return response.json();
  })
  .then(function(currentLocation) {
    currentLocationArr.push(currentLocation);
  })
  .then(function(localForecast) {
    var localKey = currentLocationArr[0].Key;
    var searchUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI&q=${localKey}}`
    fetch(searchUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(location) {
        // console.log(location);
        // searchLocationArr.push(searchLocation)
      })
  })




};


function getCityList() {
var requestUrl = "http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI";
fetch(requestUrl)
  .then(function(response){
  return response.json();
})
.then(function(cityData){
  for (var i = 0; i < cityData.length; i++) {
    var location = document.createElement('li')
    location.textContent = `${cityData[i].EnglishName}, ${cityData[i].Country.EnglishName}`;
    buttonContainerEl.appendChild(location)
    location.setAttribute('class', 'list-group-item ')
    location.setAttribute('id', `${cityData[i].EnglishName}-${cityData[i].Country.EnglishName}` )
    dataArr.push(cityData[i]);
  }
});
};

function forecastDisplayHandler () {

}



// function search() {
//   var filter = input.value.toLowerCase();
//   var ul = document.getElementById('city-list');
//   var li = document.getElementsByTagName('li');

//   for (let i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = li.textContent || li.innerText;
//     if (txtValue.toLowerCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
  
// }

getLocation();
getCityList();
// console.log(currentLocationArr);