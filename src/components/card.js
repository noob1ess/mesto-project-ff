// @todo: Функция создания карточки
function addCard(dataCard, funDelCard, funLikeCard, funOpenCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__image").src = dataCard.link;
  cardElement.querySelector(".card__image").alt = dataCard.name;
  cardElement.querySelector(".card__title").textContent = dataCard.name;
  cardElement.querySelector(".card__image").addEventListener("click", funOpenCard)
  deleteButton.addEventListener("click", ()=>{
    funDelCard(cardElement);
  });
  likeButton.addEventListener("click", ()=>{
    funLikeCard(cardElement);
  })
  return cardElement;
}

// @todo: Функция удаления карточки
function delCard(elem) {
  elem.remove();
}

//Функция лайка карточки
function likeCard(elem){
  elem.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
}

export {addCard, delCard, likeCard};