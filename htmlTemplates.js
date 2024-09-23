function returnBasketHTML(dishs) {
    let formatedTotalPrice = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(dishs.totalPrice);
    let formatedItemPrice = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(dishs.Preis);
    return `<div class="basketItem">
            <h3>${dishs.name}</h3> 
                <div class="basketCalcArea">
                    <div class="amountChange">
                        <img src="./img/plusBtn.png" class="basketBtns" onclick="amountUp(${dishs.GerichtNr})">
                        <span>${dishs.amount} Stk. je ${formatedItemPrice}</span>
                        <img src="./img/minusBtn.png" class="basketBtns" onclick="amountDown(${dishs.GerichtNr})"> 
                    </div>
                    <span class="totalItemPrice">= ${formatedTotalPrice}</span>
                </div>
            </div>`
}

function DishListHTML(dish, formatedPrice) {
    return `<div class="foodInfoBox">
                <div class="dishNameAndImg">
                    <h2>${dish.name}</h2>
                    <img src="${dish.image}" alt="" class="foodImage">
                </div>
                <div class="descriptionAndPrice">
                    <ul>
                        <li>Zutaten: ${dish.Zutaten}</li>
                        <li>Preis: ${formatedPrice}</li>
                    </ul>
                    <div class="orderInput">
                        <input type="number" value="1" id="amountInput${dish.GerichtNr}" min="1" class="amountInput">
                        X
                        <button onclick="addToBasket(${dish.GerichtNr}, '${formatedPrice}')" class="orderBtn">Bestellen</button>
                    </div>
                </div>
            </div>
            `
}

function returnPriceHTML(totalBasketValue) {
    let formatedBasketPrice = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalBasketValue);
    return `<span id="subTotalSpan">Zwischensumme</span>
            <span id="subTotal">${formatedBasketPrice}</span>`;
}

function returnPriceDeliverHTML(totalBasketValue) {
    let totalTotalPrice = totalBasketValue + 2;
    let formatedTotalTotal = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalTotalPrice);
    return `<span id="totalSpan">Gesamtpreis</span>
            <span id="total">${formatedTotalTotal}</span>`;
}
