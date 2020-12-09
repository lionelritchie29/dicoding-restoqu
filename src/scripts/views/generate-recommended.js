import recommendedData from '../data/recommended-data';

const generateRecommended = () => {
  const recommendedContent =
    document.querySelector('.recommended__content__scrollable');
  recommendedContent.innerHTML = '';

  recommendedData.forEach((rec) => {
    recommendedContent.innerHTML += `
      <div class="recommended-image">
          <div>
            <img
              loading="lazy"
              src="./images/others/${rec.image}"
              width="356"
              height="452"
              alt="${rec.name}"
            />
          </div>
          <h3>${rec.name}</h3>
          <a href="#" aria-label="More about ${rec.name} menu">
            More
          </a> &#127860;
        </div>
    `;
  });
};

export default generateRecommended;
