import { WAIT_TIME } from "./constants";
import { openModal } from "./modal";
import { getStoreProperty, updateStoreProperty } from "./store";

/**
 * Updates the counter value when a player clicks on card, allowing for game state verification
 */
export function verifyCurrentCounter() {
  const currentCounter = +(getStoreProperty('currentShownCards') || 0);
  if (currentCounter === 2) {
    updateStoreProperty("currentShownCards", '0');
    updateStoreProperty("canClick", "false");

    const cards = document.querySelectorAll('.unfold');
    if (cards.length !== 2) {
      return; // sometimes this error happens, but why...
    }
    setTimeout(() => {
      cards.forEach(card => card.classList.remove('unfold'));
      if ((cards[0] as HTMLElement).innerText === (cards[1] as HTMLElement).innerText) {
        cards.forEach(card => card.classList.add('invisible'));
        verifyWin();
      } else {
        incrementScore();
      }
      updateStoreProperty("canClick", "true");
    }, WAIT_TIME)
  }
}

/**
 * Wrong guess 
 */
function incrementScore() {
  const score = +(getStoreProperty('score') || 0)
  updateStoreProperty('score', String(score + 1));
}

/**
 * When the player has unfolded two cards with the same value, we check if all the pairs are found
 */
function verifyWin() {
  const nbrOfCards = +(getStoreProperty('nbrOfCards') || 0);
  const foundCards = document.querySelectorAll('.invisible');
  if (nbrOfCards === foundCards.length) {
    updateStoreProperty('win', 'true');
    openModal();
  }
}