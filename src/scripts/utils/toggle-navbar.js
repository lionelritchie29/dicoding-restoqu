const toggleNavbar = () => {
  const hamburgerBtn = document.getElementById('hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const main = document.querySelector('main');

  hamburgerBtn.addEventListener('click', (e) => {
    mobileMenu.classList.toggle('open');
    document.body.style.backgroundColor = 'rgba(0,0,0,0.5)';
  });

  main.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.backgroundColor = '#fef2ec';
  });
};

export default toggleNavbar;
