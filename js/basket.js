import { items } from "./data/itemsData.js";

const basketItems = document.querySelectorAll('.basket__item');
const basketMissingItems = document.querySelectorAll('.basket__missing-item');
const deliveryItems = document.querySelectorAll('.basket__form-delivery-item');
const totalOrderFinalPrice = document.querySelector('.total-final-price');
const totalOrderPrice = document.querySelector('.total-price');
const totalOrderSale = document.querySelector('.total-sale');
const totalOrderCount = document.querySelector('.total-count');
const totalOrderCountLabel = document.querySelector('.count-label_header');
const totalOrderCountLabelTabbar = document.querySelector('.count-label_tabbar');
const totalOrderCountHeader = document.querySelector('.basket__list-header-number');
const totalOrderFinalPriceHeader = document.querySelector('.basket__list-header-price');
const checkboxChooseAll = document.getElementById('select-all');
const missingItemsCount = document.querySelector('.missing-count');
const checkboxPayment = document.getElementById('payment-checkbox');
let orderFinalPrice = 2101063;

function deleteItem(item) {
  item.style.display = 'none';

  if (item.classList.contains('basket__item')) {
    items.splice(items.findIndex(x => x.id === item.dataset.id), 1)
    updateTotalOrderPrice();
    deleteDeliveryItem(item);

    if (items.length === 0) {
      document.querySelector(".delivery-date").remove();
    }

  } else {
    if (item.classList.contains('basket__missing-item')) {
      counter = parseInt(missingItemsCount.textContent, 10);
      counter--;
      missingItemsCount.textContent = counter;
    }
  }
}

function likeItem(button) {
  button.classList.toggle('basket__button-like_active');
}

function deleteDeliveryItem(item) {
  const deliveryItem = Array.from(deliveryItems).find(x => x.dataset.id === item.dataset.id);
  deliveryItem.remove();
}

function updateTotalItemPrice(item) {
  const finalPrice = item.querySelector('.final-price');
  const finalPriceMobile = item.querySelector('.final-price_mobile');
  const price = item.querySelector('.basket__item-price');
  const priceMobile = item.querySelector('.basket__item-price_mobile');

  const cost = items.find(x => x.id === item.dataset.id).price;
  const finalCost = items.find(x => x.id === item.dataset.id).finalPrice;
  const count = items.find(x => x.id === item.dataset.id).count;

  const totalFinalPrice = finalCost * count;
  const totalPrice = cost * count;

  finalPrice.textContent = totalFinalPrice;
  finalPriceMobile.textContent = totalFinalPrice;
  price.textContent = totalPrice + ' сом';
  priceMobile.textContent = totalPrice + ' сом';

  updateTotalOrderPrice();
};

function updateTotalOrderPrice() {
  orderFinalPrice = 0;
  let orderCount = 0;
  let orderPrice = 0;

  items.filter(x => x.checked).forEach(function (item) {
    orderCount += item.count;
    orderFinalPrice += item.finalPrice * item.count;
    orderPrice += item.price * item.count;
  })

  totalOrderFinalPrice.textContent = orderFinalPrice;
  totalOrderCount.textContent = orderCount;
  totalOrderCountLabel.textContent = orderCount;
  totalOrderCountLabelTabbar.textContent = orderCount;
  totalOrderPrice.textContent = orderPrice;
  totalOrderCountHeader.textContent = orderCount + ' товаров · ';
  totalOrderFinalPriceHeader.textContent = '\xa0' + orderFinalPrice + ' сом';
  totalOrderSale.textContent = orderPrice - orderFinalPrice;

  if (checkboxPayment.checked) {
    buttonOrder.textContent = 'Оплатить ' + orderFinalPrice + ' сом';
  } 
};

function updateItemDeliveryCount(item) {
  const deliveryItem = Array.from(deliveryItems).find(x => x.dataset.id === item.id);
  const countLabel = deliveryItem.querySelector('.count-label_item-delivery');
  let span = document.createElement(`span`);
  span.className = `count-label count-label_item-delivery`;
  span.innerHTML = `${item.count}`;
  
  if (countLabel) {
    if (item.count !== 1) { 
      countLabel.textContent = item.count;
    } else {
      countLabel.remove();
    }
  } else {
    deliveryItem.prepend(span);
  }
}

basketItems.forEach(function (item) {
  const counterMinus = item.querySelector('.counter__minus');
  const counterPlus = item.querySelector('.counter__plus');
  const counterNumber = item.querySelector('.counter__number');
  const buttonLike = item.querySelector('.basket__button-like');
  const buttonDelete = item.querySelector('.basket__button-delete');
  const itemAvailableCount = item.querySelector('.basket__item-left');
  const finalPrice = item.querySelector('.final-price');
  const checkbox = item.querySelector('.form__item'); 
  let index = items.findIndex(x => x.id === item.dataset.id);

  checkbox.addEventListener('click', function () {
    items[index].checked = checkbox.checked;
    checkboxChooseAll.checked = items.every(x => x.checked);
    updateTotalOrderPrice();
    updateItemDeliveryCount(items[index]);
  })
  
  counterMinus.addEventListener('click', function () {
    let currentCount = items[index].count;

    if (currentCount > 1) {
      currentCount--;
      items[index].count = currentCount;
      counterNumber.value = currentCount;
      updateTotalItemPrice(item);
      updateItemDeliveryCount(items[index]);
    }

    if (currentCount == 1) {
      counterMinus.style.color = 'rgba(0, 0, 0, 0.2)';
    }

    if (currentCount <= 95) {
      finalPrice.classList.remove('small');
    }

    if (currentCount < items[index].available) {
      counterPlus.style.color = 'black';
    }

    if (currentCount + 2 === items[index].available) {
      itemAvailableCount.textContent = `Осталось 2 шт.`;
    } 
    
    if (currentCount + 1 === items[index].available) {
      itemAvailableCount.textContent = `Осталось 1 шт.`;
    } else {
      itemAvailableCount.textContent = `  `;
    }

  });

  counterPlus.addEventListener('click', function () {
    counterMinus.style.color = 'black';

    let currentCount = items[index].count;

    if (currentCount === items[index].available) {
      return;
    }

    if (currentCount + 1 === items[index].available) {
      counterPlus.style.color = 'rgba(0, 0, 0, 0.2)';
      itemAvailableCount.textContent = `  `;
    }

    if (currentCount + 3 === items[index].available) {
      itemAvailableCount.textContent = `Осталось 2 шт.`;
    } 
    
    if (currentCount + 2 === items[index].available) {
      itemAvailableCount.textContent = `Осталось 1 шт.`;
    }

    currentCount++;
    items[index].count = currentCount;
    counterNumber.value = currentCount;
    updateTotalItemPrice(item);
    updateItemDeliveryCount(items[index]);    
    
    if (currentCount >= 95) {
      finalPrice.classList.add('small');
    }
  });

  counterNumber.addEventListener('input', function () {
    let currentCount = parseInt(counterNumber.value, 10);

    if (isNaN(currentCount)) {
      counterNumber.value = 1;
      items[index].count = 1;
      updateTotalItemPrice(item);
      updateItemDeliveryCount(items[index]);
      return;
    }

    if (currentCount < 1) {
      counterNumber.value = 1;
      items[index].count = 1;
    }

    if (currentCount == 1) {
      counterMinus.style.color = 'rgba(0, 0, 0, 0.2)';
    } else {
      counterMinus.style.color = 'black';
    }

    items[index].count = currentCount;
    updateTotalItemPrice(item);
    updateItemDeliveryCount(items[index]);
  });

  buttonLike.addEventListener('click', () => likeItem(buttonLike));
  buttonDelete.addEventListener('click', () => deleteItem(item));
});

basketMissingItems.forEach(function (item) {
  const buttonLike = item.querySelector('.basket__button-like');
  const buttonDelete = item.querySelector('.basket__button-delete');

  buttonLike.addEventListener('click', () => likeItem(buttonLike));
  buttonDelete.addEventListener('click', () => deleteItem(item));
});

checkboxChooseAll.addEventListener('click', function () {
  basketItems.forEach(function (item) {
    const checkbox = item.querySelector('.form__item');
    checkbox.checked = checkboxChooseAll.checked;
    let index = items.findIndex(x => x.id === item.dataset.id);
    if (index >= 0) {
      items[index].checked = checkboxChooseAll.checked;
    }
  })
  updateTotalOrderPrice();
});

checkboxPayment.addEventListener('click', function () {
  if (checkboxPayment.checked) {
    document.querySelector('.upon-receipt-payment').style.display = 'none';
    buttonOrder.textContent = 'Оплатить ' + orderFinalPrice + ' сом';
  } else {
    document.querySelector('.upon-receipt-payment').style.display = 'block';
    buttonOrder.textContent = 'Заказать';
  }
})