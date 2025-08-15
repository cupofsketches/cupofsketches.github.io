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
    // Cache DOM elements once to avoid repeated queries
    const domElements = {
        // Section headers
        saveLoadSection: document.getElementById("saveLoadSection"),
        chooseDecksSection: document.getElementById("chooseDecksSection"),
        generateTextSection: document.getElementById("generateTextSection"),

        // Main buttons
        saveButton: document.getElementById("saveOptionsBtn"),
        loadButton: document.getElementById("loadOptionsBtn"),

        // Format buttons
        redditButton: document.getElementById("show-reddit-format"),
        inGameButton: document.getElementById("show-in-game-format"),

        // Warning popup elements
        warningMessage: document.getElementById("warningMessage"),
        closeWarningButton: document.getElementById("closeWarningBtn"),

        // File name popup buttons
        confirmSaveButton: document.getElementById("confirmSaveBtn"),
        cancelButton: document.getElementById("cancelBtn"),

        // File name validation popup elements
        fileNameValidationTitle: document.getElementById("fileNameValidationTitle"),
        fileNameValidationMessage: document.getElementById("fileNameValidationMessage"),
        okFileNameValidationButton: document.getElementById("okFileNameValidationBtn"),

        // Input placeholders
        fileNameInput: document.getElementById("fileNameInput")
    };

    // ================================
    // USER MESSAGE TRANSLATIONS
    // ================================
    // Purpose: Update user guidance messages with translated text

    // Reddit format user message
    const redditFormatDescription = document.getElementById('reddit-format-description');
    if (redditFormatDescription) {
        redditFormatDescription.textContent = translate("messages.redditUserMessage");
    }

    // In-game format user message
    const inGameFormatDescription = document.getElementById('in-game-format-description');
    if (inGameFormatDescription) {
        inGameFormatDescription.textContent = translate("messages.inGameUserMessage");
    }

    // Format titles
    const redditFormatTitle = document.getElementById('redditFormatTitle');
    if (redditFormatTitle) {
        redditFormatTitle.textContent = translate("format.redditFormatTitle");
    }

    const inGameFormatTitle = document.getElementById('inGameFormatTitle');
    if (inGameFormatTitle) {
        inGameFormatTitle.textContent = translate("format.inGameFormatTitle");
    }

    // Character limit description
    const characterLimitDescription = document.querySelector('[data-translate="format.characterLimitDescription"]');
    if (characterLimitDescription) {
        characterLimitDescription.textContent = translate("format.characterLimitDescription");
    }

    // ================================
    // SECTION HEADERS
    // ================================
    // Purpose: Update main section titles with translated text

    // "Save & Load Card Status" section
    if (domElements.saveLoadSection) {
        domElements.saveLoadSection.textContent = translate("ids.saveLoadSection");
    }

    // "Choose Decks:" section
    if (domElements.chooseDecksSection) {
        domElements.chooseDecksSection.textContent = translate("ids.chooseDecksSection");
    }

    // "Generate Text" section
    if (domElements.generateTextSection) {
        domElements.generateTextSection.textContent = translate("ids.generateTextSection");
    }

    // ================================
    // MAIN BUTTONS
    // ================================
    // Purpose: Update button labels with translated text

    // Save button
    if (domElements.saveButton) {
        domElements.saveButton.textContent = translate("ids.saveOptionsBtn");
    }

    // Load button
    if (domElements.loadButton) {
        domElements.loadButton.textContent = translate("ids.loadOptionsBtn");
    }

    // ================================
    // FORMAT BUTTONS (WITH <br>)
    // ================================
    // Purpose: Update format buttons that include line breaks using innerHTML

    // "Show Reddit<br>Format" button
    if (domElements.redditButton) {
        domElements.redditButton.innerHTML = translate("ids.show-reddit-format");
    }

    // "Show In-Game<br>Format" button
    if (domElements.inGameButton) {
        domElements.inGameButton.innerHTML = translate("ids.show-in-game-format");
    }

    // ================================
    // POPUP LABELS
    // ================================
    // Purpose: Update popup text and button labels with translated content

    // Warning popup elements
    if (domElements.warningMessage) {
        domElements.warningMessage.textContent = translate("ids.warningMessage");
    }

    if (domElements.closeWarningButton) {
        domElements.closeWarningButton.textContent = translate("ids.closeWarningBtn");
    }

    // File name popup buttons
    if (domElements.confirmSaveButton) {
        domElements.confirmSaveButton.textContent = translate("ids.confirmSaveBtn");
    }

    if (domElements.cancelButton) {
        domElements.cancelButton.textContent = translate("ids.cancelBtn");
    }

    // File name validation popup elements
    if (domElements.fileNameValidationTitle) {
        domElements.fileNameValidationTitle.textContent = translate("ids.fileNameValidationTitle");
    }

    if (domElements.fileNameValidationMessage) {
        domElements.fileNameValidationMessage.textContent = translate("ids.fileNameValidationMessage");
    }

    if (domElements.okFileNameValidationButton) {
        domElements.okFileNameValidationButton.textContent = translate("ids.okFileNameValidationBtn");
    }

    // ================================
    // INPUT PLACEHOLDERS
    // ================================
    // Purpose: Update input field placeholders with translated text

    if (domElements.fileNameInput) {
        domElements.fileNameInput.placeholder = translate("placeholders.fileNameInput");
    }
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
    // Get initial language from custom selector or default to English
    const currentLanguageElement = document.getElementById("currentLanguage");
    let initialLanguage = "en";

    if (currentLanguageElement) {
        const currentLanguageName = currentLanguageElement.querySelector('.language-name').textContent;
        if (currentLanguageName === 'Português') {
            initialLanguage = "pt-BR";
        } else if (currentLanguageName === 'Español') {
            initialLanguage = "es";
        }
    }

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
    const languageSelector = document.getElementById('currentLanguage');
    const languageDropdown = document.getElementById('languageDropdown');

    if (!languageSelector || !languageDropdown) return;

    // Toggle dropdown visibility
    languageSelector.addEventListener('click', () => {
        const isActive = languageSelector.parentElement.classList.contains('active');
        if (isActive) {
            languageSelector.parentElement.classList.remove('active');
        } else {
            languageSelector.parentElement.classList.add('active');
        }
    });

    // Handle language option selection
    languageDropdown.addEventListener('click', async (event) => {
        const languageOption = event.target.closest('.language-option');
        if (!languageOption) return;

        const selectedValue = languageOption.dataset.value;
        const selectedFlag = languageOption.dataset.flag;
        const selectedName = languageOption.dataset.name;

        // Update current language display
        const currentFlag = languageSelector.querySelector('.language-flag');
        const currentName = languageSelector.querySelector('.language-name');

        if (currentFlag) currentFlag.textContent = selectedFlag;
        if (currentName) currentName.textContent = selectedName;

        // Update selected state in dropdown
        languageDropdown.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('selected');
        });
        languageOption.classList.add('selected');

        // Close dropdown
        languageSelector.parentElement.classList.remove('active');

        // Change language and re-apply labels
        await setLocale(selectedValue);
        applyLabels();

        // Regenerate format text with new language
        generateRedditFormat();
        generateInGameFormat();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!languageSelector.contains(event.target) && !languageDropdown.contains(event.target)) {
            languageSelector.parentElement.classList.remove('active');
        }
    });

    // Set initial selected state
    const currentLanguage = languageSelector.querySelector('.language-name').textContent;
    if (currentLanguage === 'English') {
        languageDropdown.querySelector('[data-value="en"]').classList.add('selected');
    } else if (currentLanguage === 'Português') {
        languageDropdown.querySelector('[data-value="pt-BR"]').classList.add('selected');
    } else if (currentLanguage === 'Español') {
        languageDropdown.querySelector('[data-value="es"]').classList.add('selected');
    }
}

// ================================
// MEMORY MANAGEMENT
// ================================
// Purpose: Clean up resources and prevent memory leaks

/**
 * Safely removes an event listener from an element
 * @param {Element} element - The DOM element to remove the listener from
 * @param {string} eventType - The type of event (e.g., 'click', 'change')
 * @param {Function} listener - The event listener function to remove
 */
function safeRemoveEventListener(element, eventType, listener) {
    try {
        if (element && element.removeEventListener) {
            element.removeEventListener(eventType, listener);
        }
    } catch (error) {
        console.warn('Error removing event listener:', error);
    }
}

/**
 * Cleans up all event listeners and resources to prevent memory leaks
 * Should be called when the application is being destroyed or reset
 */
function cleanupApplication() {
    try {
        // Remove all event listeners from DOM elements
        const allButtons = document.querySelectorAll('button');
        const allInputs = document.querySelectorAll('input');

        // Clone elements to remove all event listeners
        allButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
        });

        allInputs.forEach(input => {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
        });

        // Clear any stored references
        if (window.currentCollection) {
            window.currentCollection = null;
        }

        console.log('Application cleanup completed');
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}

// Add cleanup on page unload
window.addEventListener('beforeunload', cleanupApplication);

// ================================
// EVENT LISTENERS
// ================================
// Purpose: Set up all event handlers for user interactions

/**
 * Main initialization function that runs when the DOM is loaded
 * Sets up all event listeners and initializes the application
 */
document.addEventListener('DOMContentLoaded', async function () {
    try {
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
        try {
            const subtitleElement = document.querySelector('h1 span.subtitle');
            if (subtitleElement) {
                subtitleElement.textContent = `- ${season.charAt(0).toUpperCase() + season.slice(1)} Collection -`;
            }
        } catch (error) {
            console.warn('Could not update subtitle:', error);
        }

        // Render cards and decks dynamically
        try {
            renderCards();
            renderDecks();
        } catch (error) {
            console.error('Error rendering cards and decks:', error);
            // Show user-friendly error message
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Error loading card data. Please refresh the page.';
            errorMessage.style.color = 'red';
            errorMessage.style.textAlign = 'center';
            errorMessage.style.padding = '20px';
            document.body.insertBefore(errorMessage, document.body.firstChild);
        }

        // ================================
        // DOM ELEMENT CACHING
        // ================================
        // Purpose: Cache frequently used DOM elements to avoid repeated queries

        const domElements = {
            // Tab elements
            firstCollection: currentCollection[0],
            firstTabLink: document.querySelector('.tablink'),
            deckTabButtons: document.querySelectorAll('.tablink'),

            // Form elements
            cardStatusFields: document.querySelectorAll('.collection-form input[type="radio"], .collection-form input[type="checkbox"]'),

            // Format buttons
            redditFormatButton: document.getElementById('show-reddit-format'),
            inGameFormatButton: document.getElementById('show-in-game-format'),

            // Save functionality
            saveButton: document.getElementById('saveOptionsBtn'),
            closeWarningButton: document.getElementById('closeWarningBtn'),
            okFileNameValidationButton: document.getElementById('okFileNameValidationBtn'),

            // Load functionality
            loadButton: document.getElementById('loadOptionsBtn'),
            loadInput: document.getElementById('loadInput')
        };

        // ================================
        // TAB FUNCTIONALITY
        // ================================
        // Purpose: Handle deck tab switching and display

        /**
         * Opens a specific collection tab and updates the UI accordingly
         * @param {string} collectionDeck - The ID of the collection to open
         */
        function openCollection(collectionDeck) {
            try {
                // Cache DOM elements to avoid repeated queries
                const tabContents = document.querySelectorAll('.tabcontent');
                const tabLinks = document.querySelectorAll('.tablink');

                // Hide all tab contents
                tabContents.forEach(tabContent => {
                    if (tabContent) {
                        tabContent.style.display = 'none';
                    }
                });

                // Remove active class from all tab links
                tabLinks.forEach(tabLink => {
                    if (tabLink) {
                        tabLink.classList.remove('active');
                    }
                });

                // Show the selected tab content
                const currentTabContent = document.getElementById(collectionDeck);
                if (currentTabContent) {
                    currentTabContent.style.display = 'block';
                }

                // Add active class to the clicked tab link
                const clickedTabLink = document.querySelector(`.tablink[data-collection="${collectionDeck}"]`);
                if (clickedTabLink) {
                    clickedTabLink.classList.add('active');
                }
            } catch (error) {
                console.error('Error opening collection:', error);
            }
        }

        /**
         * Sets up all event listeners and initializes the application
         */
        try {
            // Set first tab as active by default
            if (domElements.firstCollection && domElements.firstCollection.id) {
                const firstTab = document.getElementById(domElements.firstCollection.id);
                if (firstTab) {
                    firstTab.style.display = 'block';
                }
            }

            if (domElements.firstTabLink) {
                domElements.firstTabLink.classList.add('active');
            }

            // Add event listeners for collection tabs
            if (domElements.deckTabButtons && domElements.deckTabButtons.length > 0) {
                domElements.deckTabButtons.forEach((deckTabButton) => {
                    deckTabButton.addEventListener('click', function () {
                        try {
                            const collectionName = deckTabButton.getAttribute('data-collection');
                            if (collectionName) {
                                openCollection(collectionName);
                            }
                        } catch (error) {
                            console.error('Error opening collection:', error);
                        }
                    });
                });
            }
        } catch (error) {
            console.error('Error setting up tab functionality:', error);
        }

        // ================================
        // TEXT FORMAT GENERATION
        // ================================
        // Purpose: Handle form input changes and format generation

        try {
            // Add event listeners for form inputs (radio buttons and checkboxes)
            if (domElements.cardStatusFields && domElements.cardStatusFields.length > 0) {
                domElements.cardStatusFields.forEach((cardStatusField) => {
                    cardStatusField.addEventListener('change', () => {
                        try {
                            hideUserMessage();
                            generateRedditFormat();
                            generateInGameFormat();
                        } catch (error) {
                            console.error('Error generating formats:', error);
                        }
                    });
                });
            }

            // Add event listeners for showing different format types
            if (domElements.redditFormatButton) {
                domElements.redditFormatButton.addEventListener('click', showRedditFormat);
            }

            if (domElements.inGameFormatButton) {
                domElements.inGameFormatButton.addEventListener('click', showInGameFormat);
            }
        } catch (error) {
            console.error('Error setting up format generation:', error);
        }

        // ================================
        // SAVE FUNCTIONALITY
        // ================================
        // Purpose: Handle saving card status data

        try {
            // Add event listener for save button
            if (domElements.saveButton) {
                domElements.saveButton.addEventListener('click', saveOptions);
            }

            // Add event listener for warning popup OK button
            if (domElements.closeWarningButton) {
                domElements.closeWarningButton.addEventListener('click', hideWarningPopup);
            }

            // Add event listener for file name validation popup OK button
            if (domElements.okFileNameValidationButton) {
                domElements.okFileNameValidationButton.addEventListener('click', hideFileNameValidationPopup);
            }
        } catch (error) {
            console.error('Error setting up save functionality:', error);
        }

        // ================================
        // LOAD FUNCTIONALITY
        // ================================
        // Purpose: Handle loading previously saved card status data

        try {
            // Add event listeners for load functionality
            if (domElements.loadButton && domElements.loadInput) {
                domElements.loadButton.addEventListener('click', () => {
                    try {
                        domElements.loadInput.click();
                    } catch (error) {
                        console.error('Error triggering file input:', error);
                    }
                });

                domElements.loadInput.addEventListener('change', loadOptions);
            }
        } catch (error) {
            console.error('Error setting up load functionality:', error);
        }

        // ================================
        // INITIAL FORMAT GENERATION
        // ================================
        // Purpose: Generate initial format displays when page loads

        try {
            // Generate formats initially to show default state
            generateRedditFormat();
            generateInGameFormat();
        } catch (error) {
            console.error('Error generating initial formats:', error);
        }

    } catch (error) {
        console.error('Critical error during application initialization:', error);
        // Show critical error message to user
        const criticalError = document.createElement('div');
        criticalError.textContent = 'Critical error during initialization. Please refresh the page or contact support.';
        criticalError.style.color = 'red';
        criticalError.style.textAlign = 'center';
        criticalError.style.padding = '20px';
        criticalError.style.backgroundColor = '#ffe6e6';
        criticalError.style.border = '1px solid #ff9999';
        criticalError.style.borderRadius = '5px';
        criticalError.style.margin = '20px';
        document.body.insertBefore(criticalError, document.body.firstChild);
    }
});
