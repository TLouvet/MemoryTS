import { getStoreProperty, updateStoreProperty } from "./store";
import { generateCards } from './cards';
import { CARDS_NUMBERS } from "./constants";


bootstrap();

/**
 * First Load starter
 */
function bootstrap() {
  const selectBtn = document.getElementById('cards-selector') as HTMLSelectElement | null;
  if (selectBtn) {
    populateOptions(selectBtn);
    selectBtn.addEventListener("change", (evt) => {
      const nbrOfCards = (evt.target as any).value;
      updateStoreProperty("nbrOfCards", nbrOfCards);
    });
  } else {
    console.error("id: 'cards-selector' does not exist");
  }

  const startBtn = document.getElementById('btn-start') as HTMLButtonElement | null;
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      generateCards();
      const status = document.getElementById('status');
      updateStoreProperty('score', '0');
      if (status) {
        status.innerText = "Partie en cours";
      }
    });
  } else {
    console.error("id: 'btn-start' does not exist");
  }
}

/**
 * Create options for the number of cards selection btn
 * @param selectBnt 
 */
function populateOptions(selectBnt: HTMLSelectElement) {
  for (const elem of CARDS_NUMBERS) {
    const option = createOption(String(elem));
    selectBnt.appendChild(option);
  }
}

/**
 * Generate single Option Element
 * @param value 
 * @returns 
 */
function createOption(value: string) {
  const nbrOfCards = getStoreProperty("nbrOfCards");
  const option = document.createElement('option');
  option.setAttribute('value', value);
  if (nbrOfCards == value) {
    option.setAttribute("selected", "selected");
  }
  option.innerText = value;
  return option;
}

