// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeElement = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(arrCards, funDelCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__image").src = arrCards.link;
  cardElement.querySelector(".card__title").textContent = arrCards.name;
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
for (let i = 0; i < initialCards.length; i++) {
  placeElement.append(addCard(initialCards[i], delCard));
}
