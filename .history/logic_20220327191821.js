var buttonContainerEl = document.querySelector('#city-list');

function getApi() {

var requestUrl = "http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI";

fetch(requestUrl)
  .then(function(response){
  return response.json();
})
.then(function(data){
  // console.log(data[0].Country.EnglishName)
  for (var i = 0; i < data.length; i++) {
    var localButton = document.createElement('li')
    location.textContent = `${data[i].EnglishName}, ${data[i].Country.EnglishName}`;
    buttonContainerEl.appendChild(localButton)
    location.setAttribute('class', 'list-group-item ')
  }
});
}


getApi();