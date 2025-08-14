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
 * @param {string} collectionDeck - The name of the collection deck
 * @param {Object} neededCards - Object to store needed cards
 * @param {Object} duplicateCards - Object to store duplicate cards
 */
function processFormData(form, collectionDeck, neededCards, duplicateCards) {
    const formData = new FormData(form);

    formData.forEach((value, key) => {
        if (value === 'needed') {
            if (!neededCards[collectionDeck]) neededCards[collectionDeck] = [];
            neededCards[collectionDeck].push(key);
        } else if (value === 'duplicate') {
            if (!duplicateCards[collectionDeck]) duplicateCards[collectionDeck] = [];
            duplicateCards[collectionDeck].push(key);
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
        const collectionDeck = form.getAttribute('data-collection');
        processFormData(form, collectionDeck, neededCards, duplicateCards);
    });

    // ================================
    // FORMAT GENERATION
    // ================================
    // Purpose: Create the formatted Reddit text output

    let redditFormat = '';
    let needCards = false;

    // Add needed cards section if any exist
    if (Object.keys(neededCards).length > 0) {
        redditFormat += '**Cards Needed**:\n\n';
        for (const collection in neededCards) {
            redditFormat += `- ${collection} ➜ ${neededCards[collection].join(', ')}\n`;
        }
        needCards = true;
    }

    // Add duplicate cards section if any exist
    if (Object.keys(duplicateCards).length > 0) {
        // Add spacing between sections if both exist
        if (needCards) {
            redditFormat += '\n\n';
        }
        redditFormat += '**Cards Duplicated**:\n\n';
        for (const collection in duplicateCards) {
            redditFormat += `- ${collection} ➜ ${duplicateCards[collection].join(', ')}\n`;
        }
    }

    // ================================
    // OUTPUT DISPLAY
    // ================================
    // Purpose: Display the generated format in the Reddit format container

    // Update the Reddit format display area
    document.getElementById('reddit-format').textContent = redditFormat;
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
        const collectionDeck = form.getAttribute('data-collection');
        processFormData(form, collectionDeck, neededCards, duplicateCards);
    });

    // ================================
    // FORMAT GENERATION
    // ================================
    // Purpose: Create the compact in-game format

    let needed = '';
    let duplicate = '';

    // Build needed cards section
    if (Object.keys(neededCards).length > 0) {
        needed = 'NEED: ';
        let firstNeeded = true;
        for (const collection in neededCards) {
            if (!firstNeeded) {
                needed += ' / ';
            }
            needed += `[${collection}] => ${neededCards[collection].join(', ')}`;
            firstNeeded = false;
        }
    }

    // Build duplicate cards section
    if (Object.keys(duplicateCards).length > 0) {
        if (needed !== '') {
            duplicate = ' ||  DUPLICATE: ';
        } else {
            duplicate = 'DUPLICATE: ';
        }
        let firstDuplicate = true;
        for (const collection in duplicateCards) {
            if (!firstDuplicate) {
                duplicate += ' / ';
            }
            duplicate += `[${collection}] => ${duplicateCards[collection].join(', ')}`;
            firstDuplicate = false;
        }
    }

    // Combine both sections
    let inGameFormat = `${needed} ${duplicate}`;

    // ================================
    // TEXT CHUNKING
    // ================================
    // Purpose: Split long text into manageable chunks for display

    // Split text into chunks that fit within character limits
    const chunks = splitIntoChunks(inGameFormat, 500);

    // ================================
    // OUTPUT DISPLAY
    // ================================
    // Purpose: Display the chunked format in the in-game format container

    const inGameFormatContainer = document.getElementById('in-game-format');
    inGameFormatContainer.innerHTML = '';

    // Create paragraphs for each chunk with separators
    chunks.forEach((chunk, index) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = chunk;
        inGameFormatContainer.appendChild(paragraph);

        // Add separator line between chunks (except after the last one)
        if (index < chunks.length - 1) {
            const line = document.createElement('hr');
            inGameFormatContainer.appendChild(line);
        }
    });
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
