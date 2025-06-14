import './index.css';

import { initialCards } from './components/cards.js';
import { 
  deleteCard, 
  likeCard, 
  createCard, 
} from './components/card.js';

import { 
  openPopup, 
  closePopup, 
  setupPopupCloseHandlers,
} from './components/modal.js';

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

popups.forEach(evt => {
  if(!evt.classList.contains('popup_is-animated')) {
    evt.classList.add('popup_is-animated');
  };
  setupPopupCloseHandlers(evt);
});

initialCards.forEach(element => {
  const card = createCard(element, deleteCard, likeCard, openFullImage, template);
  cardContainer.append(card);
});

function editProfile() {
  openPopup(editProfilePopup);
  nameInput.value = userName.textContent;
  jobInput.value = userHobby.textContent;
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
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: newCardName.value,
    link: linkNewCard.value
  };
  const card = createCard(newCardData, deleteCard, likeCard, openFullImage, template);
  cardContainer.prepend(card);
  closePopup(newCardForm.closest('.popup'));
};

newCardForm.addEventListener('submit', handleCardFormSubmit);

function handleUserFormSubmit(evt) {
  evt.preventDefault();
  const popup = editProfileForm.closest('.popup');
  userName.textContent = nameInput.value;
  userHobby.textContent = jobInput.value;
  closePopup(popup);
};

editProfileForm.addEventListener('submit', handleUserFormSubmit);