import { 
  openPopup, 
  closePopup
} from './modal.js';

import {
  config
} from './api.js';

let handleDelete = null;

function deleteCard(cardElement, cardId) {
  const deletePopup = document.querySelector('.popup_type_delete');
  const deletePopupButton = deletePopup.querySelector('.popup__button');
  if(handleDelete) {
    deletePopupButton.removeEventListener('click', handleDelete);
  }
  handleDelete = () => {
    fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    })
    .then(() => {
      cardElement.closest('.places__item').remove();
      closePopup(deletePopup);
      deletePopupButton.removeEventListener('click', handleDelete);
    })
    .catch(error => {
      console.log(`Не удалось удалить карточку: ${error}`);
      closePopup(deletePopup);
      deletePopupButton.removeEventListener('click', handleDelete);
    });
  }
  deletePopupButton.addEventListener('click', handleDelete);
  openPopup(deletePopup);
};

function likeCard(likeButton, cardId, likeCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  })
  .then(res => {
    if(res.ok) {
      return res.json()
    }
  })
  .then(data => {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCounter.textContent = data.likes.length;
  })
  .catch(error => console.log(`Не удалось поставить лайк: ${error}`));
};

function createCard(item, deleteCard, likeCard, openFullImage, template, userId) {
  const cardElement = template.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  cardTitle.textContent = item.name;
  cardLink.src = item.link;
  cardLink.alt = `${item.name}, красивая фотография.`;
  likeCounter.textContent = item.likes.length;
  if(item.owner._id !== userId) {
    deleteButton.remove();
  }
  const isLiked = item.likes.some(like => like._id === userId);
  if(isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  };
  cardLink.addEventListener('click', () => {
    openFullImage(item);
  });
  likeButton.addEventListener('click', () => {
    likeCard(likeButton, item._id, likeCounter)
  });
  deleteButton.addEventListener('click', evt => {
    deleteCard(evt.target, item._id)
  });
  return cardElement;
};

export { 
  deleteCard,
  likeCard,
  createCard,
};