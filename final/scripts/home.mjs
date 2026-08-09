// Home page: shows the featured destinations taken from the same JSON file.

import { startPage } from './common.mjs';
import { getDestinations } from './data.mjs';

startPage();

const featuredContainer = document.getElementById('featured-cards');
const loadError = document.getElementById('load-error');

function buildFeaturedCard(place) {
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
          <li><strong>Suggested stay:</strong> ${place.idealDays} days</li>
        </ul>
        <div class="card-actions">
          <a class="button button-secondary" href="destinations.html">See all destinations</a>
        </div>
      </div>
    </article>
  `;
}

async function showFeatured() {
  const destinations = await getDestinations();

  if (destinations.length === 0) {
    loadError.hidden = false;
    return;
  }

  const featured = destinations.filter((place) => place.featured);
  featuredContainer.innerHTML = featured.map(buildFeaturedCard).join('');
}

showFeatured();
