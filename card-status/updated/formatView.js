// ---------------------------------
// -------- FORMAT VIEW -----------
// ---------------------------------
// This file handles the display and visibility of different text format outputs.
// It manages showing/hiding Reddit and in-game format containers and user messages.

import { translate } from './i18n.js';

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
 * Shows the Reddit language guidance message when not in English
 * This function displays a helpful message above the Reddit format content
 */
export function showRedditLanguageMessage() {
    try {
        // Check if message element exists, if not create it
        let messageElement = document.getElementById('reddit-language-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'reddit-language-message';
            messageElement.className = 'reddit-language-info';

            // Insert the message above the reddit-format element
            const redditFormatElement = document.getElementById('reddit-format');
            const redditContainer = document.getElementById('reddit-format-container');

            if (redditFormatElement && redditContainer) {
                redditContainer.insertBefore(messageElement, redditFormatElement);
            }
        }

        // Always update the message text with current language
        messageElement.textContent = translate("format.redditLanguageMessage");

        // Show the message
        messageElement.style.display = 'block';
    } catch (error) {
        console.error('Error showing Reddit language message:', error);
    }
}

/**
 * Hides the Reddit language guidance message
 * This function removes the language guidance when not needed
 */
export function hideRedditLanguageMessage() {
    try {
        const messageElement = document.getElementById('reddit-language-message');
        if (messageElement) {
            messageElement.style.display = 'none';
        }
    } catch (error) {
        console.warn('Could not hide Reddit language message:', error);
    }
}

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
