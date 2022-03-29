var buttonContainerEl = document.querySelector('#city-list');
var dataArr = [];
currentLocationArr = [];

function getLocation() {
  var requestLocationUrl = 'http://dataservice.accuweather.com/locations/v1/cities/199.231.175.194?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI'
  fetch(requestLocationUrl) 
  .then(function(response){
    return response.json();
  })
  .then(function(currentLocation) {
    currentLocationArr.push(...currentLocation);
    console.log(currentLocationArr);
  })
};


function getApi() {
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



// function search() {
//   var input = document.getElementById('searchInput');
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
getApi();
console.log(currentLocationArr);
