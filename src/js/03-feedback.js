const throttle = require('lodash.throttle');
import storage from './storage';

const FORM_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('.feedback-form input');
const messageTextarea = document.querySelector('.feedback-form textarea');

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', handleInput);

updateForm();

function handleSubmit(evt) {
  evt.preventDefault();

  const {
    elements: { email, message },
  } = evt.currentTarget;

  const formData = {
    email: email.value,
    message: message.value,
  };

  console.log(formData);

  storage.remove(FORM_KEY);

  evt.currentTarget.reset();
  messageTextarea.textContent = ''; // коли ввожу дані обновляю сторінку
  // і submit то textarea не скидається
}

function handleInput(evt) {
  const {
    elements: { email, message },
  } = evt.currentTarget;

  const formData = {
    email: email.value,
    message: message.value,
  };

  saveDataFromFormToLocal(formData);
}

const saveDataFromFormToLocal = throttle(formData => {
  storage.save(FORM_KEY, formData);
}, 1000);

function updateForm() {
  const formData = storage.load(FORM_KEY);

  if (formData) {
    emailInput.value = formData.email;
    messageTextarea.textContent = formData.message;
  }
}
