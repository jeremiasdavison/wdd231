var params = new URLSearchParams(window.location.search);

var fieldsToShow = ['firstName', 'lastName', 'email', 'mobilePhone', 'businessName', 'timestamp'];

for (var i = 0; i < fieldsToShow.length; i++) {
  var fieldName = fieldsToShow[i];
  var outputElement = document.getElementById('out-' + fieldName);
  var value = params.get(fieldName);

  if (fieldName === 'timestamp' && value) {
    value = new Date(value).toLocaleString();
  }

  outputElement.textContent = value || 'Not provided';
}
