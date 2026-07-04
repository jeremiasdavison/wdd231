var yearSpan = document.getElementById('year');
yearSpan.textContent = new Date().getFullYear();

var lastModifiedParagraph = document.getElementById('lastModified');
lastModifiedParagraph.textContent = 'Last Modified: ' + document.lastModified;
