// ---------------------------------
// --------- CARDS DATA -----------
// ---------------------------------
// This file manages the card collection data and provides functions to load the active collection.
// It handles loading the active collection from the new separated data + translations structure.

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import raw data and translations from the new structure

// Import raw collection data (stars, isGold, etc.)
import { activeCollectionData } from '../locales/collections/active/activeData.js';

// Import translations for each language
import { activeCollection as activeCollectionEn } from '../locales/collections/active/en.js';
import { activeCollection as activeCollectionPtBR } from '../locales/collections/active/pt-BR.js';
import { activeCollection as activeCollectionEs } from '../locales/collections/active/es.js';
import { activeCollection as activeCollectionDe } from '../locales/collections/active/de.js';
import { activeCollection as activeCollectionFr } from '../locales/collections/active/fr.js';

// ================================
// UTILITY FUNCTIONS
// ================================
// Purpose: Combine raw data with translations to create full collection objects

/**
 * Combines raw collection data with translations to create a complete collection
 * @param {Object} translations - Translation object containing decks, legends, and cards
 * @returns {Array} Complete collection array with translated names
 */
function createActiveCollection(translations) {
    return activeCollectionData.map(deck => ({
        id: deck.id,
        name: translations.decks[deck.id],
        legend: translations.legends[deck.id],
        cards: deck.cards.map(card => ({
            id: card.id,
            name: translations.cards[card.id],
            stars: card.stars,
            isGold: card.isGold
        }))
    }));
}

// ================================
// GLOBAL VARIABLES
// ================================
// Purpose: Store the currently loaded collection data

// Variable to hold the current collection based on language selection
let currentCollection;

// Map of all available language collections (pre-combined data + translations)
const activeCollections = {
    'en': createActiveCollection(activeCollectionEn),
    'pt-BR': createActiveCollection(activeCollectionPtBR),
    'es': createActiveCollection(activeCollectionEs),
    'de': createActiveCollection(activeCollectionDe),
    'fr': createActiveCollection(activeCollectionFr)
};

// Map of translation objects for getting collection names
const translationObjects = {
    'en': activeCollectionEn,
    'pt-BR': activeCollectionPtBR,
    'es': activeCollectionEs,
    'de': activeCollectionDe,
    'fr': activeCollectionFr
};

// ================================
// COLLECTION LOADING FUNCTIONS
// ================================
// Purpose: Load and manage the active collection based on current language

/**
 * Gets the collection name for the current language
 * @returns {string} The collection name in the current language
 */
export function getCollectionName() {
    const currentLanguage = localStorage.getItem('locale') || 'en';
    const translations = translationObjects[currentLanguage] || translationObjects['en'];
    return translations.activeCollectionName;
}

/**
 * Loads the active collection from the new locales structure.
 * This function loads the active collection and returns it for use in the application.
 * @returns {Array} The active collection array containing all cards and deck information
 * @example
 * const collection = loadCollection(); // Returns the active collection
 */
export function loadCollection() {
    // Get current language from localStorage or default to English
    const currentLanguage = localStorage.getItem('locale') || 'en';

    // Load collection based on current language
    currentCollection = activeCollections[currentLanguage] || activeCollections['en'];

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