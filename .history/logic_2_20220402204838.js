
const apiKey = '486a30fe2a4040f404391459060015ad';

$("#search-button").on("click", function () {
  let searchInput = $(this).siblings("#searchInput").val();

oneCallApi = event => {
  event.preventDefault();
  
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${apiKey}`)
      .then(response => response.json());
      .then(data => {
          // calls oneCall api
          oneCallApi(data);
          // call five day forecast api
          fiveDayForecast(data);
          // calls store history function
          storeHistory(inputValue.value);
        })
      };
        
