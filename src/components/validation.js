//функции для валидации форм

//отображение ошибки
const showInputError = (formElement, inputElement, errorMessage, inputTypeError, inputErrorActive) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(inputTypeError);
  errorElement.textContent = errorMessage;; 
  errorElement.classList.add(inputErrorActive); 
};

//скрытие ошибки
const hideInputError = (formElement, inputElement, inputTypeError, inputErrorActive) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(inputTypeError);
  errorElement.classList.remove(inputErrorActive);
  errorElement.textContent = ''; 
};

//установка кастомной ошибки
const setCustomError = (inputElement) => {
  if (inputElement.validity.patternMismatch)  {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
};

//проверка валидности полей
const checkInputValidity = (formElement, inputElement, inputTypeError, inputErrorActive) => {
  setCustomError(inputElement);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputTypeError, inputErrorActive);
  } else {
    hideInputError(formElement, inputElement, inputTypeError, inputErrorActive);
  }
};

//проверка валидности инпутов
const checkInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//отключение кнопки
const disabledButton = (buttonElement, buttonClassInactive) => {
  buttonElement.classList.add(buttonClassInactive);
  buttonElement.disabled = true;
}

//переключение состояния кнопки
const toggleButtonState = (inputList, buttonElement, buttonClassInactive) => {
  if(checkInvalidInput(inputList)){
    disabledButton(buttonElement, buttonClassInactive);
  } else {
    buttonElement.classList.remove(buttonClassInactive);
    buttonElement.disabled = false;
  }
}

//установка слушателей на инпуты
const setEventListeners = (formElement, formInput, buttonSubmit, buttonClassInactive, inputTypeError, inputErrorActive) => {
  const inputList = Array.from(formElement.querySelectorAll(formInput));
  const buttonElement = formElement.querySelector(buttonSubmit);
  toggleButtonState(inputList, buttonElement, buttonClassInactive);
  inputList.forEach(inputElement =>{
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputTypeError, inputErrorActive);
      toggleButtonState(inputList, buttonElement, buttonClassInactive);
    })
  })

}

//активация валидации
export function enableValidation(validationSetting){
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));
  formList.forEach(elem =>{
    setEventListeners(elem, validationSetting.inputSelector, validationSetting.submitButtonSelector, validationSetting.inactiveButtonClass, validationSetting.inputErrorClass, validationSetting.errorClass);
  }) 
}

//очистка валидации
export function clearValidation(profileForm, validationConfig){
  const formElement = profileForm.querySelector(validationConfig.formSelector);
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  const buttonForm = profileForm.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach( inputElement =>{
    hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  })
  disabledButton(buttonForm, validationConfig.inactiveButtonClass)
}

