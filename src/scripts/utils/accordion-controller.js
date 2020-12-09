const accordionHeadClass = '.detail-content__info__additional__accordion__head';

const AccordionController = {
  init() {
    const accordionHeaders =
      document.querySelectorAll(accordionHeadClass);
    this.addListeners(accordionHeaders);
  },

  addListeners(accordionHeaders) {
    accordionHeaders.forEach((header) => {
      header.addEventListener('click', (e) => {
        this._disableCurrentActiveAccordion();
        this._setAriaExpandedTrue(header);
        const accordionBody = header.nextElementSibling;
        this._setAccordionState(accordionBody);
      });
    });
  },

  _disableCurrentActiveAccordion() {
    const currentActiveAccordion = document.querySelector('.active');
    if (currentActiveAccordion) {
      currentActiveAccordion.classList.remove('active');
    }
  },

  _setAccordionState(accordionBody) {
    accordionBody.classList.toggle('active');
  },

  _setAriaExpandedTrue(header) {
    this._setAllAriaExpandedFalse();
    header.setAttribute('aria-expanded', 'true');
  },

  _setAllAriaExpandedFalse() {
    const accordionHeaders =
      document.querySelectorAll(accordionHeadClass);
    accordionHeaders.forEach((header) => {
      header.setAttribute('aria-expanded', 'false');
    });
  },
};

export default AccordionController;
