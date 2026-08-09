// Form action page: reads the submitted values from the URL and displays them.

import { startPage } from './common.mjs';

startPage();

const params = new URLSearchParams(window.location.search);
const summary = document.getElementById('summary');
const greeting = document.getElementById('greeting');

const fields = [
  { key: 'firstName', label: 'First name' },
  { key: 'lastName', label: 'Last name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'startDate', label: 'Arrival date' },
  { key: 'travelers', label: 'Number of travelers' },
  { key: 'style', label: 'Travel style' },
  { key: 'transport', label: 'Preferred transport' },
  { key: 'destinations', label: 'Saved destinations' },
  { key: 'newsletter', label: 'Newsletter' },
  { key: 'notes', label: 'Notes' }
];

const rows = fields.map((field) => {
  let value = params.get(field.key);

  if (field.key === 'newsletter') {
    value = value ? 'Yes' : 'No';
  }

  return `
    <dt>${field.label}</dt>
    <dd>${value ? value : 'Not provided'}</dd>
  `;
});

summary.innerHTML = rows.join('');

const firstName = params.get('firstName');
greeting.textContent = firstName
  ? `Thank you, ${firstName}. Your trip request was received.`
  : 'Thank you. Your trip request was received.';
