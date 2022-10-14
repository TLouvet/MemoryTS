import { verifyCurrentCounter } from "./gamelogic";
import { getStoreProperty, updateStoreProperty } from "./store";

export function generateCards() {
  const cardSection = document.getElementById('cards');
  if (cardSection) {
    cardSection.replaceChildren(); // Empty html code 
    const nbrOfCards = +(getStoreProperty("nbrOfCards") || 0);
    const values = generateCardsValues(nbrOfCards);
    populateCards(cardSection, values, nbrOfCards);
  }
}

function populateCards(htmlContainer: HTMLElement, values: number[], nbrOfCards: number) {
  for (let i = 0; i < nbrOfCards; i++) {
    const index = Math.floor(Math.random() * values.length);
    const selectedValue = values[index] as number;
    const id = `card-${i}`;
    const card = createCard(selectedValue, id);
    htmlContainer.appendChild(card);
    values.splice(index, 1);
  }
}

function generateCardsValues(nbrOfCards: number) {
  const values = [];
  for (let i = 0; i < nbrOfCards / 2; i++) {
    values.push(i, i);
  }
  return values;
}

function createCard(value: number, id: string) {
  const card = document.createElement('article');
  card.setAttribute('class', "card");
  card.setAttribute('id', id);
  card.innerText = String(value);
  card.addEventListener('click', handleCardClick)
  return card;
}

function handleCardClick(e: MouseEvent) {
  const currentCounter = +(getStoreProperty('currentShownCards') || 0);
  const canPlayerClick = getStoreProperty('canClick') === "true" ? true : false;
  const classes = (e.target as HTMLElement).classList;

  if (classes.contains("invisible") || !canPlayerClick) {
    return;
  }

  const isCardRevealed = classes.contains('unfold');
  if (!isCardRevealed) {
    updateStoreProperty("currentShownCards", String(currentCounter + 1));
    classes.add("unfold");
    verifyCurrentCounter();
  }
}