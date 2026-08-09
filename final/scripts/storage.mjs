// Small helpers around localStorage so every page saves data the same way.

const TRIP_KEY = 'wildPatagoniaTrip';
const TRAVELER_KEY = 'wildPatagoniaTraveler';

export function getTrip() {
  const saved = localStorage.getItem(TRIP_KEY);

  if (!saved) {
    return [];
  }

  try {
    const list = JSON.parse(saved);
    return Array.isArray(list) ? list : [];
  } catch (error) {
    console.error('The saved trip could not be read, starting a new one.', error);
    return [];
  }
}

export function saveTrip(list) {
  localStorage.setItem(TRIP_KEY, JSON.stringify(list));
}

export function isInTrip(id) {
  return getTrip().includes(id);
}

// Adds the destination if it is not saved yet, removes it if it is.
// Returns true when the destination ends up saved.
export function toggleTrip(id) {
  const list = getTrip();

  if (list.includes(id)) {
    saveTrip(list.filter((savedId) => savedId !== id));
    return false;
  }

  list.push(id);
  saveTrip(list);
  return true;
}

export function removeFromTrip(id) {
  saveTrip(getTrip().filter((savedId) => savedId !== id));
}

export function getTraveler() {
  const saved = localStorage.getItem(TRAVELER_KEY);

  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error('The saved traveler details could not be read.', error);
    return null;
  }
}

export function saveTraveler(traveler) {
  localStorage.setItem(TRAVELER_KEY, JSON.stringify(traveler));
}
