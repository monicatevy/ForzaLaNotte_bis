const gameBoard = document.getElementById('game-board');
const nameInput = document.getElementById('name-input');
const shuffleBtn = document.getElementById('shuffle-btn');

let cards = [];
let selectedCards = [];
let matchedPairs = 0;

// Generate cards
const generateCards = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    cards = [...alphabet.split(''), ...alphabet.split('')].map((letter) => ({
        letter,
        id: Math.random(),
    }));
    shuffle(cards);
};

// Shuffle cards
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

// Render cards
const renderCards = () => {
    gameBoard.innerHTML = '';
    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden');
        cardElement.dataset.id = card.id;
        cardElement.dataset.letter = card.letter;
        cardElement.innerText = card.letter;
        gameBoard.appendChild(cardElement);
    });
};

// Show cards temporarily
const showAllCards = () => {
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.remove('hidden');
        card.classList.add('revealed');
    });
};

// Hide all cards
const hideAllCards = () => {
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.remove('revealed');
        card.classList.add('hidden');
    });
};

// Handle card click
const handleCardClick = (e) => {
    const card = e.target;
    if (card.classList.contains('hidden') && selectedCards.length < 2) {
        card.classList.remove('hidden');
        card.classList.add('revealed');
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
};

// Check for a match
const checkMatch = () => {
    const [first, second] = selectedCards;
    if (first.dataset.letter === second.dataset.letter) {
        nameInput.value += first.dataset.letter;
        matchedPairs++;
        selectedCards = [];
        if (matchedPairs === 26) {
            alert('Félicitations ! Vous avez terminé.');
        }
    } else {
        setTimeout(() => {
            first.classList.add('hidden');
            first.classList.remove('revealed');
            second.classList.add('hidden');
            second.classList.remove('revealed');
            selectedCards = [];
        }, 1000);
    }
};

// Attach click events to all cards
const attachCardClickEvents = () => {
    document.querySelectorAll('.card').forEach((card) => {
        card.removeEventListener('click', handleCardClick); // Prevent duplicate events
        card.addEventListener('click', handleCardClick);
    });
};

// Shuffle cards when button is clicked
shuffleBtn.addEventListener('click', () => {
    shuffle(cards);
    renderCards();
    showAllCards();
    setTimeout(() => {
        hideAllCards();
        attachCardClickEvents(); // Reattach click events
    }, 3000);
});

// Initialize game
const initGame = () => {
    generateCards();
    renderCards();

    // Show all cards for 3 seconds
    showAllCards();
    setTimeout(() => {
        hideAllCards();
        attachCardClickEvents(); // Attach events after hiding cards
    }, 3000);

    // Add click events after cards are hidden
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) =>
            card.addEventListener('click', handleCardClick)
        );
    }, 3000);
};

// Start the game
initGame();