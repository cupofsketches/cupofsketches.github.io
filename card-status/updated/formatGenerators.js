// ---------------------------------
// -------- FORMAT GENERATORS --------
// ---------------------------------
// This file handles the generation of formatted text output for both Reddit posts and in-game chat.
// It processes user selections and creates readable formats for sharing card status information.

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import necessary functions and modules from other files

import { translate } from './i18n.js';
import { showRedditLanguageMessage, hideRedditLanguageMessage } from './formatView.js';

// ================================
// SHARED UTILITIES
// ================================
// Purpose: Common functions used by multiple format generators

/**
 * Processes form data and categorizes cards by their status
 * This function extracts 'needed' and 'duplicate' selections from collection forms
 * Only considers currently checked radio buttons to handle status changes correctly
 * @param {HTMLFormElement} form - The form element to process
 * @param {string} collectionName - The name of the collection
 * @param {Object} neededCards - Object to store needed cards
 * @param {Object} duplicateCards - Object to store duplicate cards
 */
function processFormData(form, collectionName, neededCards, duplicateCards) {
    // Get all radio buttons in this form
    const radioButtons = form.querySelectorAll('input[type="radio"]:checked');

    radioButtons.forEach(radio => {
        const cardName = radio.name; // This is the card name
        const status = radio.value;  // This is the current status

        if (status === 'needed') {
            if (!neededCards[collectionName]) neededCards[collectionName] = [];
            neededCards[collectionName].push(cardName);
        } else if (status === 'duplicate') {
            if (!duplicateCards[collectionName]) duplicateCards[collectionName] = [];
            duplicateCards[collectionName].push(cardName);
        }
        // Note: 'owned' and 'nonTrade' cards are intentionally excluded from format output
    });
}

// ================================
// REDDIT FORMAT GENERATION
// ================================
// Purpose: Generate formatted text suitable for Reddit posts

/**
 * Generates Reddit-formatted text from user card selections
 * Creates a structured format with clear sections for needed and duplicate cards
 */
export function generateRedditFormat() {
    // Reset copy buttons to copy icon state when format regenerates
    resetCopyButtons();

    // ================================
    // DATA COLLECTION
    // ================================
    // Purpose: Gather all needed and duplicate card selections

    // Initialize objects to store card categories by collection
    const neededCards = {};
    const duplicateCards = {};

    // Collect data from all collection forms
    const forms = document.querySelectorAll('.collection-form');
    forms.forEach((form) => {
        const collectionName = form.getAttribute('data-collection-name');
        processFormData(form, collectionName, neededCards, duplicateCards);
    });

    // ================================
    // FORMAT GENERATION
    // ================================
    // Purpose: Create the formatted Reddit text output

    const formatParts = [];
    let hasNeededCards = false;

    // Add language guidance message if not in English
    const currentLocale = localStorage.getItem('locale') || 'en';
    if (currentLocale !== 'en') {
        // Show the language message above the generated content
        showRedditLanguageMessage();
    } else {
        // Hide the message if in English
        hideRedditLanguageMessage();
    }

    // Add needed cards section if any exist
    if (Object.keys(neededCards).length > 0) {
        formatParts.push(`**${translate("format.cardsNeeded")}**\n`);
        for (const collection in neededCards) {
            formatParts.push(`- ${collection} ➜ ${neededCards[collection].join(', ')}`);
        }
        hasNeededCards = true;
    }

    // Add duplicate cards section if any exist
    if (Object.keys(duplicateCards).length > 0) {
        // Add spacing between sections if both exist
        if (hasNeededCards) {
            formatParts.push(''); // Empty line for spacing
        }
        formatParts.push(`**${translate("format.cardsDuplicated")}**\n`);
        for (const collection in duplicateCards) {
            formatParts.push(`- ${collection} ➜ ${duplicateCards[collection].join(', ')}`);
        }
    }

    // ================================
    // OUTPUT DISPLAY
    // ================================
    // Purpose: Display the generated format in the Reddit format container

    // Cache DOM element and update the Reddit format display area
    const redditFormatElement = document.getElementById('reddit-format');
    if (redditFormatElement) {
        // Check if there's actual content to display
        const hasContent = Object.keys(neededCards).length > 0 || Object.keys(duplicateCards).length > 0;

        // Hide the user message only if we have content to show
        const redditUserMessage = document.getElementById('reddit-format-description');
        if (redditUserMessage) {
            redditUserMessage.style.display = hasContent ? 'none' : 'block';
        }

        // Show/hide the copy button based on content availability
        const redditCopyButton = document.getElementById('copy-reddit-format');
        if (redditCopyButton) {
            redditCopyButton.style.display = hasContent ? 'inline-flex' : 'none';
        }

        redditFormatElement.textContent = formatParts.join('\n');
    }
}

// ================================
// IN-GAME FORMAT GENERATION
// ================================
// Purpose: Generate compact text format suitable for in-game chat with character limits

/**
 * Generates in-game chat formatted text from user card selections
 * Creates a compact format that fits within game chat limitations
 */
export function generateInGameFormat() {
    // Reset copy buttons to copy icon state when format regenerates
    resetCopyButtons();

    // ================================
    // DATA COLLECTION
    // ================================
    // Purpose: Gather all needed and duplicate card selections

    // Initialize objects to store card categories by collection
    const neededCards = {};
    const duplicateCards = {};

    // Collect data from all collection forms
    const forms = document.querySelectorAll('.collection-form');
    forms.forEach((form) => {
        const collectionName = form.getAttribute('data-collection-name');
        processFormData(form, collectionName, neededCards, duplicateCards);
    });

    // ================================
    // FORMAT GENERATION
    // ================================
    // Purpose: Create the compact in-game format

    const neededParts = [];
    const duplicateParts = [];
    const neededPartsForCopy = [];
    const duplicatePartsForCopy = [];

    // Build needed cards section
    if (Object.keys(neededCards).length > 0) {
        // For display: no prefix
        let isFirstNeededCollection = true;
        for (const collection in neededCards) {
            if (!isFirstNeededCollection) {
                neededParts.push(' / ');
            }
            neededParts.push(`[${collection}] => ${neededCards[collection].join(', ')}`);
            isFirstNeededCollection = false;
        }

        // For copy: with prefix
        neededPartsForCopy.push(`${translate("format.need")} `);
        isFirstNeededCollection = true;
        for (const collection in neededCards) {
            if (!isFirstNeededCollection) {
                neededPartsForCopy.push(' / ');
            }
            neededPartsForCopy.push(`[${collection}] => ${neededCards[collection].join(', ')}`);
            isFirstNeededCollection = false;
        }
    }

    // Build duplicate cards section
    if (Object.keys(duplicateCards).length > 0) {
        // For display: no prefix
        let isFirstDuplicateCollection = true;
        for (const collection in duplicateCards) {
            if (!isFirstDuplicateCollection) {
                duplicateParts.push(' / ');
            }
            duplicateParts.push(`[${collection}] => ${duplicateCards[collection].join(', ')}`);
            isFirstDuplicateCollection = false;
        }

        // For copy: with prefix
        duplicatePartsForCopy.push(`${translate("format.duplicate")} `);
        isFirstDuplicateCollection = true;
        for (const collection in duplicateCards) {
            if (!isFirstDuplicateCollection) {
                duplicatePartsForCopy.push(' / ');
            }
            duplicatePartsForCopy.push(`[${collection}] => ${duplicateCards[collection].join(', ')}`);
            isFirstDuplicateCollection = false;
        }
    }

    // ================================
    // OUTPUT DISPLAY
    // ================================
    // Purpose: Display the generated format in the in-game format container

    // Cache DOM element and update the in-game format display area
    const inGameFormatElement = document.getElementById('in-game-format');
    const needSectionContainer = document.getElementById('need-section-container');
    const duplicateSectionContainer = document.getElementById('duplicate-section-container');
    const needSection = document.getElementById('need-section');
    const duplicateSection = document.getElementById('duplicate-section');
    const sectionsSeparator = document.getElementById('sections-separator');

    if (inGameFormatElement && needSectionContainer && duplicateSectionContainer && needSection && duplicateSection) {

        // Check if there's actual content to display
        const hasContent = neededParts.length > 0 || duplicateParts.length > 0;

        // Hide the user message only if we have content to show
        const inGameUserMessage = document.getElementById('in-game-format-description');
        if (inGameUserMessage) {
            inGameUserMessage.style.display = hasContent ? 'none' : 'block';
        }

        // Show/hide sections based on content
        if (neededParts.length > 0) {
            needSectionContainer.style.display = 'block';
            // Display without "NEED:" prefix for cleaner appearance
            needSection.textContent = neededParts.join('');
            // Store the full text with prefix for copying
            needSection.setAttribute('data-copy-text', neededPartsForCopy.join(''));
        } else {
            needSectionContainer.style.display = 'none';
        }

        if (duplicateParts.length > 0) {
            duplicateSectionContainer.style.display = 'block';
            // Display without "DUPLICATE:" prefix for cleaner appearance
            duplicateSection.textContent = duplicateParts.join('');
            // Store the full text with prefix for copying
            duplicateSection.setAttribute('data-copy-text', duplicatePartsForCopy.join(''));
        } else {
            duplicateSectionContainer.style.display = 'none';
        }

        // Show/hide copy buttons based on section content
        const needCopyButton = document.getElementById('copy-need-section');
        const duplicateCopyButton = document.getElementById('copy-duplicate-section');

        if (needCopyButton) {
            needCopyButton.style.display = neededParts.length > 0 ? 'inline-flex' : 'none';
        }

        if (duplicateCopyButton) {
            duplicateCopyButton.style.display = duplicateParts.length > 0 ? 'inline-flex' : 'none';
        }

        // Show separator only if both sections exist
        if (neededParts.length > 0 && duplicateParts.length > 0) {
            sectionsSeparator.style.display = 'block';
        } else {
            sectionsSeparator.style.display = 'none';
        }

        // Hide the legacy container
        inGameFormatElement.style.display = 'none';
    } else {
        // Fallback to legacy display if new elements not found
        if (inGameFormatElement) {
            // Check if there's actual content to display
            const hasContent = neededParts.length > 0 || duplicateParts.length > 0;

            // Hide the user message only if we have content to show
            const inGameUserMessage = document.getElementById('in-game-format-description');
            if (inGameUserMessage) {
                inGameUserMessage.style.display = hasContent ? 'none' : 'block';
            }

            // Build the complete format with proper section separation
            let finalFormat = '';

            // Process NEED section separately
            if (neededParts.length > 0) {
                let neededFormat = neededParts.join('');
                if (neededFormat.length > 500) {
                    const neededChunks = splitIntoChunks(neededFormat, 500);
                    const formattedNeededChunks = neededChunks.map((chunk, index) => {
                        if (index === 0) {
                            return chunk;
                        } else {
                            return `\n\n${chunk}`;
                        }
                    });
                    finalFormat += formattedNeededChunks.join('');
                } else {
                    finalFormat += neededFormat;
                }
            }

            // Add clear separator between sections if both exist
            if (neededParts.length > 0 && duplicateParts.length > 0) {
                finalFormat += '\n\n<hr>\n\n';
            }

            // Process DUPLICATE section separately
            if (duplicateParts.length > 0) {
                let duplicateFormat = duplicateParts.join('');
                if (duplicateFormat.length > 500) {
                    const duplicateChunks = splitIntoChunks(duplicateFormat, 500);
                    const formattedDuplicateChunks = duplicateChunks.map((chunk, index) => {
                        if (index === 0) {
                            return chunk;
                        } else {
                            return `\n\n${chunk}`;
                        }
                    });
                    finalFormat += formattedDuplicateChunks.join('');
                } else {
                    finalFormat += duplicateFormat;
                }
            }

            // Display the final format
            inGameFormatElement.innerHTML = finalFormat;
        }
    }
}

// ================================
// HELPER FUNCTIONS
// ================================
// Purpose: Utility functions for text processing

/**
 * Resets all copy buttons to their original copy icon state
 * This ensures copy buttons show the correct icon when formats are regenerated
 */
function resetCopyButtons() {
    try {
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            // Reset to original copy icon
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
            `;
            // Reset to original styles
            button.style.background = '#f8f9fa';
            button.style.borderColor = '#dee2e6';
            button.style.color = '#6c757d';
        });
        console.log('🔄 Copy buttons reset to copy icon state');
    } catch (error) {
        console.error('Error resetting copy buttons:', error);
    }
}

/**
 * Splits text into chunks without breaking words
 * Ensures that chunks respect word boundaries and fit within specified size limits
 * @param {string} text - The text to split into chunks
 * @param {number} chunkSize - Maximum size of each chunk
 * @returns {string[]} Array of text chunks
 */
function splitIntoChunks(text, chunkSize) {
    const chunks = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        let endIndex = startIndex + chunkSize;

        // If we're not at the end, try to break at a word boundary
        if (endIndex < text.length) {
            // Look for natural break points in order of preference
            let breakPoint = -1;

            // 1. Prefer breaking at collection separators ( / )
            const slashBreak = text.lastIndexOf(' / ', endIndex);
            if (slashBreak > startIndex) {
                breakPoint = slashBreak + 3; // Include the " / " in the current chunk
            }

            // 2. Prefer breaking at section separators ( || )
            const pipeBreak = text.lastIndexOf(' || ', endIndex);
            if (pipeBreak > startIndex && (breakPoint === -1 || pipeBreak > breakPoint)) {
                breakPoint = pipeBreak + 4; // Include the " || " in the current chunk
            }

            // 3. Prefer breaking at card separators (comma + space)
            const commaBreak = text.lastIndexOf(', ', endIndex);
            if (commaBreak > startIndex && (breakPoint === -1 || commaBreak > breakPoint)) {
                breakPoint = commaBreak + 2; // Include the ", " in the current chunk
            }

            // 4. Fall back to breaking at any space
            if (breakPoint === -1) {
                breakPoint = text.lastIndexOf(' ', endIndex);
            }

            // If we found a good break point, use it
            if (breakPoint > startIndex) {
                endIndex = breakPoint;
            } else {
                // If no safe break point found, try to find a space even if it's beyond our target
                const nextSpace = text.indexOf(' ', endIndex);
                if (nextSpace !== -1 && nextSpace - startIndex < chunkSize + 50) {
                    // Allow going a bit over if it means keeping a word intact
                    endIndex = nextSpace;
                } else {
                    // Last resort: break at the original end index
                    endIndex = startIndex + chunkSize;
                }
            }
        }

        // Extract the chunk and trim whitespace
        chunks.push(text.slice(startIndex, endIndex).trim());
        startIndex = endIndex;
    }

    return chunks;
}
