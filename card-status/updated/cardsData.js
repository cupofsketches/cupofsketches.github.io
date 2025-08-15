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

    // Map season names to their corresponding collections
    const seasonCollections = {
        'fall': currentCollectionFall,
        'winter': currentCollectionWinter,
        'journey': currentCollectionJourney,
        'nature': currentCollectionNature,
        'space': currentCollectionSpace,
        'hobby': currentCollectionHobby
    };

    // Get the collection for the current season, fallback to hobby if season not found
    currentCollection = seasonCollections[season] || seasonCollections['hobby'];

    // ================================
    // DEBUGGING AND RETURN
    // ================================
    // Purpose: Log the loaded collection and return it for use

    // Note: Collection loaded successfully

    // Return the current collection for use in other parts of the application
    return currentCollection;
}


