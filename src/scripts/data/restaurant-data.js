import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config.js';
import ModalController from '../utils/modal-controller.js';

class RestaurantData {
  static async getRestaurants() {
    try {
      const res = await fetch(API_ENDPOINT.restaurants);
      const resJson = await res.json();
      return resJson.restaurants;
    } catch (error) {
      console.log('Error getting restaurants data');
    }
  }

  static async getRestaurantById(id) {
    let res = null;

    try {
      res = await fetch(API_ENDPOINT.restaurant(id));
      const resJson = await res.json();
      return resJson.restaurant;
    } catch (error) {
      console.log('Error getting restaurant data');
    }
  }

  static async postRestaurantReview(reviewData) {
    const data = {
      id: reviewData.id,
      name: reviewData.name,
      review: reviewData.review,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
      body: JSON.stringify(data),
    };

    const url = API_ENDPOINT.restaurantReview;

    try {
      const res = await fetch(url, options);
      const resJson = await res.json();
      console.log(resJson.error);
      // if else ini tidak bisa dipisahkan menjadi function
      // jika dipisahkan malah masuk ke catch terus
      if (resJson.error) {
        ModalController.show(
            '😯',
            'Oops, Post Review Failed',
        );
      } else {
        ModalController.show(
            '🥳',
            'Post Review Success!',
        );
      }
    } catch (error) {
      console.log('Catched');
      ModalController.show(
          '😯',
          'Post Review failed, it may be caused by your Internet Connection',
      );
    }
  }
}

export default RestaurantData;
