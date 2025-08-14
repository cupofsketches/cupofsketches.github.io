// ---------------------------------
// -------- FORMAT VIEW -----------
// ---------------------------------
// This file handles the display and visibility of different text format outputs.
// It manages showing/hiding Reddit and in-game format containers and user messages.

// ================================
// FORMAT DISPLAY FUNCTIONS
// ================================
// Purpose: Control which format type is currently visible to the user

/**
 * Shows the Reddit format display and hides the in-game format
 * This function switches the view to show the Reddit-formatted text output
 */
export function showRedditFormat() {
    // Display Reddit format container
    document.getElementById('reddit-format-container').style.display = 'block';
    // Hide in-game format container
    document.getElementById('in-game-format-container').style.display = 'none';
}

/**
 * Shows the in-game format display and hides the Reddit format
 * This function switches the view to show the in-game chat formatted text output
 */
export function showInGameFormat() {
    // Hide Reddit format container
    document.getElementById('reddit-format-container').style.display = 'none';
    // Display in-game format container
    document.getElementById('in-game-format-container').style.display = 'block';
}

// ================================
// USER MESSAGE MANAGEMENT
// ================================
// Purpose: Control the visibility of user guidance messages

/**
 * Hides both user message displays
 * This function removes the initial guidance text when user starts making selections
 */
export function hideUserMessage() {
    // Hide Reddit format user message
    document.getElementById('user-message').style.display = 'none';
    // Hide in-game format user message
    document.getElementById('in-game-user-message').style.display = 'none';
}
