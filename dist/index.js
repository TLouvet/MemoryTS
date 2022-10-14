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
