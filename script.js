var endPointFiveDay = "/data/2.5/forecast";
var cityName;
var searchBtn = $("#search-btn");

//fetch current weather
function getCurrentWeather() {
    var baseURL = "https://api.openweathermap.org";
    var endPointCurrentWeather = "/data/2.5/weather";
    
    cityName = $("#search").val();
    var parameters = "?q=" + cityName + "&appid=520ff59736bd76211aac21cf63b52200&units=imperial";
    
    fetch(baseURL+endPointCurrentWeather+parameters)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}



//render current weather
function renderCurrentWeather() {
    var currentContain = $('<div class="current-weather">');
    var currentCityHead = $('<h2>').text(cityName);
}










// get search bar input
searchBtn.on("click", getCurrentWeather);
// getCurrentWeather();