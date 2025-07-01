function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass); 
  }
}

function isValid(formElement, inputElement, validationConfig) {
  inputElement.setCustomValidity('');
  if(inputElement.value && inputElement.type === 'text') {
    const regex = /^[а-яА-ЯёЁa-zA-Z\s-]+$/;
    if(!regex.test(inputElement.value)) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
  } else if(inputElement.value && inputElement.type === 'url') {
    const regexUrl = /^https?:\/\/[^\s]+$/;
    if(!regexUrl.test(inputElement.value)) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }
  }
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  };
};

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig)
    })
  })
}

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, validationConfig);
  })
}

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(inputElement => {
    inputElement.setCustomValidity('');
    hideInputError(profileForm, inputElement, validationConfig);
  });
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass); 
}

export {
  enableValidation,
  clearValidation
}