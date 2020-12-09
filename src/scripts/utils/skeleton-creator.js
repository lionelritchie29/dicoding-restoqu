import '../components/restaurant-card.js';

const createRestaurantCardSkeleton = (count) => {
  let cards = '';

  for (let i=0; i<count; i++) {
    cards += '<restaurant-card></restaurant-card>';
  }

  return cards;
};

export {createRestaurantCardSkeleton}