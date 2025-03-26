const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let capybara = {
    x: 50,
    y: 50,
    width: 150,
    height: 130,
    speed: 15,
    image: new Image()
};

// Загружаем изображение капибары
capybara.image.src = 'https://static.donationalerts.ru/uploads/images/7511609/ca69f09c152c8267136dcba3000ab6d7.jpeg';

function drawCapybara() {
    ctx.drawImage(capybara.image, capybara.x, capybara.y, capybara.width, capybara.height);
}

function drawBorder() {
    ctx.strokeStyle = 'black'; // Цвет границы
    ctx.lineWidth = 5; // Ширина границы
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Рисуем границу
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас
    drawBorder(); // Рисуем границу
    drawCapybara(); // Рисуем капибару
}



let coins = [];
const coinSize = 20; // размер монетки

// Функция для генерации новой монеты
function createCoin() {
    const coin = {
        x: Math.random() * (canvas.width - coinSize),
        y: Math.random() * (canvas.height - coinSize),
        width: coinSize,
        height: coinSize
    };
    coins.push(coin);
}

// Функция для проверки сбора монеток
function collectCoins() {
    for (let i = coins.length - 1; i >= 0; i--) {
        const coin = coins[i];
        if (
            capybara.x < coin.x + coin.width &&
            capybara.x + capybara.width > coin.x &&
            capybara.y < coin.y + coin.height &&
            capybara.y + capybara.height > coin.y
        ) {
            coins.splice(i, 1); // Удаляем собранную монетку
            // Здесь можно увеличить счёт
        }
    }
}

// Обновляем функцию moveCapybara
function moveCapybara(event) {
    switch (event.key) {
        // Ваши существующие управляющие команды
        case 'ArrowUp':
            if (capybara.y - capybara.speed >= 0) {
                capybara.y -= capybara.speed;
            }
            break;
        case 'ArrowDown':
            if (capybara.y + capybara.height + capybara.speed <= canvas.height) {
                capybara.y += capybara.speed;
            }
            break;
        case 'ArrowLeft':
            if (capybara.x - capybara.speed >= 0) {
                capybara.x -= capybara.speed;
            }
            break;
        case 'ArrowRight':
            if (capybara.x + capybara.width + capybara.speed <= canvas.width) {
                capybara.x += capybara.speed;
            }
            break;
    }
    collectCoins(); // Проверка на сбор монеток
    update();
}

// Генерация монеток каждые 2 секунды
setInterval(createCoin, 2000);



document.addEventListener('keydown', moveCapybara);
capybara.image.onload = update; // Обновляем игру после загрузки изображения



