import './index.css';

import { initialCards } from './components/cards.js';
import { 
  deleteCard, 
  likeCard, 
  openFullImage, 
  createCard, 
  createUserCard 
} from './components/card.js';

import { 
  openPopup, 
  closePopup, 
  editProfile, 
  handleFormSubmit, 
  setupPopupCloseHandlers,
  checkPopupOpen
} from './components/modal.js';

const template = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const fullImagePopup = imagePopup.querySelector('.popup__image');
const popups = document.querySelectorAll('.popup');
const profileInfo = document.querySelector('.profile__info');
const userName = profileInfo.querySelector('.profile__title');
const userHobby = profileInfo.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;
const newCardName = newCardForm.elements['place-name'];
const linkNewCard = newCardForm.elements['link'];

popups.forEach(evt => {
  if(!evt.classList.contains('popup_is-animated')) {
    evt.classList.add('popup_is-animated')
  }
  setupPopupCloseHandlers(evt);
});

editProfileButton.addEventListener('click', () => {
  editProfile(editProfilePopup, editProfileForm, nameInput, userName, jobInput, userHobby);
});

newCardButton.addEventListener('click', () => {
  openPopup(newCardPopup, newCardForm);
});

newCardForm.addEventListener('submit', (evt) => {
  createUserCard(evt, newCardForm, newCardName, linkNewCard, cardContainer, closePopup, deleteCard, likeCard, openFullImage, template, fullImagePopup, imagePopup);
});

editProfileForm.addEventListener('submit', (evt) => {
  handleFormSubmit(evt, editProfileForm, userName, nameInput, userHobby, jobInput);
});

initialCards.forEach(element => {
  const card = createCard(element, deleteCard, likeCard, openFullImage, template, fullImagePopup, imagePopup);
  cardContainer.append(card);
})