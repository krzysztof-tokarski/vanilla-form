const form = document.querySelector('#form');
const passwordFormControl = document.getElementById('password');
const confirmPasswordFormControl = document.getElementById('confirm-password');
const countryFormControl = document.getElementById('country');

form.addEventListener('input', () => {

  const formValidityState = form.checkValidity();
  const submitButton = document.querySelector('#submit-button');
  const passwordMatch = passwordFormControl.value === confirmPasswordFormControl.value;

  if (!formValidityState || !passwordMatch) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }

});

const formControls = document.querySelectorAll(".form-control");

formControls.forEach(formControl => {

  const parentElement = formControl.parentElement;
  const span = document.createElement('span');
  span.classList.add('error');
  parentElement.appendChild(span);
  const errorMessageHolder = formControl.nextElementSibling;

  formControl.required = true;
  formControl.setAttribute('minLength', 4);
  formControl.setAttribute('maxLength', 25);

  formControl.addEventListener('input', () => {
    const formControlValidityState = formControl.checkValidity();

    if (formControlValidityState) {
      formControl.classList.add('valid-input');
      parentElement.classList.add('valid-parent');
      formControl.classList.remove('invalid');
      errorMessageHolder.textContent = '';
    } else {
      formControl.classList.remove('valid-input');
      parentElement.classList.remove('valid-parent');
    }
  })

  formControl.addEventListener('blur', () => {
    const formControlValidityState = formControl.checkValidity();
    const value = formControl.value;

    if (!formControlValidityState) {
      if (value.length === 0) {
        errorMessageHolder.textContent = 'This field is required.'
      } else {
        formControl.classList.add('invalid');
        if (value.length < 4) {
          errorMessageHolder.textContent = 'Minimum amount of characters is 4.';
        } else {
          errorMessageHolder.textContent = 'This field is incorrect.';
        }
      }
    }

  });

  formControl.addEventListener('focus', () => {
    formControl.classList.remove('invalid');
    errorMessageHolder.textContent = "";
  })
});

confirmPasswordFormControl.addEventListener('input', () => {
  const errorMessageHolder = confirmPasswordFormControl.nextElementSibling;

  if (passwordFormControl.value !== confirmPasswordFormControl.value) {
    const parentElement = confirmPasswordFormControl.parentElement;
    confirmPasswordFormControl.classList.remove('valid-input');
    parentElement.classList.remove('valid-parent');
  } else {
    const passwordFormControlValidityState = passwordFormControl.checkValidity();
    if (passwordFormControlValidityState) {
      const parentElement = confirmPasswordFormControl.parentElement;
      errorMessageHolder.classList.add('valid-input');
      parentElement.classList.add('valid-parent');
    }
  }

})

confirmPasswordFormControl.addEventListener('blur', () => {
  const errorMessageHolder = confirmPasswordFormControl.nextElementSibling;

  if (confirmPasswordFormControl.value.length >= 0 && passwordFormControl.value !== confirmPasswordFormControl.value) {
      errorMessageHolder.textContent = "Passwords do not match."
    }
})

countryFormControl.addEventListener('input', () => {
  const errorMessageHolder = countryFormControl.nextElementSibling;
  const validity = countryFormControl.checkValidity();

  if (countryFormControl.value.length >= 4 && validity === false) {
    errorMessageHolder.textContent = "Country name has to start with a capital letter and can only consist of letters."
  }

})

