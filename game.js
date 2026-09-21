const ordersContainer = document.getElementById('orders');

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

setInterval(updateOrdersList, 3000); // Обновляем заказы каждые 3 секунды
