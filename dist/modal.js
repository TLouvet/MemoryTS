"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = void 0;
const store_1 = require("./store");
/**
 * Called when game is won by the player
 */
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = "flex";
        const score = (0, store_1.getStoreProperty)('score');
        const scoreSpan = document.getElementById('score');
        if (scoreSpan && score) {
            scoreSpan.innerText = score;
        }
        const closeBtn = document.getElementById('close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
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
