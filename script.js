

function init() {
    SetOrGetFoodFromLocal()
    getMainDish()
    checkLocalBasket()
}



function SetOrGetFoodFromLocal() {
    if (localStorage.getItem('food')) {
        food = JSON.parse(localStorage.getItem('food'));
    } else {
        setArrayToLocal('food', food)
    }
}

function getMainDish() {
    let mainDishBtn = document.getElementById('mainDishs')
    let sideDishBtn = document.getElementById('sideDishs')
    let drinksBtn = document.getElementById('drinks')
    toggleActiveButton(mainDishBtn, sideDishBtn, drinksBtn); 
    content.innerHTML = ``
    let mainDishes = food.filter((element) => { return element['category'] == 'Hauptgericht' });
    renderDishes(mainDishes);
}

function getSideDish() {
    content.innerHTML = ``
    let mainDishBtn = document.getElementById('mainDishs')
    let drinksBtn = document.getElementById('drinks')
    let sideDishBtn = document.getElementById('sideDishs')
    toggleActiveButton(sideDishBtn, drinksBtn, mainDishBtn); 
    let sideDishes = food.filter((element) => { return element['category'] == 'Beilage' });
    renderDishes(sideDishes);
}

function getDrinks() {
    content.innerHTML = ``
    let mainDishBtn = document.getElementById('mainDishs')
    let drinksBtn = document.getElementById('drinks')
    let sideDishBtn = document.getElementById('sideDishs')
    toggleActiveButton(drinksBtn, sideDishBtn, mainDishBtn);
    let drinks = food.filter((element) => { return element['category'] == 'Getränke' });
    renderDishes(drinks);
}

function toggleActiveButton(Activebutton, button2, button3) {
    if (Activebutton.classList.length == 2) {
    } else {
        Activebutton.classList.toggle('basketBtnsActive');
        button2.classList.remove('basketBtnsActive');
        button3.classList.remove('basketBtnsActive');
    }
}

function renderDishes(array) {
    let content = document.getElementById('content');
    for (let index = 0; index < array.length; index++) {
        const dish = array[index];
        let price = array[index].Preis
        formatPrice(price, dish, index)
    }
}

function formatPrice(price, dish, index) {
    let formatedPrice = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
    content.innerHTML += DishListHTML(dish, formatedPrice, index);
}

function setArrayToLocal(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

