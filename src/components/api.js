//функции для взаимодействия с сервером
//ответ сервера всегда проверяется на корректность проверкой res.ok

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
  headers: {
    authorization: 'b5e58921-5d86-43ab-aca9-99f63707dca4',
    'Content-Type': 'application/json'
  }
}

//получение кода и сообщения ошибки
const handleErrorResponse = (response) => {
  return response.json().then((errorData) => {
    return Promise.reject({
      code: response.status,
      error: errorData.message || errorData.error || 'Неизвестная ошибка',
    });
  });
}

//преобразование ответа сервера
const handleResponse = (response) => {
  if (!response.ok) {
    return handleErrorResponse(response);
  }
  return response.json();
}

//получение данных профиля
export const getMyProfile = () => {
  return fetch(config.baseUrl+'/users/me', {
    headers: config.headers
  })
  .then(handleResponse)
}

//получение списка карточек
export const getInitialCards = () => {
  return fetch(config.baseUrl+'/cards', {
    headers: config.headers,
  })
  .then(handleResponse)
}

//обновление данных профиля
export const patchMyProfile = (newName, newAbout) => {
  return fetch(config.baseUrl+'/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  })
  .then(handleResponse)
}

//добавление карточки на сервер
export const postNewCardOnServer = (dataNewCard) => {
  return fetch(config.baseUrl+'/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(dataNewCard)
  })
  .then(handleResponse)
}

//удаление карточки с сервера
export const delCardOnServer = (cardId) => {
  return fetch(config.baseUrl + '/cards/' + cardId, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(handleResponse)
}

//переключатель лайка
export const toggleLike = (cardId, isLiked) => {
  const method = isLiked ? 'DELETE' : 'PUT';

  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: method,
    headers: config.headers,
  })
  .then(handleResponse)
}

//смена аватарки
export const changeAvatar = (imgLink) => {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(
      {avatar: imgLink}
    )
  })
    .then(handleResponse);
}