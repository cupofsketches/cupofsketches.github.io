// ---------------------------------
// -------- FORMAT GENERATORS --------
// ---------------------------------
// This file handles the generation of formatted text output for both Reddit posts and in-game chat.
// It processes user selections and creates readable formats for sharing card status information.

// ================================
// SHARED UTILITIES
// ================================
// Purpose: Common functions used by multiple format generators

/**
 * Processes form data and categorizes cards by their status
 * This function extracts 'needed' and 'duplicate' selections from collection forms
 * @param {HTMLFormElement} form - The form element to process
 * @param {string} collectionName - The name of the collection
 * @param {Object} neededCards - Object to store needed cards
 * @param {Object} duplicateCards - Object to store duplicate cards
 */
function processFormData(form, collectionName, neededCards, duplicateCards) {
    const formData = new FormData(form);

    formData.forEach((value, key) => {
        if (value === 'needed') {
            if (!neededCards[collectionName]) neededCards[collectionName] = [];
            neededCards[collectionName].push(key);
        } else if (value === 'duplicate') {
            if (!duplicateCards[collectionName]) duplicateCards[collectionName] = [];
            duplicateCards[collectionName].push(key);
        }
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
        const collectionName = form.getAttribute('data-collection');
        processFormData(form, collectionName, neededCards, duplicateCards);
    });

    // ================================
    // FORMAT GENERATION
    // ================================
    // Purpose: Create the formatted Reddit text output

    const formatParts = [];
    let hasNeededCards = false;

    // Add needed cards section if any exist
    if (Object.keys(neededCards).length > 0) {
        formatParts.push('**Cards Needed**:\n');
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
        formatParts.push('**Cards Duplicated**:\n');
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
        const collectionName = form.getAttribute('data-collection');
        processFormData(form, collectionName, neededCards, duplicateCards);
    });

    // ================================
    // FORMAT GENERATION
    // ================================
    // Purpose: Create the compact in-game format

    const neededParts = [];
    const duplicateParts = [];

    // Build needed cards section
    if (Object.keys(neededCards).length > 0) {
        neededParts.push('NEED: ');
        let isFirstNeededCollection = true;
        for (const collection in neededCards) {
            if (!isFirstNeededCollection) {
                neededParts.push(' / ');
            }
            neededParts.push(`${collection}: ${neededCards[collection].join(', ')}`);
            isFirstNeededCollection = false;
        }
    }

    // Build duplicate cards section
    if (Object.keys(duplicateCards).length > 0) {
        duplicateParts.push('DUPLICATE: ');
        let isFirstDuplicateCollection = true;
        for (const collection in duplicateCards) {
            if (!isFirstDuplicateCollection) {
                duplicateParts.push(' / ');
            }
            duplicateParts.push(`${collection}: ${duplicateCards[collection].join(', ')}`);
            isFirstDuplicateCollection = false;
        }
    }

    // ================================
    // OUTPUT DISPLAY
    // ================================
    // Purpose: Display the generated format in the in-game format container

    // Cache DOM element and update the in-game format display area
    const inGameFormatElement = document.getElementById('in-game-format');
    if (inGameFormatElement) {
        const finalFormat = [...neededParts, ...duplicateParts].join('');
        inGameFormatElement.textContent = finalFormat;
    }
}

// ================================
// HELPER FUNCTIONS
// ================================
// Purpose: Utility functions for text processing

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
            endIndex = text.lastIndexOf(' ', endIndex);
            // If no space found, use the original end index
            if (endIndex <= startIndex) {
                endIndex = startIndex + chunkSize;
            }
        }

        // Extract the chunk and trim whitespace
        chunks.push(text.slice(startIndex, endIndex).trim());
        startIndex = endIndex + 1;
    }

    return chunks;
}
