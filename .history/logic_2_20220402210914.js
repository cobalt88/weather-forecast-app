
const apiKey = '486a30fe2a4040f404391459060015ad';

$("#search-button").on("click", function () {
  let searchInput = $(this).siblings("#searchInput").val();



  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`)
      .then(function(response) {
        return response.json;
      })
      .then(function(location) {
        tempArr = [];
        tempArr.push(location);
        console.log(location);
      })
   
    });