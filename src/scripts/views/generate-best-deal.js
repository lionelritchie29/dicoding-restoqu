/* eslint-disable max-len */
import bestDealData from '../data/best-deal-data';

const generateBestDeal = () => {
  const bestDealContent = document.querySelector('.best-deal__content');
  bestDealContent.innerHTML = '';

  bestDealData.forEach((data) => {
    bestDealContent.innerHTML += `
      <div class="best-menu" style="background-color: ${data.backgroundColor}">
      <div class="best-menu__info">
        <span class="best-menu__info__restaurant">${data.restaurantName}</span>
        <h3>${data.productName}</h3>
        <span class="best-menu__info__price">Rp. ${data.normalPrice}, 00</span>
        <span class="best-menu__info__discount">Rp. ${data.discountPrice},00</span>
        <a href="#" aria-label="${data.productName} best deal. Click for more info">Click for more info</a>
      </div>

      <div class="best-menu__image">
        <img loading="lazy" width="250" height="200" src="${data.productImage}" alt="${data.productName}" />
      </div>
      </div>
    `;
  });
};

export default generateBestDeal;
