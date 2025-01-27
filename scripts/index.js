// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeElement = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(dataCard, funDelCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = dataCard.link;
  cardElement.querySelector(".card__image").alt = dataCard.name;
  cardElement.querySelector(".card__title").textContent = dataCard.name;
  deleteButton.addEventListener("click", function () {
    funDelCard(cardElement);
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function delCard(elem) {
  elem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  placeElement.append(addCard(item, delCard));
});