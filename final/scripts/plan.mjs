// Plan page: shows the saved destinations and remembers the traveler details.

import { startPage } from './common.mjs';
import { getDestinations } from './data.mjs';
import { getTrip, removeFromTrip, getTraveler, saveTraveler } from './storage.mjs';

startPage();

const savedList = document.getElementById('saved-list');
const emptyMessage = document.getElementById('empty-trip');
const totalDays = document.getElementById('total-days');
const tripField = document.getElementById('destinations');
const form = document.getElementById('trip-form');
const firstNameField = document.getElementById('first-name');
const lastNameField = document.getElementById('last-name');
const emailField = document.getElementById('email');
const welcomeBack = document.getElementById('welcome-back');

let allDestinations = [];

function buildSavedItem(place) {
  return `
    <li>
      <span class="saved-name">${place.name}
        <span class="saved-meta">${place.province} &mdash; ${place.idealDays} ${place.idealDays === 1 ? 'day' : 'days'}</span>
      </span>
      <button class="remove-btn" type="button" data-id="${place.id}">Remove</button>
    </li>
  `;
}

function showSavedTrip() {
  const savedIds = getTrip();
  const savedPlaces = allDestinations.filter((place) => savedIds.includes(place.id));

  if (savedPlaces.length === 0) {
    savedList.innerHTML = '';
    emptyMessage.hidden = false;
    totalDays.textContent = '';
    tripField.value = 'None selected yet';
    return;
  }

  emptyMessage.hidden = true;
  savedList.innerHTML = savedPlaces.map(buildSavedItem).join('');

  const days = savedPlaces.reduce((total, place) => total + place.idealDays, 0);
  totalDays.textContent = `Suggested length of the trip: ${days} days.`;

  tripField.value = savedPlaces.map((place) => place.name).join(', ');
}

savedList.addEventListener('click', (event) => {
  const removeButton = event.target.closest('.remove-btn');

  if (removeButton) {
    removeFromTrip(removeButton.dataset.id);
    showSavedTrip();
  }
});

function fillTravelerDetails() {
  const traveler = getTraveler();

  if (!traveler) {
    return;
  }

  firstNameField.value = traveler.firstName;
  lastNameField.value = traveler.lastName;
  emailField.value = traveler.email;
  welcomeBack.textContent = `Welcome back, ${traveler.firstName}. We filled in your details from your last visit.`;
  welcomeBack.hidden = false;
}

form.addEventListener('submit', () => {
  saveTraveler({
    firstName: firstNameField.value,
    lastName: lastNameField.value,
    email: emailField.value
  });
});

async function init() {
  allDestinations = await getDestinations();
  showSavedTrip();
  fillTravelerDetails();
}

init();
