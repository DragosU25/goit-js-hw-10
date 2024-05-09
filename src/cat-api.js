import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_ITMLvQ9T85xnAtv3dor6eJIKjh4vrHfwd3y1Ys9PcrszDVqzOmsY30ajk0JCx4AF';
async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { fetchCatByBreed };

export { fetchBreeds };
