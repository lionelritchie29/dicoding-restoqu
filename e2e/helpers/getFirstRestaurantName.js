const getFirstRestaurantName = async (I) => {
  const names = await I.executeScript(function() {
    const restaurantListElm =
      document.querySelector('restaurant-list');
    const restaurantCardElm =
      restaurantListElm.shadowRoot.querySelector('restaurant-card');
    const restaurantName =
      restaurantCardElm.shadowRoot.querySelector('h3').innerHTML;
    return restaurantName;
  });
  return names;
};

module.exports = {getFirstRestaurantName};
