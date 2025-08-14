// ---------------------------------
// --------- CARDS DATA -----------
// ---------------------------------
// This file manages the card collection data and provides functions to load different seasonal collections.
// It handles the dynamic switching between various card sets based on the current season.

// ================================
// SEASON CONFIGURATION
// ================================
// Purpose: Define which season/collection is currently active

// Set this dynamically based on your logic, e.g., using the current date
export const season = 'hobby';

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import all available seasonal card collections

// Import all seasonal card collections
import { currentCollectionFall } from '../seasons/fallCards.js';
import { currentCollectionWinter } from '../seasons/winterCards.js';
import { currentCollectionJourney } from '../seasons/journeyCards.js';
import { currentCollectionNature } from '../seasons/natureCards.js';
import { currentCollectionSpace } from '../seasons/spaceCards.js';
import { currentCollectionHobby } from '../seasons/hobbyCards.js';

// ================================
// GLOBAL VARIABLES
// ================================
// Purpose: Store the currently loaded collection data

// Variable to hold the current collection based on season
let currentCollection;

// ================================
// COLLECTION LOADING
// ================================
// Purpose: Load the appropriate card collection based on the current season

/**
 * Loads the appropriate card collection based on the current season setting.
 * This function dynamically selects which collection to use and returns it for use in the application.
 * @returns {Array} The current collection array containing all cards and deck information
 * @example
 * const collection = loadCollection(); // Returns the hobby collection if season = 'hobby'
 */
export function loadCollection() {
    // ================================
    // SEASON-BASED COLLECTION SELECTION
    // ================================
    // Purpose: Select the appropriate collection based on the season variable

    if (season === 'fall') {
        currentCollection = currentCollectionFall; // Import fall cards
    } else if (season === 'winter') {
        currentCollection = currentCollectionWinter; // Import winter cards
    } else if (season === 'journey') {
        currentCollection = currentCollectionJourney; // Import journey cards
    } else if (season === 'nature') {
        currentCollection = currentCollectionNature; // Import nature cards
    } else if (season === 'space') {
        currentCollection = currentCollectionSpace; // Import space cards
    } else if (season === 'hobby') {
        currentCollection = currentCollectionHobby; // Import hobby cards
    }

    // ================================
    // DEBUGGING AND RETURN
    // ================================
    // Purpose: Log the loaded collection and return it for use

    // Note: Collection loaded successfully

    // Return the current collection for use in other parts of the application
    return currentCollection;
}

