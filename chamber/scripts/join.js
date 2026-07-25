var timestampField = document.getElementById('timestamp');
timestampField.value = new Date().toISOString();

var infoLinks = document.querySelectorAll('.info-link');

for (var i = 0; i < infoLinks.length; i++) {
  infoLinks[i].addEventListener('click', function (event) {
    event.preventDefault();
    var modalId = this.getAttribute('data-modal');
    var modal = document.getElementById(modalId);
    modal.showModal();
  });
}

var closeButtons = document.querySelectorAll('.modal-close');

for (var j = 0; j < closeButtons.length; j++) {
  closeButtons[j].addEventListener('click', function () {
    this.closest('dialog').close();
  });
}

var levelCards = document.querySelectorAll('.level-card');

for (var k = 0; k < levelCards.length; k++) {
  levelCards[k].style.animationDelay = (k * 0.15) + 's';
  levelCards[k].classList.add('card-enter');
}
