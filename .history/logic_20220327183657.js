function getApi() {

var requestUrl = "http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI";

fetch(requestUrl)
  .then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data[0])
  // for (var i = 1; i < data.length; i++) {
  //   var localButton = document.createElement('button')
  //   localButton.textContent = data[i]
  // }
});
}


getApi();