const getFirstRestaurantDetailUrl = async (I) => {
  const res = await I.executeScript(function() {
    const restaurantListElm = document.querySelector('restaurant-list');
    const restaurantCardElm =
      restaurantListElm.shadowRoot.querySelector('restaurant-card');
    const anchorTag =
      restaurantCardElm.shadowRoot.querySelector('.restaurant__info__more a');
    const url = anchorTag.getAttribute('href');
    return url;
  });
  return res;
};

module.exports = {getFirstRestaurantDetailUrl};
