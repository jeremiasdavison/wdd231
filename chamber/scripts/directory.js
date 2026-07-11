var membershipNames = ['Member', 'Silver Member', 'Gold Member'];
var membershipClasses = ['member', 'silver', 'gold'];

var cardsContainer = document.getElementById('member-cards');
var memberCount = document.getElementById('member-count');
var gridButton = document.getElementById('grid-view');
var listButton = document.getElementById('list-view');

async function getMembers() {
  var response = await fetch('data/members.json');
  var data = await response.json();
  showMembers(data.members);
}

function showMembers(members) {
  memberCount.textContent = members.length + ' member businesses';

  for (var i = 0; i < members.length; i++) {
    var member = members[i];
    var levelIndex = member.membershipLevel - 1;

    var card = document.createElement('div');
    card.className = 'card';

    card.innerHTML =
      '<img src="' + member.image + '" alt="' + member.name + ' logo" width="64" height="64">' +
      '<h2>' + member.name + '</h2>' +
      '<p class="tagline">' + member.tagline + '</p>' +
      '<p>' + member.address + '</p>' +
      '<p>' + member.phone + '</p>' +
      '<a class="website-link" href="' + member.website + '" target="_blank" rel="noopener">Visit Website</a>' +
      '<span class="badge ' + membershipClasses[levelIndex] + '">' + membershipNames[levelIndex] + '</span>';

    cardsContainer.appendChild(card);
  }
}

gridButton.addEventListener('click', function () {
  cardsContainer.className = 'cards grid-view';
  gridButton.className = 'active';
  listButton.className = '';
});

listButton.addEventListener('click', function () {
  cardsContainer.className = 'cards list-view';
  listButton.className = 'active';
  gridButton.className = '';
});

getMembers();
