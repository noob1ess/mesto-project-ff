import '../pages/index.css';
import {initialCards} from './cards.js';
import {addCard, delCard, likeCard} from '../components/card.js';
import {openModal, closeModal, checkClickToCloseModal} from '../components/modal.js';

const placeElement = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const popupOpenImg = document.querySelector(".popup_type_image");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const capitonImgInPopup = popupOpenImg.querySelector(".popup__caption");
const imgInPopup = popupOpenImg.querySelector(".popup__image");

const nameProfileInput = popupEditProfile.querySelector(".popup__input_type_name");
const descriptionProfileInput = popupEditProfile.querySelector(".popup__input_type_description");
const editProfileButton = document.querySelector(".profile__edit-button");

const dataProfile ={
  name: document.querySelector(".profile__title"),
  description: document.querySelector(".profile__description"),
}

const addCardButton = document.querySelector(".profile__add-button");

const editForm = document.querySelector(".popup_type_edit").querySelector(".popup__form");
const nameInputInForm = editForm.querySelector(".popup__input_type_name");
const descriptionInputInForm = editForm.querySelector(".popup__input_type_description");

const newCardForm = popupNewCard.querySelector(".popup__form");
const nameCardInputInForm = newCardForm.querySelector(".popup__input_type_card-name");
const urlCardInputInForm = newCardForm.querySelector(".popup__input_type_url");

// вывод карточек на страницу
initialCards.forEach(item => {
  placeElement.append(addCard(item, delCard, likeCard, openImgPopup));
});

//добавление плавности попапам и закрытия по оверлею
popups.forEach((elem)=>{
  elem.classList.add("popup_is-animated");
  elem.addEventListener('click', checkClickToCloseModal);
})

//просмотр карточки
function openImgPopup(dataCard){
  capitonImgInPopup.textContent = dataCard.name;
  imgInPopup.src = dataCard.link;
  imgInPopup.alt = dataCard.name;
  openModal(popupOpenImg);
}

//попап редактирование профиля
function openEditProfilePopap(){
  nameProfileInput.value = dataProfile.name.textContent;
  descriptionProfileInput.value = dataProfile.description.textContent;
  openModal(popupEditProfile);
}

editProfileButton.addEventListener("click", openEditProfilePopap)

//создание новых карточек
function openNewCardForm(){
  newCardForm.reset();
  openModal(popupNewCard);
}

addCardButton.addEventListener("click", openNewCardForm)

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    const newName = nameInputInForm.value;
    const newdescription = descriptionInputInForm.value;
    dataProfile.name.textContent = newName;
    dataProfile.description.textContent = newdescription; 
    closeModal(popupEditProfile);
}

editForm.addEventListener('submit', handleEditFormSubmit);

//добавление новых карточек
function handleNewCardFormSubmit(evt){
  evt.preventDefault();
  const newCard ={
    name : nameCardInputInForm.value,
    link : urlCardInputInForm.value,
  }
  placeElement.prepend(addCard(newCard, delCard, likeCard, openImgPopup));
  closeModal(popupNewCard);
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);