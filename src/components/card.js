export { 
  deleteCard, 
  likeCard, 
  openFullImage, 
  createCard, 
  createUserCard 
};

import {
  openPopup
} from './modal.js'

function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active'); 
};

function openFullImage(evt, fullImagePopup, imagePopup) {
  fullImagePopup.src = evt.target.src;
  fullImagePopup.alt = evt.target.alt;
  openPopup(imagePopup);
};

function createCard(item, deleteCard, likeCard, openFullImage, template, fullImagePopup, imagePopup) {
  const cardElement = template.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardTitle.textContent = item.name;
  cardLink.src = item.link;
  cardLink.alt = `${item.name}, красивая фотография.`;
  cardLink.addEventListener('click', (evt) => {
    openFullImage(evt, fullImagePopup, imagePopup);
  });
  likeButton.addEventListener('click', likeCard)
  deleteButton.addEventListener('click', deleteCard);
  return cardElement;
};

function createUserCard(evt, newCardForm, newCardName, linkNewCard, cardContainer, closePopup, deleteCard, likeCard, openFullImage, template, fullImagePopup, imagePopup) {
  evt.preventDefault();
  const popup = newCardForm.closest('.popup');
  const newCardData = {
    name: newCardName.value,
    link: linkNewCard.value
  };
  const card = createCard(newCardData, deleteCard, likeCard, openFullImage, template, fullImagePopup, imagePopup);
  cardContainer.prepend(card);
  closePopup(popup);
};