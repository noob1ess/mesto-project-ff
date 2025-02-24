// @todo: Функция создания карточки
function addCard(dataCard, funDelCard, funLikeCard, funOpenCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardImage.addEventListener("click", ()=>{
    funOpenCard(dataCard);
  });
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