export {
  openPopup,
  closePopup,
  editProfile,
  handleFormSubmit,
  setupPopupCloseHandlers,
  checkPopupOpen
};

function openPopup(popup, form) {
  popup.classList.add('popup_is-opened');
  if(form) {
      form.reset();
  }
  checkPopupOpen();
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  checkPopupOpen();
}

function handleEscapeKey(element) {
  if (element.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if(openPopup) {
      closePopup(openPopup);
    }
  }
}

function editProfile(editProfilePopup, editProfileForm, nameInput, userName, jobInput, userHobby) {
  openPopup(editProfilePopup, editProfileForm);
  nameInput.value = userName.textContent;
  jobInput.value = userHobby.textContent;
}

function handleFormSubmit(evt, editProfileForm, userName, nameInput, userHobby, jobInput) {
  evt.preventDefault();
  const popup = editProfileForm.closest('.popup');
  userName.textContent = nameInput.value;
  userHobby.textContent = jobInput.value;
  closePopup(popup);
}

function checkPopupOpen() {
  const openPopup = document.querySelector('.popup_is-opened');

  if(openPopup) {
    document.addEventListener('keydown', (evt) => handleEscapeKey(evt));
  } else {
    document.removeEventListener('keydown', (evt) => handleEscapeKey(evt));
  }
}

function setupPopupCloseHandlers(element) {
  const closePopupButton = element.querySelector('.popup__close');

  closePopupButton.addEventListener('click', () => closePopup(element));

  element.addEventListener('mousedown', evt => {
    if (evt.target === element) {
      closePopup(element);
    }
  })
}