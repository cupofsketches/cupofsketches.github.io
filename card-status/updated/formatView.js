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
    try {
        // Display Reddit format container
        const redditContainer = document.getElementById('reddit-format-container');
        if (redditContainer) {
            redditContainer.style.display = 'block';
        }

        // Hide in-game format container
        const inGameContainer = document.getElementById('in-game-format-container');
        if (inGameContainer) {
            inGameContainer.style.display = 'none';
        }
    } catch (error) {
        console.error('Error showing Reddit format:', error);
    }
}

/**
 * Shows the in-game format display and hides the Reddit format
 * This function switches the view to show the in-game chat formatted text output
 */
export function showInGameFormat() {
    try {
        // Hide Reddit format container
        const redditContainer = document.getElementById('reddit-format-container');
        if (redditContainer) {
            redditContainer.style.display = 'none';
        }

        // Display in-game format container
        const inGameContainer = document.getElementById('in-game-format-container');
        if (inGameContainer) {
            inGameContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Error showing in-game format:', error);
    }
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
    try {
        // Hide Reddit format user message
        const redditMessage = document.getElementById('reddit-format-description');
        if (redditMessage) {
            redditMessage.style.display = 'none';
        }

        // Hide in-game format user message
        const inGameMessage = document.getElementById('in-game-format-description');
        if (inGameMessage) {
            inGameMessage.style.display = 'none';
        }
    } catch (error) {
        console.warn('Could not hide user messages:', error);
    }
}
