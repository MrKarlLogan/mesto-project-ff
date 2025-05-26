const cardContainer = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;

function createCard(item, {deleteCard}) {
  const cardElement = template.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardTitle.textContent = item.name;
  cardLink.src = item.link;
  cardLink.alt = `${item.name}, красивая фотография.`;

  deleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

initialCards.forEach(element => {
  const card = createCard(element, {
    deleteCard: evt => {
      evt.target.closest('.places__item').remove()
    }
  });
  cardContainer.append(card);
})
