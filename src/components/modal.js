//открытие попапа
function openModal(popupElement, closeFunction){
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeFunction);
}

//поиск открытого окна и закрытие его
function closeModal(evt){
  if (evt.key === "Escape" || evt.type === "submit" || 
      evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup")){
    const openedModal = document.querySelector(".popup_is-opened");
    openedModal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModal);
  }
}

export {openModal, closeModal}