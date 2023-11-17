const basketItems = document.querySelectorAll('.basket__item');
const basketMissingItems = document.querySelectorAll('.basket__missing-item');
let itemCount = 0;

function deleteItem(item) {
  item.style.display = 'none';
}

function likeItem(button) {
  button.classList.toggle('basket__button-like_active');
}

function updateTotalPrice(item, count) {
  const cost = item.querySelector('.cost').textContent;
  const finalCost = item.querySelector('.final-cost').textContent;

  const finalPrice = item.querySelector('.final-price');
  const finalPriceMobile = item.querySelector('.final-price_mobile');
  const price = item.querySelector('.basket__item-price');
  const priceMobile = item.querySelector('.basket__item-price_mobile');

  const totalFinalPrice = finalCost * count;
  const totalPrice = cost * count;

  finalPrice.textContent = totalFinalPrice;
  finalPriceMobile.textContent = totalFinalPrice;

  price.textContent = totalPrice + ' сом';
  priceMobile.textContent = totalPrice + ' сом';
};

basketItems.forEach(function (item) {
  const counterMinus = item.querySelector('.counter__minus');
  const counterPlus = item.querySelector('.counter__plus');
  const counterNumber = item.querySelector('.counter__number');

  const buttonLike = item.querySelector('.basket__button-like');
  const buttonDelete = item.querySelector('.basket__button-delete');

  const finalPrice = item.querySelector('.final-price');

  counterMinus.addEventListener('click', function () {
    let currentCount = parseInt(counterNumber.value, 10);

    if (currentCount > 1) {
      currentCount--;
      counterNumber.value = currentCount;
      updateTotalPrice(item, currentCount);
    }

    if (currentCount == 1) {
      counterMinus.style.color = 'rgba(0, 0, 0, 0.2)';
    }

    if (currentCount <= 95) {
      finalPrice.classList.remove('small');
    }
  });

  counterPlus.addEventListener('click', function () {
    counterMinus.style.color = 'black';
    let currentCount = parseInt(counterNumber.value, 10);
    currentCount++;
    counterNumber.value = currentCount;
    updateTotalPrice(item, currentCount);
    if (currentCount >= 95) {
      finalPrice.classList.add('small');
    }
  });

  counterNumber.addEventListener('input', function () {
    let currentCount = parseInt(counterNumber.value, 10);
    if (currentCount < 1) {
      counterNumber.value = 1;
    }
    if (currentCount == 1) {
      counterMinus.style.color = 'rgba(0, 0, 0, 0.2)';
    } else {
      counterMinus.style.color = 'black';
    }
    updateTotalPrice(item, currentCount);
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