var WEATHER_API_KEY = 'd19b890a039c28d152c801559310a181';
var LAT = -34.6037;
var LON = -58.3816;

var currentWeatherContainer = document.getElementById('current-weather');
var forecastList = document.getElementById('forecast');
var spotlightContainer = document.getElementById('spotlight-cards');

async function getCurrentWeather() {
  var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + LAT + '&lon=' + LON + '&units=metric&appid=' + WEATHER_API_KEY;
  var response = await fetch(url);
  var data = await response.json();
  displayCurrentWeather(data);
}

function displayCurrentWeather(data) {
  currentWeatherContainer.innerHTML =
    '<p class="temp">' + Math.round(data.main.temp) + '&deg;C</p>' +
    '<p class="description">' + data.weather[0].description + '</p>';
}

async function getForecast() {
  var url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + LAT + '&lon=' + LON + '&units=metric&appid=' + WEATHER_API_KEY;
  var response = await fetch(url);
  var data = await response.json();
  displayForecast(data.list);
}

function displayForecast(list) {
  var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var daysShown = 0;

  for (var i = 0; i < list.length && daysShown < 3; i++) {
    if (list[i].dt_txt.indexOf('12:00:00') === -1) {
      continue;
    }

    var day = new Date(list[i].dt_txt);
    var item = document.createElement('li');
    item.innerHTML =
      '<span class="forecast-day">' + dayNames[day.getDay()] + '</span>' +
      '<span class="forecast-temp">' + Math.round(list[i].main.temp) + '&deg;C</span>';
    forecastList.appendChild(item);
    daysShown++;
  }
}

function pickRandomSpotlights(members) {
  var eligible = [];
  for (var i = 0; i < members.length; i++) {
    if (members[i].membershipLevel === 2 || members[i].membershipLevel === 3) {
      eligible.push(members[i]);
    }
  }

  var count = 2;
  if (Math.random() > 0.5) {
    count = 3;
  }

  var selected = [];
  var usedIndexes = [];
  while (selected.length < count && selected.length < eligible.length) {
    var randomIndex = Math.floor(Math.random() * eligible.length);
    if (usedIndexes.indexOf(randomIndex) === -1) {
      usedIndexes.push(randomIndex);
      selected.push(eligible[randomIndex]);
    }
  }

  return selected;
}

async function getSpotlights() {
  var response = await fetch('data/members.json');
  var data = await response.json();
  var spotlights = pickRandomSpotlights(data.members);
  displaySpotlights(spotlights);
}

function displaySpotlights(members) {
  var membershipNames = ['Member', 'Silver Member', 'Gold Member'];
  var membershipClasses = ['member', 'silver', 'gold'];

  for (var i = 0; i < members.length; i++) {
    var member = members[i];
    var levelIndex = member.membershipLevel - 1;

    var card = document.createElement('div');
    card.className = 'card spotlight-card';

    card.innerHTML =
      '<img src="' + member.image + '" alt="' + member.name + ' logo" width="64" height="64">' +
      '<h3>' + member.name + '</h3>' +
      '<p class="tagline">' + member.tagline + '</p>' +
      '<p>' + member.address + '</p>' +
      '<p>' + member.phone + '</p>' +
      '<a class="website-link" href="' + member.website + '" target="_blank" rel="noopener">Visit Website</a>' +
      '<span class="badge ' + membershipClasses[levelIndex] + '">' + membershipNames[levelIndex] + '</span>';

    spotlightContainer.appendChild(card);
  }
}

getCurrentWeather();
getForecast();
getSpotlights();
