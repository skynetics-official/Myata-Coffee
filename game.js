let money = localStorage.getItem('money') || 0;
let reputation = localStorage.getItem('reputation') || 0;
let research = localStorage.getItem('research') || 0;
let maxReputation = 100;
let maxResearch = 500;

const ordersContainer = document.getElementById('orders');
const ingredientsList = document.getElementById('ingredients-list');
const warehouseItems = document.getElementById('warehouse-items');
const recipesList = document.getElementById('recipes-list');

function generateRandomOrder() {
    const clients = ['Маша', 'Дима', 'Антон'];
    const drinks = ['Эспрессо', 'Латте', 'Ванильный латте', 'Айс-латте', 'Мокка'];

    const clientName = clients[Math.floor(Math.random() * clients.length)];
    const drinkName = drinks[Math.floor(Math.random() * drinks.length)];

    return {
        client: clientName,
        drink: drinkName,
        time: Math.floor(Math.random() * 100) + 30, // Время между 30 и 130 секунд
        reward: Math.floor(Math.random() * 500) + 100, // Награда от 100 до 600 ₽
    };
}

function updateOrdersList() {
    ordersContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) { // Отображаем 3 заказа
        const order = generateRandomOrder();
        const orderElement = document.createElement('div');
        orderElement.classList.add('order');

        orderElement.innerHTML = `
            <span>${order.client}:</span>
            <span>${order.drink}</span>
            <span>Время: ${order.time} сек.</span>
            <span>Награда: ${order.reward} ₽</span>
        `;

        ordersContainer.appendChild(orderElement);
    }
}

function updateIngredientsList() {
    ingredientsList.innerHTML = '';
    for (let ingredient in ingredients) {
        if (ingredients.hasOwnProperty(ingredient)) {
            const ingredientElement = document.createElement('div');
            ingredientElement.classList.add('ingredient');
            ingredientElement.innerText = `${ingredient}: ${ingredients[ingredient]}`;
            ingredientsList.appendChild(ingredientElement);
        }
    }
}

function updateWarehouseItemsList() {
    warehouseItems.innerHTML = '';
    for (let item in warehouse) {
        if (warehouse.hasOwnProperty(item)) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('warehouse-item');
            itemElement.innerText = `${item}: ${warehouse[item]}`;
            warehouseItems.appendChild(itemElement);
        }
    }
}

function updateRecipesList() {
    recipesList.innerHTML = '';
    for (let recipe in recipes) {
        if (recipes.hasOwnProperty(recipe)) {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');
            recipeElement.innerText = `${recipe}`;
            recipesList.appendChild(recipeElement);
        }
    }
}

function checkIngredients(drink) {
    const requiredIngredients = drinkIngredients[drink];
    for (let ingredient of requiredIngredients) {
        if (!ingredients[ingredient] || ingredients[ingredient] === 0) {
            return false;
        }
    }
    return true;
}

function updateIngredients(ingredientsToRemove, ingredientsToAdd) {
    for (let ingredient in ingredientsToRemove) {
        if (ingredientsToRemove.hasOwnProperty(ingredient)) {
            ingredients[ingredient] -= ingredientsToRemove[ingredient];
        }
    }

    for (let ingredient in ingredientsToAdd) {
        if (ingredientsToAdd.hasOwnProperty(ingredient)) {
            ingredients[ingredient] += ingredientsToAdd[ingredient];
        }
    }

    localStorage.setItem('ingredients', JSON.stringify(ingredients));
}

function executeOrder(order) {
    const { drink, reward } = order;
    if (checkIngredients(drink)) {
        updateIngredients(drinkIngredients[drink], {});
        money += reward;
        reputation += Math.floor(reward * 0.1);
        research += Math.floor(reward * 0.2);
        updateStatus();
        alert(`Вы выполнили заказ! Вы получили ${reward} ₽`);
    } else {
        alert(`Ингредиенты для заказа ${drink} не хватает.`);
    }
}

function setupOrderListeners() {
    const orderElements = document.querySelectorAll('.order');
    orderElements.forEach(orderElement => {
        orderElement.addEventListener('click', () => {
            const orderData = orderElement.querySelector('span').innerText.split(':');
            const client = orderData[0].trim();
            const drink = orderData[1].trim();
            const time = parseInt(orderData[2].split(':')[1].trim());
            const reward = parseInt(orderData[3].split(':')[1].trim());

            if (new Date().getTime() - startOrderTime < time * 1000) {
                alert('Вы не успели выполнить заказ.');
            } else {
                executeOrder({ client, drink, time, reward });
            }
        });
    });
}

const ingredients = {
    'Кофейные зёрна': 10,
    'Молоко': 10,
    'Ванильный сироп': 5,
    'Шоколад': 3,
    'Лайм': 2,
    'Лёд': 8,
    'Выпечка': 4,
    'Клубника': 6,
    'Матча': 7,
    'Карамель': 9,
    'Кокосовое молоко': 5,
};

const drinkIngredients = {
    'Эспрессо': ['Кофейные зёрна'],
    'Латте': ['Кофейные зёрна', 'Молоко'],
    'Ванильный латте': ['Кофейные зёрна', 'Молоко', 'Ванильный сироп'],
    'Айс-латте': ['Кофейные зёрна', 'Молоко', 'Лёд'],
    'Мокка': ['Кофейные зёрна', 'Молоко', 'Шоколад'],
};

const warehouse = {
    'Кофейные зёрна': 10,
    'Молоко': 10,
    'Ванильный сироп': 5,
    'Шоколад': 3,
    'Лайм': 2,
    'Лёд': 8,
    'Выпечка': 4,
    'Клубника': 6,
    'Матча': 7,
    'Карамель': 9,
    'Кокосовое молоко': 5,
};

const recipes = {
    'Эспрессо': 100,
    'Латте': 200,
    'Ванильный латте': 300,
    'Айс-латте': 400,
    'Мокка': 500,
};

function updateStatus() {
    document.getElementById('money').innerText = money + ' ₽';
    document.getElementById('reputation').innerText = reputation;
    document.getElementById('maxReputation').innerText = maxReputation;
    document.getElementById('research').innerText = research;
    document.getElementById('maxResearch').innerText = maxResearch;
}

function saveGame() {
    localStorage.setItem('money', money);
    localStorage.setItem('reputation', reputation);
    localStorage.setItem('research', research);
    alert('Игра сохранена!');
}

function resetGame() {
    if (confirm('Вы уверены, что хотите сбросить прогресс?')) {
        localStorage.clear();
        money = 0;
        reputation = 0;
        research = 0;
        updateStatus();
        updateIngredients(ingredients, {});
        updateWarehouseItemsList();
        updateRecipesList();
        alert('Прогресс сброшен!');
    }
}

let startOrderTime = new Date().getTime();

setInterval(() => {
    updateOrdersList();
    setupOrderListeners();
    updateIngredientsList();
    updateWarehouseItemsList();
    updateRecipesList();
}, 3000);

updateStatus();
updateIngredientsList();
updateWarehouseItemsList();
updateRecipesList();
