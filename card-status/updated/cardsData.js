// ---------------------------------
// --------- CARDS DATA -----------
// ---------------------------------
// This file manages the card collection data and provides functions to load the hobby collection.
// It handles loading the hobby collection from the new locales structure.

// ================================
// COLLECTION CONFIGURATION
// ================================
// Purpose: Define which collection is currently active

// Currently only hobby collection is available
export const season = 'hobby';

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import hobby collection from new structure

// Import hobby collections from new structure
import { hobbyCollection as hobbyCollectionEn } from '../locales/collections/hobby/en.js';
import { hobbyCollection as hobbyCollectionPtBR } from '../locales/collections/hobby/pt-BR.js';

// ================================
// GLOBAL VARIABLES
// ================================
// Purpose: Store the currently loaded collection data

// Variable to hold the current collection based on season
let currentCollection;

// Map of all available language collections
const hobbyCollections = {
    'en': hobbyCollectionEn,
    'pt-BR': hobbyCollectionPtBR
};

// ================================
// COLLECTION LOADING
// ================================
// Purpose: Load the hobby collection from the new structure

/**
 * Loads the hobby collection from the new locales structure.
 * This function loads the hobby collection and returns it for use in the application.
 * @returns {Array} The hobby collection array containing all cards and deck information
 * @example
 * const collection = loadCollection(); // Returns the hobby collection
 */
export function loadCollection() {
    // ================================
    // HOBBY COLLECTION LOADING
    // ================================
    // Purpose: Load the hobby collection from the new structure

    // Get current language from localStorage or default to English
    const currentLanguage = localStorage.getItem('locale') || 'en';

    // Load collection based on current language
    currentCollection = hobbyCollections[currentLanguage] || hobbyCollections['en'];

    // ================================
    // DEBUGGING AND RETURN
    // ================================
    // Purpose: Log the loaded collection and return it for use

    // Note: Collection loaded successfully

    // Return the current collection for use in other parts of the application
    return currentCollection;
}

/**
 * Reloads the collection based on the current language setting
 * This function is called when the language changes to update the collection data
 * @returns {Array} The updated collection array for the current language
 */
export function reloadCollection() {
    // Get current language from localStorage or default to English
    const currentLanguage = localStorage.getItem('locale') || 'en';

    // Load collection based on current language
    currentCollection = hobbyCollections[currentLanguage] || hobbyCollections['en'];

    // Return the updated collection for use in other parts of the application
    return currentCollection;
}


