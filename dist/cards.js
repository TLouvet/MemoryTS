"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCards = void 0;
const gamelogic_1 = require("./gamelogic");
const store_1 = require("./store");
function generateCards() {
    const cardSection = document.getElementById('cards');
    if (cardSection) {
        cardSection.replaceChildren(); // Empty html code 
        const nbrOfCards = +((0, store_1.getStoreProperty)("nbrOfCards") || 0);
        const values = generateCardsValues(nbrOfCards);
        populateCards(cardSection, values, nbrOfCards);
    }
}
exports.generateCards = generateCards;
function populateCards(htmlContainer, values, nbrOfCards) {
    for (let i = 0; i < nbrOfCards; i++) {
        const index = Math.floor(Math.random() * values.length);
        const selectedValue = values[index];
        const id = `card-${i}`;
        const card = createCard(selectedValue, id);
        htmlContainer.appendChild(card);
        values.splice(index, 1);
    }
}
function generateCardsValues(nbrOfCards) {
    const values = [];
    for (let i = 0; i < nbrOfCards / 2; i++) {
        values.push(i, i);
    }
    return values;
}
function createCard(value, id) {
    const card = document.createElement('article');
    card.setAttribute('class', "card");
    card.setAttribute('id', id);
    card.innerText = String(value);
    card.addEventListener('click', handleCardClick);
    return card;
}
function handleCardClick(e) {
    const currentCounter = +((0, store_1.getStoreProperty)('currentShownCards') || 0);
    const canPlayerClick = (0, store_1.getStoreProperty)('canClick') === "true" ? true : false;
    const classes = e.target.classList;
    if (classes.contains("invisible") || !canPlayerClick) {
        return;
    }
    const isCardRevealed = classes.contains('unfold');
    if (!isCardRevealed) {
        (0, store_1.updateStoreProperty)("currentShownCards", String(currentCounter + 1));
        classes.add("unfold");
        (0, gamelogic_1.verifyCurrentCounter)();
    }
}
