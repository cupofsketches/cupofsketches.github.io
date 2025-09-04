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
import { loadCollection, reloadCollection } from './cardsData.js';
import { getCollectionName } from './cardsData.js';
import { renderCards, renderDecks } from './htmlGenerator.js';
import { generateRedditFormat, generateInGameFormat } from './formatGenerators.js';
import { showRedditFormat, showInGameFormat, hideUserMessage } from './formatView.js';
import { hideWarningPopup, hideFileNameValidationPopup, showResetConfirmationPopup } from './popupHandler.js';
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
        fileNameInput: document.getElementById("fileNameInput"),

        // Auto-save section header
        autoSaveSectionHeader: document.querySelector('[data-translate="autoSave.sectionHeader"]'),
        // Reset button
        resetButton: document.getElementById('resetAllBtn')
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

    // Auto-save status
    const autoSaveText = document.querySelector('[data-translate="autoSave.enabled"]');
    if (autoSaveText) {
        autoSaveText.textContent = translate("autoSave.enabled");
    }

    // Collection subtitle
    const subtitleElement = document.querySelector('h1 span.subtitle');
    if (subtitleElement) {
        subtitleElement.textContent = `- ${getCollectionName()} -`;
    }

    // ================================
    // SECTION HEADERS
    // ================================
    // Purpose: Update main section titles with translated text

    // "Card Management" section
    if (domElements.saveLoadSection) {
        domElements.saveLoadSection.textContent = translate("cardManagement.sectionHeader");
    }

    // "Choose Decks:" section
    if (domElements.chooseDecksSection) {
        domElements.chooseDecksSection.textContent = translate("deckSelection.sectionHeader");
    }

    // "Generate Text" section
    if (domElements.generateTextSection) {
        domElements.generateTextSection.textContent = translate("format.sectionHeader");
    }

    // ================================
    // MAIN BUTTONS
    // ================================
    // Purpose: Update button labels with translated text

    // Save button
    if (domElements.saveButton) {
        domElements.saveButton.textContent = translate("cardManagement.save");
    }

    // Load button
    if (domElements.loadButton) {
        domElements.loadButton.textContent = translate("cardManagement.load");
    }

    // Reset button
    if (domElements.resetButton) {
        domElements.resetButton.textContent = translate("cardManagement.reset");
    }

    // Bulk selection buttons
    const selectAllNeededBtn = document.getElementById('selectAllNeededBtn');
    const selectAllDuplicateBtn = document.getElementById('selectAllDuplicateBtn');
    const selectAllOwnedBtn = document.getElementById('selectAllOwnedBtn');

    if (selectAllNeededBtn) {
        selectAllNeededBtn.querySelector('span').textContent = translate("bulkSelection.needed");
    }

    if (selectAllDuplicateBtn) {
        selectAllDuplicateBtn.querySelector('span').textContent = translate("bulkSelection.duplicate");
    }

    if (selectAllOwnedBtn) {
        selectAllOwnedBtn.querySelector('span').textContent = translate("bulkSelection.owned");
    }

    // ================================
    // FORMAT BUTTONS (WITH <br>)
    // ================================
    // Purpose: Update format buttons that include line breaks using innerHTML

    // "Show Reddit<br>Format" button
    if (domElements.redditButton) {
        domElements.redditButton.innerHTML = translate("formatButtons.showRedditFormat");
    }

    // "Show In-Game<br>Format" button
    if (domElements.inGameButton) {
        domElements.inGameButton.innerHTML = translate("formatButtons.showInGameFormat");
    }

    // ================================
    // POPUP LABELS
    // ================================
    // Purpose: Update popup text and button labels with translated content

    // Warning popup elements
    if (domElements.warningMessage) {
        domElements.warningMessage.textContent = translate("warnings.noSelectionWarning");
    }

    if (domElements.closeWarningButton) {
        domElements.closeWarningButton.textContent = translate("cardManagement.ok");
    }

    // File name popup buttons
    if (domElements.confirmSaveButton) {
        domElements.confirmSaveButton.textContent = translate("cardManagement.confirmSave");
    }

    if (domElements.cancelButton) {
        domElements.cancelButton.textContent = translate("cardManagement.cancel");
    }

    // File name validation popup elements
    if (domElements.fileNameValidationTitle) {
        domElements.fileNameValidationTitle.textContent = translate("cardManagement.fileNameMissingTitle");
    }

    if (domElements.fileNameValidationMessage) {
        domElements.fileNameValidationMessage.textContent = translate("cardManagement.fileNameMissingMessage");
    }

    if (domElements.okFileNameValidationButton) {
        domElements.okFileNameValidationButton.textContent = translate("cardManagement.ok");
    }

    // ================================
    // INPUT PLACEHOLDERS
    // ================================
    // Purpose: Update input field placeholders with translated text

    if (domElements.fileNameInput) {
        domElements.fileNameInput.placeholder = translate("cardManagement.fileNamePlaceholder");
    }

    // Auto-save section header
    if (domElements.autoSaveSectionHeader) {
        console.log('🌍 Translating auto-save header to:', translate("autoSave.sectionHeader"));
        domElements.autoSaveSectionHeader.textContent = translate("autoSave.sectionHeader");
    } else {
        console.warn('⚠️ Auto-save header element not found');
    }

    // ================================
    // DATA-TRANSLATE ATTRIBUTES
    // ================================
    // Purpose: Translate all elements with data-translate attributes

    const dataTranslateElements = document.querySelectorAll('[data-translate]');
    console.log(`🌍 Found ${dataTranslateElements.length} elements with data-translate attributes`);

    dataTranslateElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (key) {
            const translatedText = translate(key);
            if (translatedText !== key) {
                element.textContent = translatedText;
                console.log(`✅ Translated ${key} to:`, translatedText);
            } else {
                console.warn(`⚠️ No translation found for key: ${key}`);
            }
        }
    });
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
    // Get saved language preference from localStorage or default to English
    let initialLanguage = localStorage.getItem('locale') || "en";

    // Validate the saved language is supported
    const supportedLanguages = ['en', 'pt-BR', 'es', 'de'];
    if (!supportedLanguages.includes(initialLanguage)) {
        initialLanguage = "en";
    }



    // Load the language dictionary
    await setLocale(initialLanguage);

    // Apply translated labels to the UI
    applyLabels();

    // Update the language selector display to show the saved preference
    updateLanguageSelectorDisplay(initialLanguage);
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

        // Save language preference to localStorage
        localStorage.setItem('locale', selectedValue);

        // Save current radio button states before switching languages
        const savedSelections = saveRadioButtonStates();

        await setLocale(selectedValue);
        applyLabels();

        // Reload collection data with new language
        const newCollection = reloadCollection();

        // Re-render cards and decks with new language
        renderCards(newCollection);
        renderDecks(newCollection);

        // Show the first tab after re-rendering
        if (newCollection && newCollection.length > 0) {
            const firstCollectionId = newCollection[0].id;
            const firstTabContent = document.getElementById(firstCollectionId);
            if (firstTabContent) {
                firstTabContent.style.display = 'block';

                // Show bulk selection section when first deck is displayed
                const bulkSelectionSection = document.getElementById('bulk-selection-section');
                if (bulkSelectionSection) {
                    bulkSelectionSection.style.display = 'block';
                }
            }
            // Hide all other tabs
            const allTabs = document.querySelectorAll('.tabcontent');
            allTabs.forEach(tab => {
                if (tab.id !== firstCollectionId) {
                    tab.style.display = 'none';
                }
            });

            // Update tab button states
            const allTabLinks = document.querySelectorAll('.tablink');
            allTabLinks.forEach(tabLink => {
                if (tabLink.getAttribute('data-collection') === firstCollectionId) {
                    tabLink.classList.add('active');
                } else {
                    tabLink.classList.remove('active');
                }
            });
        }

        // Regenerate format text with new language
        try {
            generateRedditFormat();
        } catch (error) {
            console.error('❌ Error generating Reddit format:', error);
        }

        try {
            generateInGameFormat();
        } catch (error) {
            console.error('❌ Error generating in-game format:', error);
        }

        // Debug: Check if event listeners are working
        const radioButtons = document.querySelectorAll('input[type="radio"]:not(.disabled)');

        const deckButtons = document.querySelectorAll('.tablink');
        console.log('🔗 Deck buttons found:', deckButtons.length);

        console.log('⚠️  NOTE: Event listeners may not be attached to these new elements!');

        // Re-attach event listeners to the newly rendered elements
        console.log('🔧 Re-attaching event listeners...');
        setupEventListeners();
        console.log('✅ Event listeners re-attached!');

        // Update the language selector display to show the new selected language
        updateLanguageSelectorDisplay(selectedValue);

        // Restore radio button selections after re-rendering
        console.log('🔄 Restoring radio button selections...');
        restoreRadioButtonStates(savedSelections);
        console.log('✅ Radio button selections restored!');

        // Re-save the restored selections in the new language context
        console.log('💾 Re-saving restored selections in new language...');
        autoSaveToLocalStorage();
        console.log('✅ Selections re-saved in new language context');
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
    } else if (currentLanguage === 'Deutsch') {
        languageDropdown.querySelector('[data-value="de"]').classList.add('selected');
    }
}

/**
 * Updates the language selector display to show the saved language preference.
 * This function is called after bootI18n to set the initial selected state.
 * @param {string} savedLanguage - The saved language preference (e.g., "en", "pt-BR", "es")
 */
function updateLanguageSelectorDisplay(savedLanguage) {
    const languageSelector = document.getElementById('currentLanguage');
    const languageDropdown = document.getElementById('languageDropdown');

    if (!languageSelector || !languageDropdown) return;

    // Update the current language display (flag and name)
    const currentFlag = languageSelector.querySelector('.language-flag');
    const currentName = languageSelector.querySelector('.language-name');

    // Update selected state in dropdown
    languageDropdown.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('selected');
    });

    if (savedLanguage === 'en') {
        if (currentFlag) currentFlag.textContent = '🇺🇸';
        if (currentName) currentName.textContent = 'English';
        languageDropdown.querySelector('[data-value="en"]').classList.add('selected');
    } else if (savedLanguage === 'pt-BR') {
        if (currentFlag) currentFlag.textContent = '🇧🇷';
        if (currentName) currentName.textContent = 'Português';
        languageDropdown.querySelector('[data-value="pt-BR"]').classList.add('selected');
    } else if (savedLanguage === 'es') {
        if (currentFlag) currentFlag.textContent = '🇪🇸';
        if (currentName) currentName.textContent = 'Español';
        languageDropdown.querySelector('[data-value="es"]').classList.add('selected');
    } else if (savedLanguage === 'de') {
        if (currentFlag) currentFlag.textContent = '🇩🇪';
        if (currentName) currentName.textContent = 'Deutsch';
        languageDropdown.querySelector('[data-value="de"]').classList.add('selected');
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
 * Sets up all event listeners for the application
 * This function can be called multiple times to re-attach listeners after DOM changes
 */
function setupEventListeners() {
    try {
        console.log('🔧 Setting up event listeners...');

        // Add event listeners for form inputs (radio buttons and checkboxes)
        const cardStatusFields = document.querySelectorAll('input[type="radio"]:not(.disabled)');
        console.log('📻 Adding listeners to', cardStatusFields.length, 'radio buttons');

        cardStatusFields.forEach((cardStatusField) => {
            // Remove existing listeners to avoid duplicates
            cardStatusField.removeEventListener('change', handleCardStatusChange);
            cardStatusField.addEventListener('change', handleCardStatusChange);
        });

        // Add event listeners for collection tabs
        const deckTabButtons = document.querySelectorAll('.tablink');
        console.log('🔗 Adding listeners to', deckTabButtons.length, 'deck buttons');

        deckTabButtons.forEach((deckTabButton) => {
            // Remove existing listeners to avoid duplicates
            deckTabButton.removeEventListener('click', handleTabClick);
            deckTabButton.addEventListener('click', handleTabClick);
        });

        // Add event listeners for copy buttons
        const copyRedditButton = document.getElementById('copy-reddit-format');
        const copyInGameButton = document.getElementById('copy-in-game-format');
        const copyNeedButton = document.getElementById('copy-need-section');
        const copyDuplicateButton = document.getElementById('copy-duplicate-section');

        if (copyRedditButton) {
            copyRedditButton.removeEventListener('click', () => copyToClipboard('reddit-format'));
            copyRedditButton.addEventListener('click', () => copyToClipboard('reddit-format'));
        }

        if (copyInGameButton) {
            copyInGameButton.removeEventListener('click', () => copyToClipboard('in-game-format'));
            copyInGameButton.addEventListener('click', () => copyToClipboard('in-game-format'));
        }

        if (copyNeedButton) {
            copyNeedButton.removeEventListener('click', () => copyToClipboard('need-section'));
            copyNeedButton.addEventListener('click', () => copyToClipboard('need-section'));
        }

        if (copyDuplicateButton) {
            copyDuplicateButton.removeEventListener('click', () => copyToClipboard('duplicate-section'));
            copyDuplicateButton.addEventListener('click', () => copyToClipboard('duplicate-section'));
        }

        // Set up bulk selection event listeners
        setupBulkSelectionEventListeners();

    } catch (error) {
        console.error('❌ Error setting up event listeners:', error);
    }
}

// ================================
// BULK SELECTION EVENT HANDLERS
// ================================
// Purpose: Set up event handlers for bulk selection buttons

function setupBulkSelectionEventListeners() {
    try {
        const selectAllNeededBtn = document.getElementById('selectAllNeededBtn');
        const selectAllDuplicateBtn = document.getElementById('selectAllDuplicateBtn');
        const selectAllOwnedBtn = document.getElementById('selectAllOwnedBtn');

        if (selectAllNeededBtn) {
            selectAllNeededBtn.addEventListener('click', selectAllCardsAsNeeded);
        }

        if (selectAllDuplicateBtn) {
            selectAllDuplicateBtn.addEventListener('click', selectAllCardsAsDuplicate);
        }

        if (selectAllOwnedBtn) {
            selectAllOwnedBtn.addEventListener('click', selectAllCardsAsOwned);
        }
    } catch (error) {
        console.error('❌ Error setting up bulk selection event listeners:', error);
    }
}

// ================================
// BULK SELECTION FUNCTIONS
// ================================
// Purpose: Handle bulk selection of all cards in the current deck

/**
 * Selects all cards in the currently visible deck as "needed"
 */
function selectAllCardsAsNeeded() {
    try {
        // Find the currently visible tab content
        const visibleTab = document.querySelector('.tabcontent[style*="block"]');
        if (!visibleTab) {
            return;
        }

        const deckName = visibleTab.id;

        // Get all radio buttons in the visible tab
        const radioButtons = visibleTab.querySelectorAll('input[type="radio"]:not(.disabled)');

        let updatedCount = 0;
        let nonGoldUpdatedCount = 0;
        radioButtons.forEach(radio => {
            if (radio.value === 'needed') {
                radio.checked = true;
                updatedCount++;
                // Check if this is not a gold card (gold cards only have one radio button)
                const cardContainer = radio.closest('.card');
                if (cardContainer && !cardContainer.classList.contains('gold')) {
                    nonGoldUpdatedCount++;
                }
            }
        });

        // Regenerate formats and auto-save
        generateRedditFormat();
        generateInGameFormat();
        autoSaveToLocalStorage();

        // Show brief success feedback with non-gold card count
        showBulkSelectionFeedback('needed', nonGoldUpdatedCount);

    } catch (error) {
        console.error('❌ Error selecting all cards as needed:', error);
    }
}

/**
 * Selects all cards in the currently visible deck as "duplicate"
 */
function selectAllCardsAsDuplicate() {
    try {
        console.log('🔄 Selecting all cards as duplicate...');

        // Find the currently visible tab content
        const visibleTab = document.querySelector('.tabcontent[style*="block"]');
        if (!visibleTab) {
            console.log('❌ No visible tab found');
            return;
        }

        const deckName = visibleTab.id;
        console.log('🎯 Target deck:', deckName);

        // Get all radio buttons in the visible tab
        const radioButtons = visibleTab.querySelectorAll('input[type="radio"]:not(.disabled)');
        console.log('📻 Found', radioButtons.length, 'radio buttons');

        let updatedCount = 0;
        let nonGoldUpdatedCount = 0;
        radioButtons.forEach(radio => {
            if (radio.value === 'duplicate') {
                radio.checked = true;
                updatedCount++;
                // Check if this is not a gold card (gold cards only have one radio button)
                const cardContainer = radio.closest('.card');
                if (cardContainer && !cardContainer.classList.contains('gold')) {
                    nonGoldUpdatedCount++;
                }
            }
        });

        console.log(`✅ Updated ${updatedCount} cards to "duplicate" status`);

        // Regenerate formats and auto-save
        generateRedditFormat();
        generateInGameFormat();
        autoSaveToLocalStorage();

        // Show brief success feedback with non-gold card count
        showBulkSelectionFeedback('duplicate', nonGoldUpdatedCount);

    } catch (error) {
        console.error('❌ Error selecting all cards as duplicate:', error);
    }
}

/**
 * Selects all cards in the currently visible deck as "owned"
 */
function selectAllCardsAsOwned() {
    try {
        console.log('🔄 Selecting all cards as owned...');

        // Find the currently visible tab content
        const visibleTab = document.querySelector('.tabcontent[style*="block"]');
        if (!visibleTab) {
            console.log('❌ No visible tab found');
            return;
        }

        const deckName = visibleTab.id;
        console.log('🎯 Target deck:', deckName);

        // Get all radio buttons in the visible tab
        const radioButtons = visibleTab.querySelectorAll('input[type="radio"]:not(.disabled)');
        console.log('📻 Found', radioButtons.length, 'radio buttons');

        let updatedCount = 0;
        let nonGoldUpdatedCount = 0;
        radioButtons.forEach(radio => {
            if (radio.value === 'owned') {
                radio.checked = true;
                updatedCount++;
                // Check if this is not a gold card (gold cards only have one radio button)
                const cardContainer = radio.closest('.card');
                if (cardContainer && !cardContainer.classList.contains('gold')) {
                    nonGoldUpdatedCount++;
                }
            }
        });

        console.log(`✅ Updated ${updatedCount} cards to "owned" status`);

        // Regenerate formats and auto-save
        generateRedditFormat();
        generateInGameFormat();
        autoSaveToLocalStorage();

        // Show brief success feedback with non-gold card count
        showBulkSelectionFeedback('owned', nonGoldUpdatedCount);

    } catch (error) {
        console.error('❌ Error selecting all cards as owned:', error);
    }
}

/**
 * Shows brief feedback for bulk selection actions
 */
function showBulkSelectionFeedback(action, count) {
    try {
        const feedbackElement = document.getElementById('bulk-selection-feedback');
        if (feedbackElement) {
            // Get translated status name with proper capitalization
            let statusName = '';
            switch (action) {
                case 'needed':
                    statusName = translate("bulkSelection.needed");
                    break;
                case 'duplicate':
                    statusName = translate("bulkSelection.duplicate");
                    break;
                case 'owned':
                    statusName = translate("bulkSelection.owned");
                    break;
                default:
                    statusName = action;
            }

            // Capitalize first letter and make bold
            const capitalizedStatus = statusName.charAt(0).toUpperCase() + statusName.slice(1);
            const boldStatus = `<strong>${capitalizedStatus}</strong>`;

            const feedbackText = translate("bulkSelection.feedbackMessage");
            feedbackElement.innerHTML = `✅ ${count} ${feedbackText} ${boldStatus}`;
            feedbackElement.style.display = 'block';

            // Hide after 3 seconds
            setTimeout(() => {
                feedbackElement.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('❌ Error showing bulk selection feedback:', error);
    }
}

// ================================
// CARD STATUS CHANGE HANDLER
// ================================
/**
 * Handle card status changes (radio button selections)
 */
function handleCardStatusChange() {
    try {

        hideUserMessage();

        generateRedditFormat();
        generateInGameFormat();

        // Auto-save the new selection
        autoSaveToLocalStorage();
    } catch (error) {
        console.error('❌ Error generating formats:', error);
    }
}

/**
 * Opens a specific collection tab and updates the UI accordingly
 * @param {string} collectionDeck - The ID of the collection to open
 */
function openCollection(collectionDeck) {
    try {
        console.log('🔄 Opening collection:', collectionDeck);
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
            console.log('✅ Tab content shown:', collectionDeck);

            // Show bulk selection section when a deck is opened
            const bulkSelectionSection = document.getElementById('bulk-selection-section');
            if (bulkSelectionSection) {
                bulkSelectionSection.style.display = 'block';
                console.log('✅ Bulk selection section shown');
            }
        } else {
            console.log('❌ Tab content not found:', collectionDeck);
        }

        // Add active class to the clicked tab link
        const clickedTabLink = document.querySelector(`.tablink[data-collection="${collectionDeck}"]`);
        if (clickedTabLink) {
            clickedTabLink.classList.add('active');
            console.log('✅ Tab button activated:', collectionDeck);
        } else {
            console.log('❌ Tab button not found:', collectionDeck);
        }
    } catch (error) {
        console.error('❌ Error opening collection:', error);
    }
}

/**
 * Saves the current state of all radio button selections
 * @returns {Array} Array of objects containing card ID and selected value
 */
function saveRadioButtonStates() {
    try {
        const selections = [];

        // Get ALL radio buttons from ALL tabs, even hidden ones
        const allTabs = document.querySelectorAll('.tabcontent');
        console.log('📋 Found', allTabs.length, 'tabs to scan for selections');

        allTabs.forEach(tab => {
            const radioButtons = tab.querySelectorAll('input[type="radio"]:not(.disabled)');
            console.log('📻 Tab', tab.id, 'has', radioButtons.length, 'radio buttons');

            radioButtons.forEach(radio => {
                if (radio.checked) {
                    // Extract card ID and collection ID from data attributes (these don't change between languages)
                    const cardId = radio.getAttribute('data-card-id'); // e.g., "tape-recorder"
                    const collectionId = radio.getAttribute('data-collection-id'); // e.g., "music-studio"
                    const selectedValue = radio.value; // e.g., "needed", "duplicate", "owned"

                    if (cardId && collectionId) {
                        selections.push({
                            cardId: cardId,
                            collectionId: collectionId,
                            value: selectedValue
                        });
                    }
                }
            });
        });


        return selections;
    } catch (error) {
        console.error('❌ Error saving radio button states:', error);
        return [];
    }
}

/**
 * Restores radio button selections after language change
 * @param {Array} savedSelections - Array of saved selection objects
 */
function restoreRadioButtonStates(savedSelections) {
    console.log('🚀 restoreRadioButtonStates function called with:', savedSelections);
    try {
        if (!savedSelections || savedSelections.length === 0) {
            console.log('💾 No saved selections to restore');
            return;
        }

        console.log('🔄 Attempting to restore', savedSelections.length, 'selections...');
        let restoredCount = 0;

        savedSelections.forEach(selection => {
            console.log('🔍 Looking for radio button:', {
                cardId: selection.cardId,
                collectionId: selection.collectionId,
                value: selection.value
            });

            // Find the radio button using data attributes that don't change between languages
            const radioButton = document.querySelector(`input[data-card-id="${selection.cardId}"][data-collection-id="${selection.collectionId}"][value="${selection.value}"]`);

            if (radioButton) {
                radioButton.checked = true;
                restoredCount++;
                console.log('✅ Restored:', selection.cardId, 'in', selection.collectionId, '=', selection.value);
            } else {
                console.log('❌ Could not find radio button for:', selection.cardId, 'in', selection.collectionId, '=', selection.value);

                // Debug: Let's see what radio buttons actually exist
                const allRadioButtons = document.querySelectorAll('input[type="radio"]');
                console.log('🔍 Available radio buttons in DOM:', allRadioButtons.length);

                // Check if any radio buttons have the card ID we're looking for
                const matchingCardButtons = document.querySelectorAll(`input[data-card-id="${selection.cardId}"]`);
                console.log('🔍 Radio buttons with matching card ID:', matchingCardButtons.length);

                if (matchingCardButtons.length > 0) {
                    console.log('🔍 Found buttons with matching card ID, checking their attributes:');
                    matchingCardButtons.forEach((btn, index) => {
                        console.log(`  Button ${index}:`, {
                            cardId: btn.getAttribute('data-card-id'),
                            collectionId: btn.getAttribute('data-collection-id'),
                            value: btn.value
                        });
                    });
                }
            }
        });

        console.log('🔄 Restored', restoredCount, 'out of', savedSelections.length, 'selections');

        // Regenerate format text with restored selections
        if (restoredCount > 0) {
            console.log('🔄 Regenerating format text with restored selections...');
            generateRedditFormat();
            generateInGameFormat();
        }
    } catch (error) {
        console.error('❌ Error restoring radio button states:', error);
    }
}

/**
 * Handle tab clicks for collection switching
 */
function handleTabClick() {
    try {
        const collectionName = this.getAttribute('data-collection');

        if (collectionName) {
            openCollection(collectionName);
        }
    } catch (error) {
        console.error('❌ Error opening collection:', error);
    }
}

// ================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ================================
// Purpose: Handle copying format text to clipboard

/**
 * Copies the content of a format element to the clipboard
 * @param {string} formatId - The ID of the format element to copy
 */
function copyToClipboard(formatId) {
    try {
        const formatElement = document.getElementById(formatId);
        if (!formatElement) {
            console.warn('No element found to copy from:', formatId);
            return;
        }

        // For NEED and DUPLICATE sections, use the stored copy text with prefixes
        let textToCopy;
        if (formatId === 'need-section' || formatId === 'duplicate-section') {
            textToCopy = formatElement.getAttribute('data-copy-text');
            if (!textToCopy) {
                // Fallback to textContent if data-copy-text is not available
                textToCopy = formatElement.textContent.trim();
            }
        } else {
            // For other formats, use the regular textContent
            textToCopy = formatElement.textContent.trim();
        }

        if (!textToCopy) {
            console.warn('Empty content to copy from:', formatId);
            return;
        }

        // Use the modern Clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopySuccess(formatId);
            }).catch((err) => {
                console.error('Failed to copy using Clipboard API:', err);
                fallbackCopyTextToClipboard(textToCopy, formatId);
            });
        } else {
            // Fallback for older browsers or non-secure contexts
            fallbackCopyTextToClipboard(textToCopy, formatId);
        }
    } catch (error) {
        console.error('Error copying to clipboard:', error);
    }
}

/**
 * Fallback method for copying text to clipboard using document.execCommand
 * @param {string} text - The text to copy
 * @param {string} formatId - The ID of the format element for visual feedback
 */
function fallbackCopyTextToClipboard(text, formatId) {
    try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
            showCopySuccess(formatId);
        } else {
            console.warn('Fallback copy command failed');
        }
    } catch (error) {
        console.error('Error in fallback copy method:', error);
    }
}

/**
 * Shows visual feedback when copy is successful
 * @param {string} formatId - The ID of the format element to show feedback for
 */
function showCopySuccess(formatId) {
    try {
        const copyButton = document.querySelector(`#copy-${formatId.replace('-', '-')}`);
        if (copyButton) {
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            `;
            copyButton.style.background = '#d4edda';
            copyButton.style.borderColor = '#c3e6cb';
            copyButton.style.color = '#155724';

            // Reset button after 2 seconds
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.style.background = '#f8f9fa';
                copyButton.style.borderColor = '#dee2e6';
                copyButton.style.color = '#6c757d';
            }, 2000);
        }
    } catch (error) {
        console.error('Error showing copy success feedback:', error);
    }
}

/**
 * Resets all copy buttons to their original copy icon state
 * This should be called whenever formats are regenerated
 */
function resetAllCopyButtons() {
    try {
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            // Reset to original copy icon
            button.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
            `;
            // Reset to original styles
            button.style.background = '#f8f9fa';
            button.style.borderColor = '#dee2e6';
            button.style.color = '#6c757d';
        });
        console.log('🔄 All copy buttons reset to copy icon state');
    } catch (error) {
        console.error('Error resetting copy buttons:', error);
    }
}

/**
 * Resets all card selections to default "owned" state
 * This allows users to start fresh with their selections
 */
function resetAllSelections() {
    try {
        // Show confirmation popup before resetting
        showResetConfirmationPopup(() => {
            console.log('🔄 Resetting all selections...');

            // Get all radio buttons across all tabs
            const allTabs = document.querySelectorAll('.tabcontent');
            let resetCount = 0;

            allTabs.forEach(tab => {
                const radioButtons = tab.querySelectorAll('input[type="radio"]:not(.disabled)');
                radioButtons.forEach(radio => {
                    if (radio.value === 'owned') {
                        radio.checked = true;
                        resetCount++;
                    } else {
                        radio.checked = false;
                    }
                });
            });

            console.log(`✅ Reset ${resetCount} selections to default "owned" state`);

            // Regenerate formats to show empty state
            generateRedditFormat();
            generateInGameFormat();

            // Clear auto-save data since we're starting fresh
            localStorage.removeItem('autoSaveData');
            console.log('🗑️ Cleared auto-save data');

            // Show brief success confirmation
            console.log('✅ Reset completed successfully');
        });
    } catch (error) {
        console.error('Error resetting selections:', error);
    }
}

// ================================
// AUTO-SAVE FUNCTIONALITY
// ================================
// Purpose: Automatically save user selections to localStorage for data persistence

/**
 * Automatically saves the current radio button states to localStorage
 * This function is called whenever card selections change
 */
function autoSaveToLocalStorage() {
    try {
        console.log('💾 Auto-save triggered...');
        const selections = saveRadioButtonStates();
        console.log('💾 Radio button states saved:', selections);

        if (selections && selections.length > 0) {
            const autoSaveData = {
                timestamp: Date.now(),
                language: localStorage.getItem('locale') || 'en',
                selections: selections,
                version: '1.0'
            };

            localStorage.setItem('autoSaveData', JSON.stringify(autoSaveData));
            console.log('💾 Auto-saved', selections.length, 'selections to localStorage:', autoSaveData);

            // Show auto-save status indicator
            showAutoSaveStatus();
        } else {
            console.log('💾 No selections to save');
        }
    } catch (error) {
        console.warn('Auto-save failed:', error);
    }
}

/**
 * Shows the auto-save status indicator to let users know their work is being saved
 */
function showAutoSaveStatus() {
    const statusIndicator = document.getElementById('auto-save-status');
    const statusText = statusIndicator?.querySelector('.auto-save-text');

    if (statusIndicator && statusText) {
        // Show "Saving..." first
        statusText.textContent = translate("autoSave.saving");
        statusIndicator.style.display = 'inline-flex';
        statusIndicator.style.opacity = '1';

        // After a short delay, show "Saved automatically"
        setTimeout(() => {
            if (statusText) {
                statusText.textContent = translate("autoSave.saved");
            }
        }, 500);

        // Fade out after 3 seconds
        setTimeout(() => {
            if (statusIndicator) {
                statusIndicator.style.opacity = '0.3';
            }
        }, 3000);
    }
}

/**
 * Automatically restores user selections from localStorage on page load
 * This function is called during initialization
 */
function autoRestoreFromLocalStorage() {
    try {
        console.log('🔄 Auto-restore started...');

        // Check if radio buttons exist in the DOM
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        console.log('🔄 Found', radioButtons.length, 'radio buttons in DOM');

        if (radioButtons.length === 0) {
            console.warn('⚠️ No radio buttons found in DOM, cannot restore selections');
            return;
        }

        const autoSaveData = localStorage.getItem('autoSaveData');
        console.log('🔄 Raw auto-save data from localStorage:', autoSaveData);

        if (autoSaveData) {
            const data = JSON.parse(autoSaveData);
            console.log('🔄 Parsed auto-save data:', data);
            console.log('🔄 Sample selection data:', data.selections ? data.selections[0] : 'No selections');

            // Check if data has selections (language check removed since card IDs are language-independent)
            if (data.selections && data.selections.length > 0) {
                console.log('🔄 Auto-restoring', data.selections.length, 'selections from localStorage');
                console.log('🔄 Saved language was:', data.language, 'current language is:', localStorage.getItem('locale') || 'en');

                // Apply the saved selections
                console.log('🔄 About to call restoreRadioButtonStates with', data.selections.length, 'selections');
                const restoreResult = restoreRadioButtonStates(data.selections);
                console.log('🔄 restoreRadioButtonStates returned:', restoreResult);

                // Regenerate formats to show restored data
                generateRedditFormat();
                generateInGameFormat();

                console.log('✅ Auto-restore completed successfully');

                // Show auto-save status to indicate data was restored
                showAutoSaveStatus();
            } else {
                console.log('🔄 No selections found in auto-save data');
            }
        } else {
            console.log('🔄 No auto-save data found in localStorage');
        }
    } catch (error) {
        console.warn('Auto-restore failed:', error);
        // Clear corrupted data
        localStorage.removeItem('autoSaveData');
    }
}

// ================================
// DOM CONTENT LOADED EVENT
// ================================
// Purpose: Initialize the application when the DOM is fully loaded

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

        // Update the subtitle with current collection information
        try {
            const subtitleElement = document.querySelector('h1 span.subtitle');
            if (subtitleElement) {
                subtitleElement.textContent = `- ${collectionMetadata.subtitle} -`;
            }
        } catch (error) {
            console.warn('Could not update subtitle:', error);
        }

        // Render cards and decks dynamically
        try {
            renderCards(currentCollection);
            renderDecks(currentCollection);
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
            loadInput: document.getElementById('loadInput'),

            // Reset functionality
            resetButton: document.getElementById('resetAllBtn')
        };

        // ================================
        // TAB FUNCTIONALITY
        // ================================
        // Purpose: Handle deck tab switching and display



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
            // Set up all event listeners using our centralized function
            setupEventListeners();

            // Add event listeners for showing different format types
            if (domElements.redditFormatButton) {
                domElements.redditFormatButton.addEventListener('click', showRedditFormat);
            }

            if (domElements.inGameFormatButton) {
                domElements.inGameFormatButton.addEventListener('click', showInGameFormat);
            }

            // Add event listeners for copy buttons
            const copyRedditButton = document.getElementById('copy-reddit-format');
            const copyInGameButton = document.getElementById('copy-in-game-format');
            const copyNeedButton = document.getElementById('copy-need-section');
            const copyDuplicateButton = document.getElementById('copy-duplicate-section');

            if (copyRedditButton) {
                copyRedditButton.addEventListener('click', () => copyToClipboard('reddit-format'));
            }

            if (copyInGameButton) {
                copyInGameButton.addEventListener('click', () => copyToClipboard('in-game-format'));
            }

            if (copyNeedButton) {
                copyNeedButton.addEventListener('click', () => copyToClipboard('need-section'));
            }

            if (copyDuplicateButton) {
                copyDuplicateButton.addEventListener('click', () => copyToClipboard('duplicate-section'));
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

            // Add event listener for reset button
            if (domElements.resetButton) {
                domElements.resetButton.addEventListener('click', resetAllSelections);
            }

            // Add event listener for reset popup close button
            const closeResetPopupBtn = document.getElementById('closeResetConfirmationPopup');
            if (closeResetPopupBtn) {
                closeResetPopupBtn.addEventListener('click', () => {
                    const resetPopup = document.getElementById('resetConfirmationPopup');
                    if (resetPopup) {
                        resetPopup.style.display = 'none';
                    }
                });
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
                console.log('🔧 Setting up load functionality...');

                domElements.loadButton.addEventListener('click', () => {
                    try {
                        console.log('📁 Load button clicked, triggering file input...');
                        domElements.loadInput.click();
                        console.log('✅ File input click triggered');
                    } catch (error) {
                        console.error('❌ Error triggering file input:', error);
                    }
                });

                domElements.loadInput.addEventListener('change', (event) => {
                    try {
                        console.log('📂 File input change event triggered:', event);
                        loadOptions(event);
                    } catch (error) {
                        console.error('❌ Error in file input change handler:', error);
                    }
                });

                console.log('✅ Load functionality setup completed');
            } else {
                console.warn('⚠️ Load button or input not found:', {
                    loadButton: !!domElements.loadButton,
                    loadInput: !!domElements.loadInput
                });
            }
        } catch (error) {
            console.error('❌ Error setting up load functionality:', error);
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

        // ================================
        // FINAL LABEL APPLICATION
        // ================================
        // Purpose: Ensure all static HTML elements are translated after DOM is fully ready

        try {
            console.log('🌍 Applying final labels to static HTML elements...');
            applyLabels();
        } catch (error) {
            console.warn('Could not apply final labels:', error);
        }

        // Auto-restore from localStorage after HTML is generated
        setTimeout(() => {
            console.log('🔄 Starting auto-restore with delay to ensure DOM is ready...');

            // Check if radio buttons exist before attempting restore
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            if (radioButtons.length > 0) {
                console.log('✅ Found', radioButtons.length, 'radio buttons, proceeding with auto-restore...');
                autoRestoreFromLocalStorage();
            } else {
                console.log('⚠️ No radio buttons found yet, waiting longer...');
                // Wait a bit more and try again
                setTimeout(() => {
                    const radioButtonsRetry = document.querySelectorAll('input[type="radio"]');
                    if (radioButtonsRetry.length > 0) {
                        console.log('✅ Found', radioButtonsRetry.length, 'radio buttons on retry, proceeding with auto-restore...');
                        autoRestoreFromLocalStorage();
                    } else {
                        console.warn('❌ Still no radio buttons found after retry');
                    }
                }, 500);
            }

            // Show bulk selection section for the first deck on initial load
            const firstTabContent = document.querySelector('.tabcontent[style*="block"]');
            if (firstTabContent) {
                const bulkSelectionSection = document.getElementById('bulk-selection-section');
                if (bulkSelectionSection) {
                    bulkSelectionSection.style.display = 'block';
                    console.log('✅ Bulk selection section shown for initial deck display');
                }
            }
        }, 300); // Increased delay to ensure DOM is fully ready

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
