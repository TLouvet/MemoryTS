(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./gamelogic":3,"./store":6}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAIT_TIME = exports.CARDS_NUMBERS = void 0;
// options for the number of cards to find by the player
exports.CARDS_NUMBERS = [2, 4, 6, 8, 10, 12, 14, 16];
// delay applied when two cards are unfolded
exports.WAIT_TIME = 750;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCurrentCounter = void 0;
const constants_1 = require("./constants");
const modal_1 = require("./modal");
const store_1 = require("./store");
/**
 * Updates the counter value when a player clicks on card, allowing for game state verification
 */
function verifyCurrentCounter() {
    const currentCounter = +((0, store_1.getStoreProperty)('currentShownCards') || 0);
    if (currentCounter === 2) {
        (0, store_1.updateStoreProperty)("currentShownCards", '0');
        (0, store_1.updateStoreProperty)("canClick", "false");
        const cards = document.querySelectorAll('.unfold');
        if (cards.length !== 2) {
            return; // sometimes this error happens, but why...
        }
        setTimeout(() => {
            cards.forEach(card => card.classList.remove('unfold'));
            if (cards[0].innerText === cards[1].innerText) {
                cards.forEach(card => card.classList.add('invisible'));
                verifyWin();
            }
            else {
                incrementScore();
            }
            (0, store_1.updateStoreProperty)("canClick", "true");
        }, constants_1.WAIT_TIME);
    }
}
exports.verifyCurrentCounter = verifyCurrentCounter;
/**
 * Wrong guess
 */
function incrementScore() {
    const score = +((0, store_1.getStoreProperty)('score') || 0);
    (0, store_1.updateStoreProperty)('score', String(score + 1));
}
/**
 * When the player has unfolded two cards with the same value, we check if all the pairs are found
 */
function verifyWin() {
    const nbrOfCards = +((0, store_1.getStoreProperty)('nbrOfCards') || 0);
    const foundCards = document.querySelectorAll('.invisible');
    if (nbrOfCards === foundCards.length) {
        (0, store_1.updateStoreProperty)('win', 'true');
        (0, modal_1.openModal)();
    }
}

},{"./constants":2,"./modal":5,"./store":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const cards_1 = require("./cards");
const constants_1 = require("./constants");
bootstrap();
/**
 * First Load starter
 */
function bootstrap() {
    const selectBtn = document.getElementById('cards-selector');
    if (selectBtn) {
        populateOptions(selectBtn);
        selectBtn.addEventListener("change", (evt) => {
            const nbrOfCards = evt.target.value;
            (0, store_1.updateStoreProperty)("nbrOfCards", nbrOfCards);
        });
    }
    else {
        console.error("id: 'cards-selector' does not exist");
    }
    const startBtn = document.getElementById('btn-start');
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            (0, cards_1.generateCards)();
            const status = document.getElementById('status');
            (0, store_1.updateStoreProperty)('score', '0');
            if (status) {
                status.innerText = "Partie en cours";
            }
        });
    }
    else {
        console.error("id: 'btn-start' does not exist");
    }
}
/**
 * Create options for the number of cards selection btn
 * @param selectBnt
 */
function populateOptions(selectBnt) {
    for (const elem of constants_1.CARDS_NUMBERS) {
        const option = createOption(String(elem));
        selectBnt.appendChild(option);
    }
}
/**
 * Generate single Option Element
 * @param value
 * @returns
 */
function createOption(value) {
    const nbrOfCards = (0, store_1.getStoreProperty)("nbrOfCards");
    const option = document.createElement('option');
    option.setAttribute('value', value);
    if (nbrOfCards == value) {
        option.setAttribute("selected", "selected");
    }
    option.innerText = value;
    return option;
}

},{"./cards":1,"./constants":2,"./store":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = void 0;
const store_1 = require("./store");
/**
 * Called when game is won by the player
 */
function openModal() {
    var _a;
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = "flex";
        const score = (0, store_1.getStoreProperty)('score');
        const scoreSpan = document.getElementById('score');
        if (scoreSpan && score) {
            scoreSpan.innerText = score;
        }
        (_a = document.getElementById('close-modal')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeModal);
    }
}
exports.openModal = openModal;
/**
 * Reset to default modal state
 */
function closeModal() {
    const status = document.getElementById('status');
    if (status) {
        status.innerText = "Aucune partie en cours";
    }
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = "none";
    }
}

},{"./store":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreProperty = exports.getStoreProperty = void 0;
const store = {
    nbrOfCards: "10",
    currentShownCards: '0',
    canClick: 'true',
    score: '0',
};
function getStoreProperty(propertyName) {
    return store[propertyName];
}
exports.getStoreProperty = getStoreProperty;
function updateStoreProperty(propertyName, value) {
    if (store[propertyName]) {
        store[propertyName] = value;
    }
}
exports.updateStoreProperty = updateStoreProperty;

},{}]},{},[4]);
