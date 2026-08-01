import items from '../data/discover.mjs';

var gridContainer = document.getElementById('discover-cards');
var visitMessage = document.getElementById('visit-message');

var VISIT_KEY = 'meridianFallsLastVisit';
var MS_PER_DAY = 1000 * 60 * 60 * 24;

function buildCards(list) {
  for (var i = 0; i < list.length; i++) {
    var item = list[i];

    var card = document.createElement('section');
    card.className = 'discover-card';
    card.style.gridArea = 'card' + (i + 1);

    card.innerHTML =
      '<h2>' + item.name + '</h2>' +
      '<figure>' +
        '<img src="' + item.image + '" alt="' + item.name + ' in Meridian Falls" ' +
        'width="420" height="280" loading="' + (i < 2 ? 'eager' : 'lazy') + '">' +
        '<figcaption class="photo-credit">' + item.credit + '</figcaption>' +
      '</figure>' +
      '<address>' + item.address + '</address>' +
      '<p>' + item.description + '</p>' +
      '<button class="learn-more" type="button">Learn More</button>';

    gridContainer.appendChild(card);
  }
}

function buildVisitMessage(lastVisit, now) {
  if (!lastVisit) {
    return 'Welcome! Let us know if you have any questions.';
  }

  var days = Math.floor((now - Number(lastVisit)) / MS_PER_DAY);

  if (days < 1) {
    return 'Back so soon! Awesome!';
  }

  if (days === 1) {
    return 'You last visited 1 day ago.';
  }

  return 'You last visited ' + days + ' days ago.';
}

function showVisitMessage() {
  var now = Date.now();
  var lastVisit = localStorage.getItem(VISIT_KEY);

  visitMessage.textContent = buildVisitMessage(lastVisit, now);
  localStorage.setItem(VISIT_KEY, now);
}

buildCards(items);
showVisitMessage();
