// ---------------------------------
// ---- SHOWING TEXT FORMATTING ----
// ---------------------------------

// ---- SHOWING BOTH REDDIT & IN-GAME FORMATS, AND HIDING USER MESSAGE

// Function to show the Reddit format
export function showRedditFormat() {
  document.getElementById('reddit-format-container').style.display = 'block';
  document.getElementById('in-game-format-container').style.display = 'none';
}

// Function to show the In-Game format
export function showInGameFormat() {
  document.getElementById('reddit-format-container').style.display = 'none';
  document.getElementById('in-game-format-container').style.display = 'block';
}

// Function to hide the user message
export function hideUserMessage() {
  document.getElementById('user-message').style.display = 'none';
  document.getElementById('in-game-user-message').style.display = 'none';
}
