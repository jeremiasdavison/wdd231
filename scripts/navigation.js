var menuButton = document.getElementById('menu-button');
var primaryNav = document.getElementById('primary-nav');

menuButton.addEventListener('click', function () {
  primaryNav.classList.toggle('open');
});
