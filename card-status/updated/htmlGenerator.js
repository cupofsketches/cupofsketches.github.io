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
        .map((card) => {
            // Handle gold (non-tradeable) cards differently
            if (card.isGold) {
                return `
                <div class="card gold">
                    <label class="cardName">${card.name}</label><br>
                    <div class="option">
                        <input type="radio" name="${card.name}" checked="false" value="owned" class="disabled">
                        <span style="color:rgb(179, 179, 179)"> Non-Trade </span>
                    </div>
                </div>
            `;
            } else {
                // Regular cards with full status options
                return `
                <div class="card">
                    <label class="cardName">${card.name}</label><br>
                    <div class="option">
                        <input type="radio" name="${card.name}" value="needed"> Needed<br>
                        <input type="radio" name="${card.name}" value="duplicate"> Duplicate<br>
                        <input type="radio" name="${card.name}" checked="false" value="owned" class="disabled">
                        <span style="color:rgb(179, 179, 179)"> Owned</span>
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
 */
export function renderCards() {
    const container = document.getElementById('cards-container'); // Main container div
    if (container) {
        container.innerHTML = currentCollection.map(generateCardsHTML).join('');
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
 * @returns {string} HTML string for the deck tab button
 */
export function generateDeckHTML(collection) {
    const deckId = collection.id;
    const deckName = collection.name;

    // First deck is active by default
    if (deckId === currentCollection[0].id) {
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
 */
export function renderDecks() {
    const container = document.getElementById('decks-container'); // Main container div
    if (container) {
        container.innerHTML = currentCollection.map(generateDeckHTML).join('');
    }
}
