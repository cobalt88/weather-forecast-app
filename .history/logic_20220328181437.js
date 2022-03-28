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
    var location = document.createElement('li')
    location.textContent = `${data[i].EnglishName}, ${data[i].Country.EnglishName}`;
    buttonContainerEl.appendChild(location)
    location.setAttribute('class', 'list-group-item ')
    location.setAttribute('id', `${data[i].EnglishName}-${data[i].Country.EnglishName}` )
    console.log(data);

  }
});
}


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


getApi();
// console.log(data);
