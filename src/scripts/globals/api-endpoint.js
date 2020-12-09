import CONFIG from './config.js';

const API_ENDPOINT = {
  restaurants: `${CONFIG.API_BASE_URL}/list`,
  restaurant: (id) => `${CONFIG.API_BASE_URL}/detail/${id}`,
  restaurantReview: `${CONFIG.API_BASE_URL}/review`,
  restaurantDetail: (id) => `${CONFIG.API_BASE_URL}/detail/${id}`,
  restaurantImgSmall:
    (id) => `${CONFIG.API_BASE_URL}/images/small/${id}`,
  restaurantImgMed:
    (id) => `${CONFIG.API_BASE_URL}/images/medium/${id}`,
};

export default API_ENDPOINT;
