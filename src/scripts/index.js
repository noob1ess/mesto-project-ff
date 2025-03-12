import '../pages/index.css';
import {addCard, delCard, likeCard} from '../components/card.js';
import {openModal, closeModal, checkClickToCloseModal} from '../components/modal.js';
import {enableValidation, clearValidation} from '../components/validation.js';
import {getMyProfile, getInitialCards, patchMyProfile, postNewCardOnServer, delCardOnServer, toggleLike, changeAvatar} from '../components/api.js';

const placeElement = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const popupOpenImg = document.querySelector(".popup_type_image");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupChangeAvatar = document.querySelector(".popup_type_change-avatar");

const capitonImgInPopup = popupOpenImg.querySelector(".popup__caption");
const imgInPopup = popupOpenImg.querySelector(".popup__image");

const nameProfileInput = popupEditProfile.querySelector(".popup__input_type_name");
const descriptionProfileInput = popupEditProfile.querySelector(".popup__input_type_description");
const editProfileButton = document.querySelector(".profile__edit-button");

const profileElements ={
  name: document.querySelector(".profile__title"),
  description: document.querySelector(".profile__description"),
  avatar: document.querySelector(".profile__image"),
}

const addCardButton = document.querySelector(".profile__add-button");

const editForm = document.querySelector(".popup_type_edit").querySelector(".popup__form");
const nameInputInForm = editForm.querySelector(".popup__input_type_name");
const descriptionInputInForm = editForm.querySelector(".popup__input_type_description");

const newCardForm = popupNewCard.querySelector(".popup__form");
const nameCardInputInForm = newCardForm.querySelector(".popup__input_type_card-name");
const urlCardInputInForm = newCardForm.querySelector(".popup__input_type_url");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input', 
  submitButtonSelector: '.popup__button', 
  inactiveButtonClass: 'popup__button_inactive', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__input_text-error_active' 
}

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
  nameProfileInput.value = profileElements.name.textContent;
  descriptionProfileInput.value = profileElements.description.textContent;
  clearValidation(popupEditProfile, validationConfig);
  openModal(popupEditProfile);
}

editProfileButton.addEventListener("click", openEditProfilePopap)

//создание новых карточек
function openNewCardForm(){
  newCardForm.reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
}

addCardButton.addEventListener("click", openNewCardForm)

//открытие модалки для смены аватара
function openPopupChangeAvatar(){
  popupChangeAvatar.querySelector('.popup__input').value='';
  clearValidation(popupChangeAvatar, validationConfig);
  openModal(popupChangeAvatar);
}

profileElements.avatar.addEventListener('click', openPopupChangeAvatar);

//смена аватарки
function handleChangeProfileAvatar(evt){
  evt.preventDefault();
  const linkAvatar = popupChangeAvatar.querySelector('.popup__input').value;
  popupChangeAvatar.querySelector('.popup__button').textContent = "Сохранение..."
  changeAvatar(linkAvatar)
    .then(dataProfile => {
      profileElements.avatar.style.backgroundImage = `url(${dataProfile.avatar})`;
      closeModal(popupChangeAvatar);
    })
    .catch(handleError)
    .finally(() => {
      popupChangeAvatar.querySelector('.popup__button').textContent = "Сохранить"
    })
}

popupChangeAvatar.addEventListener('submit', handleChangeProfileAvatar)

//изменение данных профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInputInForm.value;
  const newDescription = descriptionInputInForm.value;
  editForm.querySelector('.popup__button').textContent = "Cохранение..."
  patchMyProfile(newName, newDescription)
    .then(updatedDataProfile => {
      profileElements.name.textContent = updatedDataProfile.name;
      profileElements.description.textContent = updatedDataProfile.about;
      closeModal(popupEditProfile);
    })
    .catch(handleError)
    .finally(() => {
      editForm.querySelector('.popup__button').textContent = "Сохранить"
    })
}

editForm.addEventListener('submit', handleEditFormSubmit);

//удаление карточки
function deleteCard(elem) {
  delCardOnServer(elem.dataset._id)
    .then(() => delCard(elem))
    .catch(handleError)
}

//лайк карточки
function checkLikeOnCard(elem){
  const hasActiveLikeButton  = elem.querySelector('.card__like-button_is-active') !== null;
  toggleLike(elem.dataset._id, hasActiveLikeButton)
    .then(card => {
      elem.querySelector('.card__like-counter').textContent = card.likes.length;
      likeCard(elem);
    })
    .catch(handleError)
}

//добавление новой карточи
function handleNewCardFormSubmit(evt){
  evt.preventDefault();
  const newCard ={
    name : nameCardInputInForm.value,
    link : urlCardInputInForm.value,
  }
  newCardForm.querySelector('.popup__button').textContent = "Сохранение..."
  postNewCardOnServer(newCard)
    .then(postedCard => {
      placeElement.prepend(addCard(postedCard, deleteCard, checkLikeOnCard, openImgPopup, postedCard.owner._id));
      closeModal(popupNewCard);
    })
    .catch(handleError)
    .finally(() => {
      newCardForm.querySelector('.popup__button').textContent = "Сохранить"
    })
}

newCardForm.addEventListener('submit', handleNewCardFormSubmit);

//активация валидации
enableValidation(validationConfig);

//вывод ошибки запроса в консоль
function handleError(err) {
  console.error(`Ошибка ${err.code}: ${err.error}`);
}

//получение данных профиля, списка карточек и отображение на странице
Promise.all([getMyProfile(), getInitialCards()])
  .then(([dataProfile, cardList]) =>{
    profileElements.name.textContent = dataProfile.name;
    profileElements.description.textContent = dataProfile.about;
    profileElements.avatar.style.backgroundImage = `url(${dataProfile.avatar})`;
    cardList.forEach(elem =>{
      placeElement.append(addCard(elem, deleteCard, checkLikeOnCard, openImgPopup, dataProfile._id))
    })
  })
  .catch(handleError)