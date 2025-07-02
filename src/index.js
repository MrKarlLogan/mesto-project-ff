import './index.css';

import { 
  deleteCard,
  likeCard,
  createCard
} from './components/card.js';

import { 
  openPopup,
  closePopup,
  setupPopupCloseHandlers
} from './components/modal.js';

import { 
  enableValidation,
  clearValidation
} from './components/validation.js';

import {
  fetchCards,
  fetchUserData,
  fetchUpdateProfile,
  fetchNewCard,
  updateAvatar
} from './components/api.js';

const template = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const fullImagePopup = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
const profileInfo = document.querySelector('.profile__info');
const userName = profileInfo.querySelector('.profile__title');
const userHobby = profileInfo.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const newCardForm = document.forms['new-place'];
const newCardName = newCardForm.elements['place-name'];
const linkNewCard = newCardForm.elements['link'];
const avatarEditButton = document.querySelector('.profile__image-edit');
const avatarPopup = document.querySelector('.popup_type_edit_avatar');
const avatarForm = document.forms['edit-avatar'];
const avatarInput = avatarForm.querySelector('input[name="link"]');
const avatarSubmitButton = avatarForm.querySelector('.popup__button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let currentUserId;

enableValidation(validationConfig);

function renderCards(cards, userId) {
  cards.forEach(element => {
    const card = createCard(element, deleteCard, likeCard, openFullImage, template, userId);
    cardContainer.append(card);
  });
};

Promise.all([fetchCards(), fetchUserData()])
  .then(([cards, userData]) => {
    currentUserId = userData._id;
    userName.textContent = userData.name;
    userHobby.textContent = userData.about;
    if (userData.avatar) {
      document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    };
    renderCards(cards, userData._id);
  })
  .catch (error => console.log(`Ошибка получения данные: ${error}`));

popups.forEach(evt => {
  if(!evt.classList.contains('popup_is-animated')) {
    evt.classList.add('popup_is-animated');
  };
  setupPopupCloseHandlers(evt);
});

function editProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userHobby.textContent;
  clearValidation(editProfileForm, validationConfig);
  openPopup(editProfilePopup);
};

editProfileButton.addEventListener('click', editProfile);

function openFullImage(item) {
  fullImagePopup.src = item.link;
  fullImagePopup.alt = item.name;
  imageCaption.textContent = item.name;
  openPopup(imagePopup);
};

newCardButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
});

function setButtonLoadingState(button, isLoading) {
  if(isLoading) {
    button.disabled = true
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
    button.disabled = false;
  };
};

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  setButtonLoadingState(submitButton, true);
  fetchNewCard(newCardName.value, linkNewCard.value)
    .then(cardData => {
      const card = createCard(cardData, deleteCard, likeCard, openFullImage, template, currentUserId);
      cardContainer.prepend(card);
      closePopup(newCardForm.closest('.popup'));
      newCardForm.reset();
    })
    .catch(error => console.log(`Ошибка создания карточки: ${error}`))
    .finally(() => {
      setButtonLoadingState(submitButton, false);
    });
};

newCardForm.addEventListener('submit', handleCardFormSubmit);

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  setButtonLoadingState(submitButton, true);
  fetchUpdateProfile(nameInput.value, jobInput.value)
    .then(updateData => {
      userName.textContent = updateData.name;
      userHobby.textContent = updateData.about;
      closePopup(editProfileForm.closest('.popup'));
    })
    .catch(error => console.log(`Ошибка изменения данных пользователя: ${error}`))
    .finally(() => {
      setButtonLoadingState(submitButton, false);
    });
};

editProfileForm.addEventListener('submit', handleUserFormSubmit);

avatarEditButton.addEventListener('mouseenter', () => {
  avatarEditButton.style.opacity = '1';
});
avatarEditButton.addEventListener('mouseleave', () => {
  avatarEditButton.style.opacity = '0';
});
avatarEditButton.addEventListener('click', evt => {
  evt.preventDefault();
  openPopup(avatarPopup);
  clearValidation(avatarForm, validationConfig);
  avatarSubmitButton.disabled = true;
  avatarSubmitButton.classList.add(validationConfig.inactiveButtonClass);
});

avatarForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  setButtonLoadingState(submitButton, true);
  updateAvatar(avatarInput.value)
    .then(userData => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
      closePopup(avatarPopup);
      avatarForm.reset();
    })
    .catch(error => console.log(`Ошибка сохранения аватара: ${error}`))
    .finally(() => {
      setButtonLoadingState(submitButton, false);
    });
});