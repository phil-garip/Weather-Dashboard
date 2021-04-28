var endPointFiveDay = "/data/2.5/forecast";
var cityName;
var searchBtn = $("#search-btn");
var currentWeather = $("#current-weather");
var foreCastCard1 = $("#forecast-1");
var foreCastCard2 = $("#forecast-2");
var foreCastCard3 = $("#forecast-3");
var foreCastCard4 = $("#forecast-4");
var foreCastCard5 = $("#forecast-5");
var recentSearches = $("#recent-searches");
var uvIndex = $("#uv-index");

var searchHistory = [];


//fetch current weather
function getCurrentWeather() {

    var baseURL = "https://api.openweathermap.org";
    var endPointCurrentWeather = "/data/2.5/weather";
    
    cityName = $("#search").val();
    var parameters = "?q=" + cityName + "&appid=520ff59736bd76211aac21cf63b52200&units=imperial";

    function setSavedCities () {
        if (searchHistory.length === 5) {
            searchHistory.pop(); 
        }
        searchHistory.unshift(cityName);
        localStorage.setItem("history", JSON.stringify(searchHistory));
        
    }

    setSavedCities();
    
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
        if (UV.value > 7) {
            uvIndex.attr("style=color:red");
        } else if (UV.value < 3) {
            uvIndex.attr("style=color:green");
        } else {
            uvIndex.attr("style=color:yellow");
        }
    }

    }
    getForecast();

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
    // first card
    foreCastCard1.children("h5").text(weather.list[4].dt_txt);
    foreCastCard1.children("#temp").text("Temp: " + weather.list[4].main.temp + " °F");
    foreCastCard1.children("#wind").text("Wind: " + weather.list[4].wind.speed + " mph");
    foreCastCard1.children("#humidity").text("Humidity: " + weather.list[4].main.humidity + "%");
    //second card
    foreCastCard2.children("h5").text(weather.list[12].dt_txt);
    foreCastCard2.children("#temp2").text("Temp: " + weather.list[12].main.temp + " °F");
    foreCastCard2.children("#wind2").text("Wind: " + weather.list[12].wind.speed + " mph");
    foreCastCard2.children("#humidity2").text("Humidity: " + weather.list[12].main.humidity + "%");
    //third card
    foreCastCard3.children("h5").text(weather.list[20].dt_txt);
    foreCastCard3.children("#temp3").text("Temp: " + weather.list[20].main.temp + " °F");
    foreCastCard3.children("#wind3").text("Wind: " + weather.list[20].wind.speed + " mph");
    foreCastCard3.children("#humidity3").text("Humidity: " + weather.list[20].main.humidity + "%");
    //fourth card
    foreCastCard4.children("h5").text(weather.list[28].dt_txt);
    foreCastCard4.children("#temp4").text("Temp: " + weather.list[28].main.temp + " °F");
    foreCastCard4.children("#wind4").text("Wind: " + weather.list[28].wind.speed + " mph");
    foreCastCard4.children("#humidity4").text("Humidity: " + weather.list[28].main.humidity + "%");
    //fifth card
    foreCastCard5.children("h5").text(weather.list[36].dt_txt);
    foreCastCard5.children("#temp5").text("Temp: " + weather.list[36].main.temp + " °F");
    foreCastCard5.children("#wind5").text("Wind: " + weather.list[36].wind.speed + " mph");
    foreCastCard5.children("#humidity5").text("Humidity: " + weather.list[36].main.humidity + "%");
    }

    function getsavedCity() {
        searchHistory = JSON.parse(localStorage.getItem("history"));
        console.log(searchHistory)
    }

    // display data for saved city button
    function generateCityButton() {
        var cityButton = $('<button type="button" class="btn btn-secondary aside-btn">').text(cityName);
        recentSearches.append(cityButton);
    }

    generateCityButton();
    getsavedCity();
}













// get search bar input
searchBtn.on("click", getCurrentWeather);
// getCurrentWeather();