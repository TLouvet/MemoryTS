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
