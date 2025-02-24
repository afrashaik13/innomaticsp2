let timer;
let timeLeft = 30;
let score = 0;
let flippedCards = [];
let matchedPairs = 0;
const flipSound = new Audio('flip.wav');
const matchSound = new Audio('pop.mp3');
const gameOverSound = new Audio('game-over.mp3');
function startGame(category) {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    initializeGrid(category);
    startTimer();
}
function initializeGrid(category) {
    const items = {
        fruits: ['🍎', '🍌', '🍇', '🍉', '🍎', '🍌', '🍇', '🍉'],
        emojis: ['😀', '😂', '😍', '😎', '😀', '😂', '😍', '😎'],
        animals: ['🐶', '🐱', '🐭', '🐰', '🐶', '🐱', '🐭', '🐰'],
        planets: ['🌍', '🌕', '🪐', '☀️', '🌍', '🌕', '🪐', '☀️'],
        flags: ['🇺🇸', '🇬🇧', '🇨🇦', '🇩🇪', '🇺🇸', '🇬🇧', '🇨🇦', '🇩🇪']
    };
    let grid = document.getElementById('grid');
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    let shuffledItems = items[category].sort(() => Math.random() - 0.5);
    shuffledItems.forEach(item => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = item;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
}
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        flipSound.play();
        card.innerText = card.dataset.value;
        card.classList.add('flipped');
        flippedCards.push(card);
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}
function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchSound.play();
        score += 10;
        matchedPairs++;
        document.getElementById('score').innerText = `Score: ${score}`;
        card1.onclick = null;
        card2.onclick = null;
    } else {
        card1.innerText = '';
        card2.innerText = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
    
    if (matchedPairs === 4) {
        clearInterval(timer);
        alert(`You win! Final Score: ${score}`);
    }
}
function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
        } else {
            clearInterval(timer);
            gameOverSound.play();
            alert('Game Over!');
        }
    }, 1000);
}
function restartGame() {
    location.reload();
}
function toggleSound() {
    alert('Sound toggled (feature to be implemented).');
}
function saveGame() {
    alert('Game saved (feature to be implemented).');
}
function loadGame() {
    alert('Game loaded (feature to be implemented).');
}
