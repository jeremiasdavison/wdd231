// Shared behaviour that every page of the site needs.

export function setUpMenu() {
  const menuButton = document.getElementById('menu-button');
  const primaryNav = document.getElementById('primary-nav');

  menuButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
  });
}

export function setUpFooterDates() {
  const yearSpan = document.getElementById('year');
  const modifiedParagraph = document.getElementById('last-modified');

  yearSpan.textContent = new Date().getFullYear();
  modifiedParagraph.textContent = `Last modified: ${document.lastModified}`;
}

export function startPage() {
  setUpMenu();
  setUpFooterDates();
}
