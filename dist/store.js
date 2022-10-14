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
