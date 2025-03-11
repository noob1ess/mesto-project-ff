//Функция создания карточки
function addCard(dataCard, funDelCard, funLikeCard, funOpenCard, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardImage = cardElement.querySelector(".card__image");
  const cardOwnerId = dataCard.owner._id;
  cardElement.querySelector(".card__title").textContent = dataCard.name;
  cardElement.dataset._id = dataCard._id;
  likeCounter.textContent = dataCard.likes.length;
  const isLikedByUser = dataCard.likes.some(like => like._id === userId);
  if (isLikedByUser){
    likeButton.classList.add('card__like-button_is-active')
  }
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardImage.addEventListener("click", ()=>{
    funOpenCard(dataCard);
  });
  likeButton.addEventListener("click", ()=>{
    funLikeCard(cardElement);
  })
  if (cardOwnerId === userId){
    deleteButton.addEventListener("click", ()=>{
      funDelCard(cardElement);
    });
  } else {
    deleteButton.remove();
  }
  return cardElement;
}

//Функция удаления карточки
function delCard(elem) {
  elem.remove();
}

//Функция лайка карточки
function likeCard(elem){
  elem.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
}

export {addCard, delCard, likeCard};