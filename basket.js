function checkLocalBasket() {
    let basket = document.getElementById('itemList')
    let itemList = food.filter((element) => { return element['Warenkorb'] });
    if (itemList.length === 0) {
        document.getElementById('basket').classList.toggle('dNone');
        document.getElementById('basket2').classList.toggle('dNone');
        document.getElementById('overlay').classList.add('dNone');

    } else {
        renderBasket(itemList);
        calculateTotalPrice(itemList, basket);
        document.getElementById('basket').classList.remove('dNone');
        document.getElementById('basket2').classList.remove('dNone');
    }
}

function calculateTotalPrice(itemList) {
    let Price = document.getElementById('totalPrice');
    let PriceWithDeliver = document.getElementById('totalPriceWithDeliver');
    let Price2 = document.getElementById('totalPrice2');
    let PriceWithDeliver2 = document.getElementById('totalPriceWithDeliver2');
    let totalBasketValue = 0;
    for (let index = 0; index < itemList.length; index++) {
        const addedTotal = parseFloat(itemList[index].totalPrice);
        totalBasketValue = totalBasketValue + addedTotal;
    }
    Price.innerHTML = returnPriceHTML(totalBasketValue);
    PriceWithDeliver.innerHTML = returnPriceDeliverHTML(totalBasketValue);
    Price2.innerHTML = returnPriceHTML(totalBasketValue);
    PriceWithDeliver2.innerHTML = returnPriceDeliverHTML(totalBasketValue);
}

function addToBasket(index) {
    let dishs = food[index];
    dishs.Warenkorb = true;
    calculateAmount(dishs, index);
    calculatePricePerItem(dishs);
    setArrayToLocal('food', food);
    checkLocalBasket();
}

function amountDown(index) {
    food[index].amount--;
    dishs = food[index];
    if (dishs.amount === 0) {
        dishs.Warenkorb = false
        calculatePricePerItem(dishs);
        setArrayToLocal('food', food);
        checkLocalBasket();
    } else {
        calculatePricePerItem(dishs);
        setArrayToLocal('food', food);
        checkLocalBasket();
    }
}

function amountUp(index) {
    food[index].amount++;
    dishs = food[index];
    calculatePricePerItem(dishs);
    setArrayToLocal('food', food);
    checkLocalBasket();
}

function calculateAmount(dishs, index) {
    const savedAmount = parseInt(dishs.amount);
    const inputAmount = parseInt(document.getElementById(`amountInput${index}`).value);
    dishs.amount = savedAmount + inputAmount;
}

function renderBasket(itemList) {
    let basket = document.getElementById('itemList');
    let basket2 = document.getElementById('itemList2');
    basket.innerHTML = '';
    basket2.innerHTML = '';
    document.getElementById('basketHeadline').classList.remove('dNone');
    document.getElementById('totalCalc').classList.remove('dNone');
    document.getElementById('sendOrder').classList.remove('dNone');
    document.getElementById('totalCalc2').classList.remove('dNone');
    document.getElementById('sendOrder2').classList.remove('dNone');
    for (let index = 0; index < itemList.length; index++) {
        const listItems = itemList[index];
        basket.innerHTML += returnBasketHTML(listItems);
        basket2.innerHTML += returnBasketHTML(listItems);
    }
}

function calculatePricePerItem(dishs) {
    let calculatedItemPrice = dishs.Preis * dishs.amount;
    dishs.totalPrice = calculatedItemPrice;
}

function sendOrder() {
    let basket = document.getElementById('itemList');
    let basket2 = document.getElementById('itemList2');
    document.getElementById('basketHeadline').classList.toggle('dNone');
    document.getElementById('totalCalc').classList.toggle('dNone');
    document.getElementById('sendOrder').classList.toggle('dNone');
    document.getElementById('totalCalc2').classList.toggle('dNone');
    document.getElementById('sendOrder2').classList.toggle('dNone');
    basket.innerHTML = '<span id="delivery"> Ihre Bestellung ist unterwegs!</span>';
    basket2.innerHTML = '<span id="delivery"> Ihre Bestellung ist unterwegs!</span>';
    deleteBasket();
}

function deleteBasket() {
    let itemList = food.filter((element) => { return element['Warenkorb'] });
    for (let index = 0; index < itemList.length; index++) {
        const element = itemList[index];
        food[element.GerichtNr].amount = 0;
        food[element.GerichtNr].totalPrice = 0;
        food[element.GerichtNr].Warenkorb = false;
    }
    setArrayToLocal('food', food);
}

function closeOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.toggle('dNone');
    document.getElementById('body').classList.remove('hideOverflow');
}

function openOverlayBasket() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('dNone');
    document.getElementById('body').classList.add('hideOverflow');
}

