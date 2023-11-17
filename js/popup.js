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

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

const toggleTooltip = (tooltip) => {
  tooltip.classList.toggle('tooltip_opened');
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