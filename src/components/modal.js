//открытие попапа
function openModal(popupElement){
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", checkKeyDownDocument);
}

//закрытие попапа
function closeModal(openedPopup){
  openedPopup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", checkKeyDownDocument);
}

function checkKeyDownDocument(evt){
  if (evt.key === "Escape"){
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function checkClickToCloseModal(evt){
  if (evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")){
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export {openModal, closeModal, checkClickToCloseModal}