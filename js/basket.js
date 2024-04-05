import { items as itemsData } from "./data/itemsData.js";

const basketItems = document.querySelectorAll('.basket__item');
const basketMissingItems = document.querySelectorAll('.basket__missing-item');
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
    itemsData.splice(itemsData.findIndex(x => x.id === item.dataset.id), 1)
    console.log(itemsData);
    updateTotalOrderPrice();
    updateDeliveryDates();

    if (itemsData.length === 0) {
      document.querySelector(".delivery-date-title").remove();
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

function updateTotalItemPrice(item) {
  const finalPrice = item.querySelector('.final-price');
  const finalPriceMobile = item.querySelector('.final-price_mobile');
  const price = item.querySelector('.basket__item-price');
  const priceMobile = item.querySelector('.basket__item-price_mobile');

  const cost = itemsData.find(x => x.id === item.dataset.id).price;
  const finalCost = itemsData.find(x => x.id === item.dataset.id).finalPrice;
  const count = itemsData.find(x => x.id === item.dataset.id).count;

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

  itemsData.filter(x => x.checked).forEach(function (item) {
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

function updateDeliveryDates() {

  let checkedItems = itemsData.filter(x => x.checked);
  console.log(checkedItems);
  let productsToDelivery = checkedItems.map((item) => {
      let a = item.count;
      const availableDates = item.deliveryDateAmounts.filter(x => {
          var result = a > 0;
          a = item.count - x.amount;
          return result;
      });
  
      return { id: item.id, count: item.count, availableDates };
  })
  
  let deliveryDates = [];
  productsToDelivery.forEach(product => {
    product.availableDates.forEach(date => {

      let productToAdd = {...product};
      productToAdd.count = date.amount > product.count ? product.count : date.amount;
      product.count -= date.amount;

      let currentdate = deliveryDates.findIndex(x => x.date === date.date);
      if (currentdate === -1) {
        deliveryDates.push({
          date: date.date, products: [productToAdd]
        })
      } else {
        deliveryDates[currentdate].products.push(productToAdd);
      }
    }
    )
  })  

  document.querySelectorAll('.delivery-date').forEach(x => x.remove());

  deliveryDates.forEach(date => {

    let productsBlock = date.products.map(product => {
      let divDeliveryItem = document.createElement(`div`);
      divDeliveryItem.className = `basket__form-delivery-item`;
      divDeliveryItem.setAttribute('data-id', product.id)

      if (product.count > 1) {
        divDeliveryItem.innerHTML = `
          <span class="count-label count-label_item-delivery">${product.count}</span>
          <img class="basket__form-delivery-photo" src="./images/item${product.id}.jpg" alt="item${product.id}">
        `;
      } else {
        divDeliveryItem.innerHTML = `
        <img class="basket__form-delivery-photo" src="./images/item${product.id}.jpg" alt="item${product.id}">`;
      }
      return divDeliveryItem.outerHTML;
    }).join('');

    let divDeliveryDate = document.createElement(`div`);
    divDeliveryDate.className = `basket__form-info-item delivery-date`;
    divDeliveryDate.innerHTML = `
      <p class="basket__form-info-title delivery-date-title">${date.date}</p>
      <div class="basket__form-delivery-photos">
        ${productsBlock}
      </div>
    `;
    document.querySelector('.basket__form-delivery-price').before(divDeliveryDate);
  });
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
  let itemData = itemsData.find(x => x.id === item.dataset.id);

  checkbox.addEventListener('click', function () {
    itemData.checked = checkbox.checked;
    checkboxChooseAll.checked = itemsData.every(x => x.checked);
    updateTotalOrderPrice();
    updateDeliveryDates();
  })

  counterMinus.addEventListener('click', function () {
    let currentCount = itemData.count;

    if (currentCount > 1) {
      currentCount--;
      itemData.count = currentCount;
      counterNumber.value = currentCount;
      updateTotalItemPrice(item);
      updateDeliveryDates();
    }

    if (currentCount == 1) {
      counterMinus.style.color = 'rgba(0, 0, 0, 0.2)';
    }

    if (currentCount <= 95) {
      finalPrice.classList.remove('small');
    }

    if (currentCount < itemData.available) {
      counterPlus.style.color = 'black';
    }

    if (currentCount + 2 === itemData.available) {
      itemAvailableCount.textContent = `Осталось 2 шт.`;
    }

    if (currentCount + 1 === itemData.available) {
      itemAvailableCount.textContent = `Осталось 1 шт.`;
    } else {
      itemAvailableCount.textContent = `  `;
    }

  });

  counterPlus.addEventListener('click', function () {
    counterMinus.style.color = 'black';

    let currentCount = itemData.count;

    if (currentCount === itemData.available) {
      return;
    }

    if (currentCount + 1 === itemData.available) {
      counterPlus.style.color = 'rgba(0, 0, 0, 0.2)';
      itemAvailableCount.textContent = `  `;
    }

    if (currentCount + 3 === itemData.available) {
      itemAvailableCount.textContent = `Осталось 2 шт.`;
    }

    if (currentCount + 2 === itemData.available) {
      itemAvailableCount.textContent = `Осталось 1 шт.`;
    }

    currentCount++;
    itemData.count = currentCount;
    counterNumber.value = currentCount;
    updateTotalItemPrice(item);
    updateDeliveryDates();

    if (currentCount >= 95) {
      finalPrice.classList.add('small');
    }
  });

  counterNumber.addEventListener('input', function () {
    let currentCount = parseInt(counterNumber.value, 10);

    if (isNaN(currentCount)) {
      counterNumber.value = 1;
      itemData.count = 1;
      updateTotalItemPrice(item);
      updateDeliveryDates();
      return;
    }

    if (currentCount < 1) {
      counterNumber.value = 1;
      itemData.count = 1;
    }

    if (currentCount == 1) {
      counterMinus.style.color = 'rgba(0, 0, 0, 0.2)';
    } else {
      counterMinus.style.color = 'black';
    }

    itemData.count = currentCount;
    updateTotalItemPrice(item);
    updateDeliveryDates();
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
    let index = itemsData.findIndex(x => x.id === item.dataset.id);
    if (index >= 0) {
      itemData.checked = checkboxChooseAll.checked;
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