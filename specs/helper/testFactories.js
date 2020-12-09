const createFavoriteButtonAndModalTemplate = () => {
  document.body.innerHTML = `
    <main>
    <button id="add-fav-btn"></button>
    <button class="add-fav" id="add-fav-btn-md"></button>
    <div id="modal" class="modal">
        <div class="modal-content">
        <button class="close-modal">&times;</button>
        <div id="modal-emoji"></div>
        <p id="modal-content"></p>
        </div>
    </div>
    </main>`;
};

const createFavoriteButtonTemplate = () => {
  document.body.innerHTML =
    `<button id="add-fav-btn" aria-label="Add to Favorite">☆</button>
    <button class="add-fav" id="add-fav-btn-md">Add to Favorite</button>`;
};

const createUnfavoriteButtonTemplate = () => {
  document.body.innerHTML =
    `<button id="add-fav-btn" aria-label="Remove from Favorite">★</button>
    <button class="add-fav" id="add-fav-btn-md">Remove from Favorite</button>`;
};

export {
  createFavoriteButtonAndModalTemplate,
  createFavoriteButtonTemplate,
  createUnfavoriteButtonTemplate,
};
