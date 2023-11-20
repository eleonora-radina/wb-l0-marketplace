const buttonEditDelivery = document.querySelector('.basket__form-button_delivery');
const buttonEditPayment = document.querySelector('.basket__form-button_payment');
const buttonSidebarEditDelivery = document.querySelector('.sidebar__info-edit-button_delivery');
const buttonSidebarPaymentDelivery = document.querySelector('.sidebar__info-edit-button_payment');

const popupDeliveryForm = document.querySelector('.popup_delivery');
const popupPaymentForm = document.querySelector('.popup_payment');
const buttonCloseDeliveryPopup = document.querySelector('.popup_delivery .popup__button-exit');
const buttonClosePaymentPopup = document.querySelector('.popup_payment .popup__button-exit');

const buttonFreeReturnDelivery = document.querySelector('.basket__info-text_free');
const buttonFreeReturnDeliverySidebar = document.querySelector('.sidebar__info-text_free');
const tooltipFreeReturnDelivery = document.querySelector('.tooltip_free-delivery');
const tooltipFreeReturnDeliverySidebar = document.querySelector('.tooltip_sidebar-free-delivery');

const cardItems = document.querySelectorAll('.popup__payment-label');
const cardNumber = document.querySelector('.card-number');
const cardLogo = document.querySelector('.card-logo');
const buttonPayment = document.querySelector('.popup__button_payment');
const cardLogoSidebar = document.querySelector('.card-logo-sidebar');
const cardNumberSidebar = document.querySelector('.card-number-sidebar');
let numberInfo;
let logoInfo;
let addressInfo;

const shopDeliveryButton = document.querySelector('.popup__delivery-button_shop');
const courierDeliveryButton = document.querySelector('.popup__delivery-button_courier');
const shopAddresses = document.querySelector('.popup__delivery-addresses_shop');
const courierAddresses = document.querySelector('.popup__delivery-addresses_courier');
const buttonDelivery = document.querySelector('.popup__button_delivery');
const addressItems = document.querySelectorAll('.popup__address-label');
const choosenAddress = document.querySelector('.basket__form-address');
const choosenAddressSidebar = document.querySelector('.sidebar__info-address');


cardItems.forEach(function(item) {
  const card = item.querySelector('.popup__radio-input');
  const logo = item.querySelector('.popup__payment-logo');
  const number = item.querySelector('.popup__payment-number');

  card.addEventListener('click', function() {
    numberInfo = number.textContent;
    logoInfo = logo.src;
  });
})

addressItems.forEach(function(item) {
  const address = item.querySelector('.popup__form-address');

  address.addEventListener('click', function() {
    addressInfo = address.textContent;
  });
})

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const toggleTooltip = (tooltip) => {
  tooltip.classList.toggle('tooltip_opened');
}

const toggleAddresses = (button, hiddenButton, addresses, hiddenAddresses) => {
  button.classList.add('button_active');
  hiddenButton.classList.remove('button_active');
  hiddenAddresses.classList.add('hidden-addresses');
  addresses.classList.remove('hidden-addresses');
}

accordionButton.addEventListener('click', () => toggleAccordionList());
accordionMissingButton.addEventListener('click', () => toggleAccordionMissingList());

buttonEditDelivery.addEventListener('click', () => openPopup(popupDeliveryForm));
buttonEditPayment.addEventListener('click', () => openPopup(popupPaymentForm));
buttonSidebarEditDelivery.addEventListener('click', () => openPopup(popupDeliveryForm));
buttonSidebarPaymentDelivery.addEventListener('click', () => openPopup(popupPaymentForm));

buttonCloseDeliveryPopup.addEventListener('click', () => closePopup(popupDeliveryForm));
buttonClosePaymentPopup.addEventListener('click', () => closePopup(popupPaymentForm));

buttonFreeReturnDelivery.addEventListener('mouseover', () => toggleTooltip(tooltipFreeReturnDelivery));
buttonFreeReturnDelivery.addEventListener('mouseout', () => toggleTooltip(tooltipFreeReturnDelivery));
buttonFreeReturnDeliverySidebar.addEventListener('mouseover', () => toggleTooltip(tooltipFreeReturnDeliverySidebar));
buttonFreeReturnDeliverySidebar.addEventListener('mouseout', () => toggleTooltip(tooltipFreeReturnDeliverySidebar));

buttonPayment.addEventListener('click', function() {
  cardNumber.textContent = numberInfo;
  cardNumberSidebar.textContent = numberInfo;
  cardLogo.src = logoInfo;
  cardLogoSidebar.src = logoInfo;
  closePopup(popupPaymentForm);
})

buttonDelivery.addEventListener('click', function() {
  choosenAddress.textContent = addressInfo;
  choosenAddressSidebar.textContent = addressInfo;
  
  closePopup(popupDeliveryForm);
})

shopDeliveryButton.addEventListener('click', () => toggleAddresses(shopDeliveryButton, courierDeliveryButton, shopAddresses, courierAddresses));
courierDeliveryButton.addEventListener('click', () => toggleAddresses(courierDeliveryButton, shopDeliveryButton, courierAddresses, shopAddresses));
