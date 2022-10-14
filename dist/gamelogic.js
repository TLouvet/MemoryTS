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
