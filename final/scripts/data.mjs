// Loads the destination data with the Fetch API.

const DATA_URL = 'data/destinations.json';

export async function getDestinations() {
  try {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
      throw new Error(`The server answered with status ${response.status}`);
    }

    const data = await response.json();
    return data.destinations;
  } catch (error) {
    console.error('The destination data could not be loaded.', error);
    return [];
  }
}
