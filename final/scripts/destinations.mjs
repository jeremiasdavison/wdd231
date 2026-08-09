// Destinations page: builds the cards, filters them, opens the modal,
// and saves destinations to the trip list in localStorage.

import { startPage } from './common.mjs';
import { getDestinations } from './data.mjs';
import { toggleTrip, isInTrip, getTrip } from './storage.mjs';

startPage();

const cardsContainer = document.getElementById('destination-cards');
const resultCount = document.getElementById('result-count');
const tripCounter = document.getElementById('trip-counter');
const sortSelect = document.getElementById('sort-select');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('detail-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const loadError = document.getElementById('load-error');

let allDestinations = [];
let currentRegion = 'all';

function buildCard(place) {
  const saved = isInTrip(place.id);

  return `
    <article class="destination-card">
      <img src="${place.image}" alt="View of ${place.name}, ${place.province}" width="440" height="293" loading="lazy">
      <div class="card-body">
        <span class="region-badge">${place.region}</span>
        <h3>${place.name}</h3>
        <ul class="card-facts">
          <li><strong>Province:</strong> ${place.province}</li>
          <li><strong>Main attraction:</strong> ${place.highlight}</li>
          <li><strong>Best season:</strong> ${place.bestSeason}</li>
          <li><strong>Suggested stay:</strong> ${place.idealDays} ${place.idealDays === 1 ? 'day' : 'days'}</li>
        </ul>
        <div class="card-actions">
          <button class="button button-secondary details-btn" type="button" data-id="${place.id}">Details</button>
          <button class="button button-outline save-btn ${saved ? 'saved' : ''}" type="button" data-id="${place.id}">
            ${saved ? 'Saved' : 'Save to trip'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function showDestinations(list) {
  cardsContainer.innerHTML = list.map(buildCard).join('');
  resultCount.textContent = `Showing ${list.length} of ${allDestinations.length} destinations`;
}

function updateTripCounter() {
  const total = getTrip().length;
  tripCounter.textContent = total === 1
    ? '1 destination saved to your trip'
    : `${total} destinations saved to your trip`;
}

function sortList(list) {
  const copy = [...list];

  if (sortSelect.value === 'name') {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortSelect.value === 'days') {
    return copy.sort((a, b) => a.idealDays - b.idealDays);
  }

  return copy;
}

function applyFilters() {
  const filtered = currentRegion === 'all'
    ? allDestinations
    : allDestinations.filter((place) => place.region === currentRegion);

  showDestinations(sortList(filtered));
}

function openModal(id) {
  const place = allDestinations.find((item) => item.id === id);

  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>${place.name}</h2>
      <p>${place.province} &mdash; ${place.region}</p>
    </div>
    <div class="modal-body">
      <p>${place.description}</p>
      <h3>What to do there</h3>
      <ul class="tag-list">
        ${place.activities.map((activity) => `<li>${activity}</li>`).join('')}
      </ul>
      <ul class="card-facts">
        <li><strong>Main attraction:</strong> ${place.highlight}</li>
        <li><strong>Best season:</strong> ${place.bestSeason}</li>
        <li><strong>Suggested stay:</strong> ${place.idealDays} ${place.idealDays === 1 ? 'day' : 'days'}</li>
      </ul>
      <div class="modal-actions">
        <button class="button button-primary save-btn" type="button" data-id="${place.id}">
          ${isInTrip(place.id) ? 'Saved' : 'Save to trip'}
        </button>
      </div>
    </div>
  `;

  modal.showModal();
}

function handleSave(button) {
  const id = button.dataset.id;
  const nowSaved = toggleTrip(id);

  // Every button for this destination has to show the same state.
  document.querySelectorAll(`.save-btn[data-id="${id}"]`).forEach((twin) => {
    twin.textContent = nowSaved ? 'Saved' : 'Save to trip';
    twin.classList.toggle('saved', nowSaved);
  });

  updateTripCounter();
}

cardsContainer.addEventListener('click', (event) => {
  const detailsButton = event.target.closest('.details-btn');
  const saveButton = event.target.closest('.save-btn');

  if (detailsButton) {
    openModal(detailsButton.dataset.id);
  }

  if (saveButton) {
    handleSave(saveButton);
  }
});

modalContent.addEventListener('click', (event) => {
  const saveButton = event.target.closest('.save-btn');

  if (saveButton) {
    handleSave(saveButton);
  }
});

modalClose.addEventListener('click', () => {
  modal.close();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentRegion = button.dataset.region;

    filterButtons.forEach((other) => other.classList.remove('active'));
    button.classList.add('active');

    applyFilters();
  });
});

sortSelect.addEventListener('change', applyFilters);

async function init() {
  allDestinations = await getDestinations();

  if (allDestinations.length === 0) {
    loadError.hidden = false;
    resultCount.textContent = 'No destinations available';
    return;
  }

  applyFilters();
  updateTripCounter();
}

init();
