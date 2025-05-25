const cardList = document.querySelector('.places__list');
const template = document.querySelector('#card-template').content;

function createCard(cardText, cardLink) {
  const card = template.cloneNode(true);
  const removeButton = card.querySelector('.card__delete-button');
  card.querySelector('.card__title').textContent = cardText;
  card.querySelector('.card__image').src = cardLink;
  removeButton.addEventListener('click', removeCard);
  return card;
}

function removeCard(evt) {
  evt.target.closest('.places__item').remove();
}

initialCards.forEach(element => {
  cardList.append(createCard(element.name, element.link));
})
