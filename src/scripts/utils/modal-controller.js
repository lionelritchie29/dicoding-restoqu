import '../../styles/components/modal.scss';
import modalHtml from '../../templates/components/modal.html';

const ModalController = {
  show(emoji, content) {
    this.init();
    const modal = document.querySelector('#modal');
    const modalEmoji = document.querySelector('#modal-emoji');
    const modalContent = document.querySelector('#modal-content');

    console.log(modal);
    modal.style.display = 'flex';
    modalEmoji.innerHTML = emoji;
    modalContent.innerHTML = content;
  },

  init() {
    document.querySelector('main').innerHTML += modalHtml;
    console.log(document.querySelector('main'));
    this._addCloseBtnListener();
  },

  _addCloseBtnListener() {
    const closeBtn = document.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => this._hide());
  },

  _hide() {
    const modal = document.querySelector('#modal');
    modal.style.display = 'none';
  },
};

export default ModalController;
