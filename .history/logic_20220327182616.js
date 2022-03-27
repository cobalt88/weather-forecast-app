function getApi() {

var requestUrl = 'http://dataservice.accuweather.com/locations/v1/topcities/50?apikey=%09WRy7rAgeG9pkGPZlac8sWxk9sXswNaMI';

fetch(requestUrl)
  .then(function(response){
  return response.json();
})
.then(function(data){
  console.log(data);
})
}

getApi();