import html from '../../templates/components/review-card.html';
import scss from '../../styles/components/review-card.scss';
import templateFactory from '../../scripts/utils/template-factory.js';

const template = templateFactory(html, scss);

class ReviewCard extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow( {mode: 'open'} );
    this.shadowDOM.appendChild(template.content.cloneNode(true));
  }

  set item(item) {
    this._item = item;
    this.render();
  }

  render() {
    this.setData();
  }

  setData() {
    const nameElm = this.shadowDOM.getElementById('reviewer-name');
    const messageElm = this.shadowDOM.getElementById('reviewer-message');
    const dateElm = this.shadowDOM.getElementById('reviewer-date');

    nameElm.innerHTML = this._item.name;
    messageElm.innerHTML = this._item.review;
    dateElm.innerHTML = this._item.date;
  }
}

customElements.define('review-card', ReviewCard);
