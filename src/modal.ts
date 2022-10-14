import { getStoreProperty } from "./store";

/**
 * Called when game is won by the player
 */
export function openModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = "flex";
    const score = getStoreProperty('score');
    const scoreSpan = document.getElementById('score');
    if (scoreSpan && score) {
      scoreSpan.innerText = score;
    }

    document.getElementById('close-modal')
      ?.addEventListener('click', closeModal);
  }
}

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