/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable new-cap */
const {getFirstRestaurantDetailUrl} = require('./helpers/getFirstRestaurantDetailUrl');

Feature('Post Review');

Before(async (I) => {
  I.amOnPage('/');
  I.dontSeeElement('img[alt="recommended skeleton"]');
  const url = await getFirstRestaurantDetailUrl(I);
  I.amOnPage(url);
});

Scenario('Post a review to a restaurant', async (I) => {
  I.waitForElement('review-list', 5);
  await fillAndSubmitReviewForm(I);
  I.waitForText('Post Review Success!', 10, '#modal-content');
});

const fillAndSubmitReviewForm = async (I) => {
  await I.executeScript(function() {
    const reviewListElm = document.querySelector('review-list');
    const addReviewContainer = reviewListElm.shadowRoot.querySelector('.detail-review__add');
    const nameInput = addReviewContainer.querySelector('#reviewer-name');
    const reviewsInput = addReviewContainer.querySelector('#review-box');
    const form = addReviewContainer.querySelector('#review-form');

    nameInput.value = 'Tonoy';
    reviewsInput.value = 'Hai apa kabar';

    console.log(form);
    setTimeout(() => {
      setTimeout(() => {
        form.dispatchEvent(new Event('submit'));
        console.log('clicked');
      }, 3000);
      window.scrollTo(0, document.body.scrollHeight);
      console.log('scrolled bottom');
    }, 3000);
  });
};
