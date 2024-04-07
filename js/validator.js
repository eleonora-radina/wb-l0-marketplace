const userForm = document.querySelector('.basket__form-user');
const buttonOrder = document.querySelector('.sidebar__button-order');

const userFormInputName = document.getElementById('name-input');
const userFormInputSurname = document.getElementById('surname-input');
const userFormInputEmail = document.getElementById('email-input');
const userFormInputPhone = document.getElementById('phone-input');
const userFormInputTIN = document.getElementById('tin-input');

const userFormInputNameError = document.querySelector(".name-input-error");
const userFormInputSurnameError = document.querySelector(".surname-input-error");
const userFormInputEmailError = document.querySelector(".email-input-error");
const userFormInputPhoneError = document.querySelector(".phone-input-error");
const userFormInputTINError = document.querySelector(".tin-input-error");

const popupOrder = document.querySelector('.popup_order');
const buttonCloseOrderPopup = document.querySelector('.popup_order .popup__button-exit');

const nameRegex = /^[a-zA-Zа-яёА-ЯЁ\s\-]*$/;
const emailRegex = /(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.[a-zA-Z]{2,3})+$)/;
const phoneRegex = /^[1-9]?[-]?\(?\d{3}\)?[-]?\d{3}[-]?\d{2}[-]?\d{2}$/;
const tinRegex = /[0-9]{14}/;

const validateInput = (regex, userFormInput, value, nameError, textError) => {
    let isValid = value === '' || regex.test(value);

    if (isValid) {
    nameError.textContent = ' ';
    userFormInput.classList.remove('basket__form-input_error');
  } else {
    nameError.textContent = textError;
    userFormInput.classList.add('basket__form-input_error');
  }
};

const formatPhoneNumber = () => {
  var phoneNumber = userFormInputPhone.value.replace(/\D/g, '');

  if (phoneNumber.length > 0 && phoneNumber.length <= 1) {
    phoneNumber = '+' + phoneNumber.slice(0, 1);
  } else if (phoneNumber.length > 1 && phoneNumber.length <= 4) {
    phoneNumber = '+' + phoneNumber.slice(0, 1) + ' (' + phoneNumber.slice(1, 4);
  }
  else if (phoneNumber.length > 4 && phoneNumber.length <= 7) {
    phoneNumber = '+' + phoneNumber.slice(0, 1) + ' (' + phoneNumber.slice(1, 4) + ') ' + phoneNumber.slice(4, 7);
  } else if (phoneNumber.length > 7 && phoneNumber.length <= 10) {
    phoneNumber = '+' + phoneNumber.slice(0, 1) + ' (' + phoneNumber.slice(1, 4) + ') ' + phoneNumber.slice(4, 7) + '-' + phoneNumber.slice(7);
  } else if (phoneNumber.length > 10) {
    phoneNumber = '+' + phoneNumber.slice(0, 1) + ' (' + phoneNumber.slice(1, 4) + ') ' + phoneNumber.slice(4, 7) + '-' + phoneNumber.slice(7, 9) + '-' + phoneNumber.slice(9, 11);
  }
  
  userFormInputPhone.value = phoneNumber;
}

const isValidForm = () => {
  let isValid = true;

  if (!nameRegex.test(userFormInputName.value) || userFormInputName.value === '') {
    userFormInputNameError.textContent = 'Укажите имя';
    userFormInputName.classList.add('basket__form-input_error');
    isValid = false;
  };

  if (!nameRegex.test(userFormInputSurname.value) || userFormInputSurname.value === '') {
    userFormInputSurnameError.textContent = 'Введите фамилию';
    userFormInputSurname.classList.add('basket__form-input_error');
    isValid = false;
  };

  if (!emailRegex.test(userFormInputEmail.value)) {
    userFormInputEmailError.textContent = 'Укажите электронную почту';
    userFormInputEmail.classList.add('basket__form-input_error');
    isValid = false;
  };

  if (!phoneRegex.test(userFormInputPhone.value.replace(/\D/g, ''))) {
    userFormInputPhoneError.textContent = 'Укажите номер телефона';
    userFormInputPhone.classList.add('basket__form-input_error');
    isValid = false;
  }

  if (!tinRegex.test(userFormInputTIN.value)) {
    userFormInputTINError.textContent = 'Укажите ИНН';
    userFormInputTIN.classList.add('basket__form-input_error');
    isValid = false;
  }

  return isValid;
}

const orderButton = () => {
  if (isValidForm()) {
    popupOrder.classList.add('popup_opened');
  } else {
    userForm.scrollIntoView();
  }
}

userFormInputPhone.addEventListener('input', () => {
    if (userFormInputPhone.value.replace(/\D/g, '').length <= 11) {
        formatPhoneNumber();
    } else {
        userFormInputPhone.value = userFormInputPhone.value.slice(0, 18);
    }
});

userFormInputName.addEventListener('blur', () => validateInput(nameRegex, userFormInputName, userFormInputName.value, userFormInputNameError, 'Укажите имя'));
userFormInputSurname.addEventListener('blur', () => validateInput(nameRegex, userFormInputSurname, userFormInputSurname.value, userFormInputSurnameError, 'Введите фамилию'));
userFormInputEmail.addEventListener('blur', () => validateInput(emailRegex, userFormInputEmail, userFormInputEmail.value, userFormInputEmailError, 'Проверьте адрес электронной почты'));
userFormInputPhone.addEventListener('blur', () => validateInput(phoneRegex, userFormInputPhone, userFormInputPhone.value.replace(/\D/g, ''), userFormInputPhoneError, 'Формат: +9 999 999 99 99'));
userFormInputTIN.addEventListener('blur', () => validateInput(tinRegex, userFormInputTIN, userFormInputTIN.value, userFormInputTINError, 'Проверьте ИНН'));

buttonOrder.addEventListener('click', () => orderButton());
buttonCloseOrderPopup.addEventListener('click', () => { popupOrder.classList.remove('popup_opened') });

