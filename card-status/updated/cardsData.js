// ---------------------------------
// --------- CARDS DATA -----------
// ---------------------------------
// This file manages the card collection data and provides functions to load the active collection.
// It handles loading the active collection from the new locales structure.

// ================================
// COLLECTION CONFIGURATION
// ================================
// Purpose: Define which collection is currently active

// Currently only active collection is available
// Note: Collection name is now handled via translation keys

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import active collection from new structure

// Import active collections from new structure
import { activeCollection as activeCollectionEn } from '../locales/collections/active/en.js';
import { activeCollection as activeCollectionPtBR } from '../locales/collections/active/pt-BR.js';

// ================================
// GLOBAL VARIABLES
// ================================
// Purpose: Store the currently loaded collection data

// Variable to hold the current collection based on language selection
let currentCollection;

// Map of all available language collections
const activeCollections = {
    'en': activeCollectionEn,
    'pt-BR': activeCollectionPtBR
};

// ================================
// COLLECTION LOADING
// ================================
// Purpose: Load the active collection from the new structure

/**
 * Loads the active collection from the new locales structure.
 * This function loads the active collection and returns it for use in the application.
 * @returns {Array} The active collection array containing all cards and deck information
 * @example
 * const collection = loadCollection(); // Returns the active collection
 */
export function loadCollection() {
    // ================================
    // ACTIVE COLLECTION LOADING
    // ================================
    // Purpose: Load the active collection from the new structure

    // Get current language from localStorage or default to English
    const currentLanguage = localStorage.getItem('locale') || 'en';

    // Load collection based on current language
    currentCollection = activeCollections[currentLanguage] || activeCollections['en'];

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
    currentCollection = activeCollections[currentLanguage] || activeCollections['en'];

    // Return the updated collection for use in other parts of the application
    return currentCollection;
}


