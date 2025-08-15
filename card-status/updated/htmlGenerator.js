// ---------------------------------
// -------- HTML GENERATOR ---------
// ---------------------------------
// This file handles the dynamic generation of HTML content for the card status tool.
// It creates the card display forms and deck navigation tabs based on the current collection data.

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import necessary data and functions from other modules

import { loadCollection } from './cardsData.js';

// ================================
// GLOBAL VARIABLES
// ================================
// Purpose: Initialize and store the current collection data

// Load the current collection from cards data
const currentCollection = loadCollection();

// ================================
// MEMORY MANAGEMENT
// ================================
// Purpose: Track and clean up event listeners and DOM references

// Store references to event listeners for cleanup
const eventListeners = new Map();

/**
 * Cleans up event listeners and DOM references to prevent memory leaks
 * Should be called when the application is being destroyed or reset
 */
export function cleanupHTMLGenerator() {
    // Remove all stored event listeners
    eventListeners.forEach((listener, element) => {
        if (element && element.removeEventListener) {
            element.removeEventListener('click', listener);
        }
    });

    // Clear the event listeners map
    eventListeners.clear();
}

// ================================
// CARD HTML GENERATION
// ================================
// Purpose: Generate HTML for individual cards and collection forms

/**
 * Generates HTML for a complete collection of cards
 * Creates a form with radio button options for each card's status
 * @param {Object} collection - The collection object containing cards and metadata
 * @returns {string} HTML string for the collection form
 */
export function generateCardsHTML(collection) {
    // ================================
    // FORM ID GENERATION
    // ================================
    // Purpose: Create unique identifiers for each collection form

    const formId = `${collection.id}-form`;

    // ================================
    // CARD HTML GENERATION
    // ================================
    // Purpose: Generate HTML for each individual card in the collection

    const cardsHTML = collection.cards
        .map((card, cardIndex) => {
            // Create unique IDs for each radio button
            const neededId = `${collection.id}-${card.name}-needed`;
            const duplicateId = `${collection.id}-${card.name}-duplicate`;
            const ownedId = `${collection.id}-${card.name}-owned`;

            // Handle gold (non-tradeable) cards differently
            if (card.isGold) {
                return `
                <div class="card gold">
                    <label class="cardName" for="${ownedId}">${card.name}</label><br>
                    <div class="option">
                        <input type="radio" id="${ownedId}" name="${card.name}" checked="false" value="owned" class="disabled">
                        <span style="color:rgb(179, 179, 179)"> Non-Trade </span>
                    </div>
                </div>
            `;
            } else {
                // Regular cards with full status options
                return `
            <div class="card" data-card-id="${card.id}" data-collection-id="${collection.id}">
                <label class="cardName" for="${neededId}">${card.name}</label><br>
                <div class="option">
                    <input type="radio" id="${neededId}" name="${card.name}" value="needed" data-card-id="${card.id}" data-collection-id="${collection.id}"> 
                    <label for="${neededId}" style="display: inline; font-weight: normal;">Needed</label><br>
                    <input type="radio" id="${duplicateId}" name="${card.name}" value="duplicate" data-card-id="${card.id}" data-collection-id="${collection.id}"> 
                    <label for="${duplicateId}" style="display: inline; font-weight: normal;">Duplicate</label><br>
                    <input type="radio" id="${ownedId}" name="${card.name}" checked="false" value="owned" class="disabled" data-card-id="${card.id}" data-collection-id="${collection.id}">
                    <label for="${ownedId}" style="display: inline; font-weight: normal; color:rgb(179, 179, 179);">Owned</label>
                </div>
            </div>
        `;
            }
        })
        .join('');

    // ================================
    // COMPLETE FORM ASSEMBLY
    // ================================
    // Purpose: Combine all elements into a complete collection form

    return `
        <div id="${collection.id}" class="tabcontent">
            <form id="${formId}" class="collection-form" data-collection="${collection.id}">
                <fieldset class="fieldset divider">
                    <legend>${collection.legend}</legend>
                    <div class="card-container">
                        ${cardsHTML}
                    </div>
                </fieldset>
            </form>
        </div>
    `;
}

/**
 * Renders all card collections to the main cards container
 * This function populates the cards-container div with all collection forms
 * @param {Array} collection - The collection data to render
 */
export function renderCards(collection) {
    const container = document.getElementById('cards-container'); // Main container div
    if (container) {
        if (collection && collection.length > 0) {
            container.innerHTML = collection.map(generateCardsHTML).join('');
        } else {
            container.innerHTML = '<p>No card data available</p>';
        }
    }
}

// ================================
// DECK HTML GENERATION
// ================================
// Purpose: Generate HTML for deck navigation tabs

/**
 * Generates HTML for a single deck navigation tab
 * Creates a button that can be clicked to switch between different card collections
 * Note: Event listeners are now added in main.js instead of inline onclick
 * @param {Object} collection - The collection object containing deck information
 * @param {number} index - The index of this deck in the collection array
 * @returns {string} HTML string for the deck tab button
 */
export function generateDeckHTML(collection, index) {
    const deckId = collection.id;
    const deckName = collection.name;

    // First deck is active by default
    if (index === 0) {
        return `
        <button class="tablink active" data-collection="${deckId}">
            ${deckName}
        </button>
        `;
    } else {
        // Other decks start as inactive
        return `
        <button class="tablink" data-collection="${deckId}">
            ${deckName}
        </button>
    `;
    }
}

/**
 * Renders all deck tabs to the decks container
 * This function populates the decks-container div with navigation buttons
 * @param {Array} collection - The collection data to render
 */
export function renderDecks(collection) {
    const container = document.getElementById('decks-container'); // Main container div
    if (container) {
        if (collection && collection.length > 0) {
            container.innerHTML = collection.map((deck, index) => generateDeckHTML(deck, index)).join('');
        } else {
            container.innerHTML = '<p>No deck data available</p>';
        }
    }
}
