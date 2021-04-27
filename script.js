var endPointFiveDay = "/data/2.5/forecast";
var cityName;
var searchBtn = $("#search-btn");
var currentWeather = $("#current-weather");
var foreCastCard1 = $("#forecast-1");
var foreCastCard2 = $("#forecast-2");
var foreCastCard3 = $("#forecast-3");
var foreCastCard4 = $("#forecast-4");
var foreCastCard5 = $("#forecast-5");



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
            renderCurrentWeather(data);
            getUvIndex(data);
            console.log(data);
        })
        //render current weather
    function renderCurrentWeather(weather) {
    currentWeather.children("h2").text(weather.name);
    currentWeather.children("#temp").text("Temp: " + weather.main.temp + " °F");
    currentWeather.children("#wind").text("Wind: " + weather.wind.speed + " mph");
    currentWeather.children("#humidity").text("Humidity: " + weather.main.humidity + "%");
}
    function getUvIndex(weather) {
        var lon = "&lon=" + weather.coord.lon;
        var lat = "lat=" + weather.coord.lat;
        var uvEndpoint = "/data/2.5/uvi?";
        var uvParameters = uvEndpoint + lat + lon + "&appid=520ff59736bd76211aac21cf63b52200";

        fetch(baseURL + uvParameters)
            .then (function(response) {
                return response.json();
            })
            .then (function(data) {
                renderUVI(data);
                console.log(data);
            })
    //render UV Index
    function renderUVI(UV) {
        currentWeather.children("#uv-index").text("UV Index: " + UV.value);
    }

    }

}

//fetch forecast
function getForecast() {
    var baseURL = "https://api.openweathermap.org";
    var endPointForecast = "/data/2.5/forecast";
    
    cityName = $("#search").val();
    var parameters = "?q=" + cityName + "&appid=520ff59736bd76211aac21cf63b52200&units=imperial";
    
    fetch(baseURL+endPointForecast+parameters)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            renderForecast(data);
            console.log(data);
        })
        //render forecast day 1
    function renderForecast(weather) {
    foreCastCard1.children("h5").text(weather.list[3].dt_txt[0]);
    foreCastCard1.children("#temp").text("Temp: " + weather.list[3].main.temp + " °F");
    foreCastCard1.children("#wind").text("Wind: " + weather.list[3].wind.speed + " mph");
    foreCastCard1.children("#humidity").text("Humidity: " + weather.list[3].main.humidity + "%");
    }
}













// get search bar input
searchBtn.on("click", getCurrentWeather, getForecast);
// getCurrentWeather();