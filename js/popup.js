const buttonEditDelivery = document.querySelector('.basket__form-button_delivery');
const buttonEditPayment = document.querySelector('.basket__form-button_payment');
const buttonSidebarEditDelivery = document.querySelector('.sidebar__info-edit-button_delivery');
const buttonSidebarPaymentDelivery = document.querySelector('.sidebar__info-edit-button_payment');
const buttonCloseDeliveryPopup = document.querySelector('.popup_delivery .popup__button-exit');
const buttonClosePaymentPopup = document.querySelector('.popup_payment .popup__button-exit');
const buttonFreeReturnDelivery = document.querySelector('.basket__info-text_free');
const buttonFreeReturnDeliverySidebar = document.querySelector('.sidebar__info-text_free');
const buttonShopDelivery = document.querySelector('.popup__delivery-button_shop');
const buttonCourierDelivery = document.querySelector('.popup__delivery-button_courier');
const buttonPayment = document.querySelector('.popup__button_payment');
const buttonDelivery = document.querySelector('.popup__button_delivery');

const popupDeliveryForm = document.querySelector('.popup_delivery');
const popupPaymentForm = document.querySelector('.popup_payment');
const tooltipFreeReturnDelivery = document.querySelector('.tooltip_free-delivery');
const tooltipFreeReturnDeliverySidebar = document.querySelector('.tooltip_sidebar-free-delivery');

const cardItems = document.querySelectorAll('.popup__payment-label');
const addressItems = document.querySelectorAll('.popup__address-label');
const popupDeliveryItem = document.querySelectorAll('.popup__form-radio');

const cardNumber = document.querySelector('.card-number');
const cardLogo = document.querySelector('.card-logo');
const cardLogoSidebar = document.querySelector('.card-logo-sidebar');
const cardNumberSidebar = document.querySelector('.card-number-sidebar');

const shopAddresses = document.querySelector('.popup__delivery-addresses_shop');
const courierAddresses = document.querySelector('.popup__delivery-addresses_courier');
const choosenAddress = document.querySelector('.basket__form-address');
const choosenAddressSidebar = document.querySelector('.sidebar__info-address');
const deliveryTitle = document.querySelector('.delivery-title');
const sidebarDeliveryTitle = document.querySelector('.sidebar-delivery-title');
const deliveryRating = document.querySelector('.delivery-shop-info');

let numberInfo;
let logoInfo;
let isCourier;

const openPopup = (popup) => {
  document.querySelectorAll('input[name="address"]')[0].checked = true;
  document.querySelectorAll('input[name="shop"]')[0].checked = true;
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const toggleTooltip = (tooltip) => {
  tooltip.classList.toggle('tooltip_opened');
}

const toggleAddresses = (button, hiddenButton, addresses, hiddenAddresses, courier) => {
  button.classList.add('button_active');
  hiddenButton.classList.remove('button_active');
  hiddenAddresses.classList.add('hidden-addresses');
  addresses.classList.remove('hidden-addresses');
  isCourier = courier;
}

const updateAddress = () => {
  let addressInfo;

  if (isCourier) {
    addressInfo = document.querySelector('input[name="address"]:checked').value;
    deliveryTitle.textContent = 'Доставка курьером';
    sidebarDeliveryTitle.textContent = 'Доставка курьером';
    deliveryRating.style.display = 'none';
  } else {
    addressInfo = document.querySelector('input[name="shop"]:checked').value;
    deliveryTitle.textContent = 'Пункт выдачи';
    sidebarDeliveryTitle.textContent = 'Доставка в пункт выдачи';
    deliveryRating.style.display = 'flex';
  }

  choosenAddress.textContent = addressInfo;
  choosenAddressSidebar.textContent = addressInfo;
}

const updatePaymentMethod = () => {
  cardNumber.textContent = numberInfo;
  cardNumberSidebar.textContent = numberInfo;
  cardLogo.src = logoInfo;
  cardLogoSidebar.src = logoInfo;
}

popupDeliveryItem.forEach(item => {
  const buttonDelete = item.querySelector('.popup__button-delete');
  buttonDelete.addEventListener('click', () => item.remove());
})

cardItems.forEach(item => {
  const card = item.querySelector('.popup__radio-input');
  const logo = item.querySelector('.popup__payment-logo');
  const number = item.querySelector('.popup__payment-number');

  card.addEventListener('click', () => {
    numberInfo = number.textContent;
    logoInfo = logo.src;
  });
})

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

buttonShopDelivery.addEventListener('click', () => toggleAddresses(buttonShopDelivery, buttonCourierDelivery, shopAddresses, courierAddresses, false));
buttonCourierDelivery.addEventListener('click', () => toggleAddresses(buttonCourierDelivery, buttonShopDelivery, courierAddresses, shopAddresses, true));

buttonPayment.addEventListener('click', () => {
  updatePaymentMethod();
  closePopup(popupPaymentForm);
})

buttonDelivery.addEventListener('click', () => {
  updateAddress();
  closePopup(popupDeliveryForm);
})