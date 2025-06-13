function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
};

function handleEscapeKey(element) {
  if (element.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if(openPopup) {
      closePopup(openPopup);
    }
  }
};

function setupPopupCloseHandlers(element) {
  const closePopupButton = element.querySelector('.popup__close');

  closePopupButton.addEventListener('click', () => closePopup(element));

  element.addEventListener('mousedown', evt => {
    if (evt.target === element) {
      closePopup(element);
    }
  })
};

export {
  openPopup,
  closePopup,
  setupPopupCloseHandlers,
};