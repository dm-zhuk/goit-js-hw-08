import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Save form state to localStorage
const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
};

// Load form state from localStorage
const loadFormState = () => {
  const formStateJSON = localStorage.getItem('feedback-form-state');

  if (formStateJSON) {
    const formState = JSON.parse(formStateJSON);

    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

// Clear form state and localStorage
const clearFormState = () => {
  emailInput.value = '';
  messageInput.value = '';

  localStorage.removeItem('feedback-form-state');
};

// Handle form submission
const handlerSubmit = event => {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Add a check in the `handlerSubmit` function to make the form submit only when both fields are filled
  if (formState.email && formState.message) {
    console.log(formState);
    clearFormState();
  } else {
    alert('Fill in both fields before submit, please');
  }
};

// Listen for "input" event and save form state using throttle to limit the frequency of updates
form.addEventListener('input', throttle(saveFormState, 500));

// Load form state when the page loads
window.addEventListener('load', loadFormState);

// Handle form submission
form.addEventListener('submit', handlerSubmit);
