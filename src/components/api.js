const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '7e08e642-7ac8-4138-a285-2ed0ba16af6d',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if(res.ok) {
    return res.json()
  };
};

const fetchDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse);
};

const fetchLikeCard = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  })
  .then(handleResponse);
};

const fetchCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse)
  .catch(error => console.log(`Не удалось получить массив карточек: ${error}`));
};

const fetchUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse)
  .catch(error => console.log(`Не удалось получить данные пользователя: ${error}`));
};

const fetchUpdateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(handleResponse)
  .catch(error => console.log(`Не удалось обновить данные профиля: ${error}`));
};

const fetchNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(handleResponse)
  .catch(error => console.log(`Не удалось создать карточку: ${error}`));
};

function updateAvatar(avatarURL) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarURL
    })
  })
  .then(handleResponse)
  .catch(error => console.log(`Не удалось обновить аватар: ${error}`));
};

export {
  fetchCards,
  fetchUserData,
  fetchUpdateProfile,
  fetchNewCard,
  updateAvatar,
  fetchDeleteCard,
  fetchLikeCard
};