import '../pages/index.css';
import {initialCards} from './cards.js';
import {addCard, delCard, likeCard} from '../components/card.js';
import {openModal, closeModal} from '../components/modal.js';

// @todo: DOM узлы
const placeElement = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
  placeElement.append(addCard(item, delCard, likeCard, handleOpenImg));
});

//добавление плавности попапам
const popups = document.querySelectorAll(".popup");

popups.forEach((el)=>{
  el.classList.add("popup_is-animated");
})

//просмотр карточки
const popupOpenImg = document.querySelector(".popup_type_image");

function handleOpenImg(evt){
  const imgInfo = {
    name: evt.target.alt,
    src: evt.target.src,
  }
  const capitonImg = popupOpenImg.querySelector(".popup__caption");
  const dataImg = popupOpenImg.querySelector(".popup__image");
  capitonImg.textContent = imgInfo.name;
  dataImg.src = imgInfo.src;
  dataImg.alt = imgInfo.name;
  openModal(popupOpenImg, closeModal);
}

//попап редактирование профиля
const editProfileButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");

function fillEditProfilePopap(evt){
  const profileInfo = {
    name: evt.target.closest(".profile__info").querySelector(".profile__title").textContent,
    description: evt.target.closest(".profile__info").querySelector(".profile__description").textContent,
  }
  const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
  const descriptionInput = popupEditProfile.querySelector(".popup__input_type_description");
  nameInput.value = profileInfo.name;
  descriptionInput.value = profileInfo.description;
  openModal(popupEditProfile, closeModal);
}

editProfileButton.addEventListener("click", fillEditProfilePopap)

//создание новых карточек
const addCardButton = document.querySelector(".profile__add-button");

function resetNewCardForm(){
  const popupNewCard = document.querySelector(".popup_type_new-card");
  popupNewCard.querySelector(".popup__form").reset();
  openModal(popupNewCard, closeModal);
}

addCardButton.addEventListener("click", resetNewCardForm)

//закрытие по клику на оверлей или крестик
const popupElements = document.querySelectorAll(".popup");

popupElements.forEach((elem)=>{
  elem.addEventListener('click', function(evt){
    closeModal(evt);
  })
})

// Находим форму в DOM
const editFormElement = document.querySelector(".popup_type_edit").querySelector(".popup__form");
// Находим поля формы в DOM
const nameInput = editFormElement.querySelector(".popup__input_type_name");
const jobInput = editFormElement.querySelector(".popup__input_type_description");
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const newName = nameInput.value;
    const newJob = jobInput.value;
    const profileInfo = document.querySelector(".profile__info");
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileInfo.querySelector(".profile__title").textContent = newName;
    profileInfo.querySelector(".profile__description").textContent = newJob; 
    closeModal(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', handleEditFormSubmit);

//добавление новых карточек
const imgFormElement = document.querySelector(".popup_type_new-card").querySelector(".popup__form");

function handleNewCardFormSubmit(evt){
  evt.preventDefault();
  const newCard ={
    name : imgFormElement.querySelector(".popup__input_type_card-name").value,
    link : imgFormElement.querySelector(".popup__input_type_url").value,
  }
  placeElement.prepend(addCard(newCard, delCard, likeCard, handleOpenImg));
  imgFormElement.reset();
  closeModal(evt);
}

imgFormElement.addEventListener('submit', handleNewCardFormSubmit);