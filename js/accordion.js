const accordionButton = document.querySelector('.basket__list-icon');
const accordionList = document.querySelector('.basket__list-zone');
const accordionCheckbox = document.querySelector('.form__label');
const accordionItems = document.querySelector('.basket__list-header-items');
const basketListHeader = document.querySelector('.basket__list-header');

const accordionMissingButton = document.querySelector('.basket__list-icon_missing');
const accordionMissingList = document.querySelector('.basket__list-zone_missing');
const basketMissingList = document.querySelector('.basket__missing-list');

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
  