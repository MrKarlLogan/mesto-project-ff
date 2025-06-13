function deleteCard(evt) {
  evt.target.closest('.places__item').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active'); 
};

function createCard(item, deleteCard, likeCard, openFullImage, template) {
  const cardElement = template.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardTitle.textContent = item.name;
  cardLink.src = item.link;
  cardLink.alt = `${item.name}, красивая фотография.`;
  cardLink.addEventListener('click', () => {
    openFullImage(item);
  });
  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', deleteCard);
  return cardElement;
};

export { 
  deleteCard,
  likeCard,
  createCard,
};