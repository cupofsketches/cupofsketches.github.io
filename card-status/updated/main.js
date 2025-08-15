// ---------------------------------
// ------------ MAIN.JS ------------
// ---------------------------------
// This file serves as the main entry point for the Royal Match Card Status Tool application.
// It handles initialization, event listeners, internationalization, and coordinates all other modules.

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import all necessary modules and functions from other files

import { translate, setLocale } from "./i18n.js";
import { loadCollection, season } from './cardsData.js';
import { renderCards, renderDecks } from './htmlGenerator.js';
import { generateRedditFormat, generateInGameFormat } from './formatGenerators.js';
import { showRedditFormat, showInGameFormat, hideUserMessage } from './formatView.js';
import { hideWarningPopup, hideFileNameValidationPopup } from './popupHandler.js';
import { saveOptions, loadOptions } from './fileOperations.js';

// ================================
// GLOBAL VARIABLES
// ================================
// Purpose: Initialize and store application-wide data

// Load the current collection from cards data
const currentCollection = loadCollection();

// ================================
// INTERNATIONALIZATION (I18N)
// ================================
// Purpose: Handle multi-language support and apply translated labels to the UI

/**
 * Applies translated labels to all UI elements
 * This function updates text content throughout the interface based on the selected language
 */
function applyLabels() {
    // Apply translations to UI elements

    // ================================
    // SECTION HEADERS
    // ================================
    // Purpose: Update main section titles with translated text

    // "Save & Load Card Status" section
    const saveLoadSection = document.getElementById("saveLoadSection");
    if (saveLoadSection) saveLoadSection.textContent = translate("ids.saveLoadSection");

    // "Choose Decks:" section
    const chooseDecksSection = document.getElementById("chooseDecksSection");
    if (chooseDecksSection) chooseDecksSection.textContent = translate("ids.chooseDecksSection");

    // "Generate Text" section
    const generateTextSection = document.getElementById("generateTextSection");
    if (generateTextSection) generateTextSection.textContent = translate("ids.generateTextSection");

    // ================================
    // MAIN BUTTONS
    // ================================
    // Purpose: Update button labels with translated text

    // Save button
    const saveButton = document.getElementById("saveOptionsBtn");
    if (saveButton) saveButton.textContent = translate("ids.saveOptionsBtn");

    // Load button
    const loadButton = document.getElementById("loadOptionsBtn");
    if (loadButton) loadButton.textContent = translate("ids.loadOptionsBtn");

    // ================================
    // FORMAT BUTTONS (WITH <br>)
    // ================================
    // Purpose: Update format buttons that include line breaks using innerHTML

    // "Show Reddit<br>Format" button
    const redditButton = document.getElementById("show-reddit-format");
    if (redditButton) redditButton.innerHTML = translate("ids.show-reddit-format");

    // "Show In-Game<br>Format" button
    const inGameButton = document.getElementById("show-in-game-format");
    if (inGameButton) inGameButton.innerHTML = translate("ids.show-in-game-format");

    // ================================
    // POPUP LABELS
    // ================================
    // Purpose: Update popup text and button labels with translated content

    // Warning popup elements
    const warningMsg = document.getElementById("warningMessage");
    if (warningMsg) warningMsg.textContent = translate("ids.warningMessage");

    const closeWarningButton = document.getElementById("closeWarningBtn");
    if (closeWarningButton) closeWarningButton.textContent = translate("ids.closeWarningBtn");

    // File name popup buttons
    const confirmSaveButton = document.getElementById("confirmSaveBtn");
    if (confirmSaveButton) confirmSaveButton.textContent = translate("ids.confirmSaveBtn");

    const cancelButton = document.getElementById("cancelBtn");
    if (cancelButton) cancelButton.textContent = translate("ids.cancelBtn");

    // File name validation popup elements
    const fileNameValidationTitle = document.getElementById("fileNameValidationTitle");
    if (fileNameValidationTitle) fileNameValidationTitle.textContent = translate("ids.fileNameValidationTitle");

    const fileNameValidationMessage = document.getElementById("fileNameValidationMessage");
    if (fileNameValidationMessage) fileNameValidationMessage.textContent = translate("ids.fileNameValidationMessage");

    const okFileNameValidationButton = document.getElementById("okFileNameValidationBtn");
    if (okFileNameValidationButton) okFileNameValidationButton.textContent = translate("ids.okFileNameValidationBtn");

    // ================================
    // INPUT PLACEHOLDERS
    // ================================
    // Purpose: Update input field placeholders with translated text

    const fileNameInput = document.getElementById("fileNameInput");
    if (fileNameInput) fileNameInput.placeholder = translate("placeholders.fileNameInput");
}

// ================================
// I18N INITIALIZATION
// ================================
// Purpose: Bootstrap the internationalization system and load initial language

/**
 * Initializes the internationalization system
 * Loads the selected language and applies translated labels
 */
async function bootI18n() {
    // Get initial language from dropdown or default to English
    const languageSelector = document.getElementById("langSel");
    const initialLanguage = languageSelector ? languageSelector.value : "en";

    // Load the language dictionary
    await setLocale(initialLanguage);

    // Apply translated labels to the UI
    applyLabels();
}

/**
 * Sets up the language selector dropdown
 * Handles language changes and re-applies labels when language is switched
 */
function initLanguageSelector() {
    const languageSelector = document.getElementById("langSel");
    if (!languageSelector) return;

    // When user changes language, reload it and re-label the UI
    languageSelector.addEventListener("change", async () => {
        await setLocale(languageSelector.value);
        applyLabels();
        // Note: If you later localize dynamic decks/cards, re-render here:
        // renderCards();
        // renderDecks();
    });
}

// ================================
// EVENT LISTENERS
// ================================
// Purpose: Set up all event handlers for user interactions

/**
 * Main initialization function that runs when the DOM is loaded
 * Sets up all event listeners and initializes the application
 */
document.addEventListener('DOMContentLoaded', async function () {
    // ================================
    // I18N INITIALIZATION
    // ================================
    // Purpose: Initialize internationalization first

    await bootI18n();
    initLanguageSelector();

    // ================================
    // HTML GENERATION
    // ================================
    // Purpose: Generate and render the dynamic HTML content

    // Update the subtitle with current season information
    const subtitleElement = document.querySelector('h1 span.subtitle');
    if (subtitleElement) {
        subtitleElement.textContent = `- ${season.charAt(0).toUpperCase() + season.slice(1)} Collection -`;
    }

    // Render cards and decks dynamically
    renderCards();
    renderDecks();

    // ================================
    // TAB FUNCTIONALITY
    // ================================
    // Purpose: Handle deck tab switching and display

    // Set first tab as active by default
    document.getElementById(currentCollection[0].id).style.display = 'block';
    document.querySelector('.tablink').classList.add('active');

    // Add event listeners for collection tabs
    const deckTabButtons = document.querySelectorAll('.tablink');
    deckTabButtons.forEach((deckTabButton) => {
        deckTabButton.addEventListener('click', function () {
            openCollection(deckTabButton.getAttribute('data-collection'));
        });
    });

    // ================================
    // TEXT FORMAT GENERATION
    // ================================
    // Purpose: Handle form input changes and format generation

    // Add event listeners for form inputs (radio buttons and checkboxes)
    const cardStatusFields = document.querySelectorAll(
        '.collection-form input[type="radio"], .collection-form input[type="checkbox"]'
    );

    cardStatusFields.forEach((cardStatusField) => {
        cardStatusField.addEventListener('change', () => {
            hideUserMessage();
            generateRedditFormat();
            generateInGameFormat();
        });
    });

    // Add event listeners for showing different format types
    document.getElementById('show-reddit-format').addEventListener('click', showRedditFormat);
    document.getElementById('show-in-game-format').addEventListener('click', showInGameFormat);

    // ================================
    // SAVE FUNCTIONALITY
    // ================================
    // Purpose: Handle saving card status data

    // Add event listener for save button
    document.getElementById('saveOptionsBtn').addEventListener('click', saveOptions);

    // Add event listener for warning popup OK button
    document.getElementById('closeWarningBtn').addEventListener('click', hideWarningPopup);

    // Add event listener for file name validation popup OK button
    document.getElementById('okFileNameValidationBtn').addEventListener('click', hideFileNameValidationPopup);

    // ================================
    // LOAD FUNCTIONALITY
    // ================================
    // Purpose: Handle loading previously saved card status data

    // Add event listeners for load functionality
    document.getElementById('loadOptionsBtn').addEventListener('click', () => {
        document.getElementById('loadInput').click();
    });
    document.getElementById('loadInput').addEventListener('change', loadOptions);

    // ================================
    // INITIAL FORMAT GENERATION
    // ================================
    // Purpose: Generate initial format displays when page loads

    // Generate formats initially to show default state
    generateRedditFormat();
    generateInGameFormat();
});
