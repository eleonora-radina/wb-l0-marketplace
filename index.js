const accordionButton = document.querySelector('.basket__list-icon');
const accordionList = document.querySelector('.basket__list-zone');
const accordionCheckbox = document.querySelector('.form__label');
const accordionItems = document.querySelector('.basket__list-header-items');
const basketListHeader = document.querySelector('.basket__list-header');

const accordionMissingButton = document.querySelector('.basket__list-icon_missing');
const accordionMissingList = document.querySelector('.basket__list-zone_missing');
const basketMissingList = document.querySelector('.basket__missing-list');

const buttonEditDelivery = document.querySelector('.basket__form-button_delivery');
const buttonEditPayment = document.querySelector('.basket__form-button_payment');
const buttonSidebarEditDelivery = document.querySelector('.sidebar__info-edit-button_delivery');
const buttonSidebarPaymentDelivery = document.querySelector('.sidebar__info-edit-button_payment');

const popupDeliveryForm = document.querySelector('.popup_delivery');
const popupPaymentForm = document.querySelector('.popup_payment');
const buttonCloseDeliveryPopup = document.querySelector('.popup_delivery .popup__button-exit');
const buttonClosePaymentPopup = document.querySelector('.popup_payment .popup__button-exit');


const toggleAccordionList = () => {
  accordionList.classList.toggle('hidden');
  accordionButton.classList.toggle('rotated');
  accordionCheckbox.classList.toggle('hidden');
  accordionItems.classList.toggle('hidden');
  basketListHeader.classList.toggle('line');
}

const toggleAccordionMissingList = () => {
  accordionMissingList.classList.toggle('hidden');
  accordionMissingButton.classList.toggle('rotated');
  basketMissingList.classList.toggle('hidden-missing-list');
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

accordionButton.addEventListener('click', () => toggleAccordionList());
accordionMissingButton.addEventListener('click', () => toggleAccordionMissingList());

buttonEditDelivery.addEventListener('click', () => openPopup(popupDeliveryForm));
buttonEditPayment.addEventListener('click', () => openPopup(popupPaymentForm));
buttonSidebarEditDelivery.addEventListener('click', () => openPopup(popupDeliveryForm));
buttonSidebarPaymentDelivery.addEventListener('click', () => openPopup(popupPaymentForm));

buttonCloseDeliveryPopup.addEventListener('click', () => closePopup(popupDeliveryForm));
buttonClosePaymentPopup.addEventListener('click', () => closePopup(popupPaymentForm));
