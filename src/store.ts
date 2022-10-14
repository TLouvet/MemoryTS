import { Store } from "./types";

const store: Store = {
  nbrOfCards: "10",
  currentShownCards: '0',
  canClick: 'true',
  score: '0',
}

export function getStoreProperty(propertyName: string): string | undefined {
  return store[propertyName];
}

export function updateStoreProperty(propertyName: string, value: string): void {
  if (store[propertyName]) {
    store[propertyName] = value;
  }
}