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
        fileNameInput: document.getElementById("fileNameInput"),

        // Auto-save section header
        autoSaveSectionHeader: document.querySelector('[data-translate="ids.autoSaveSectionHeader"]')
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
        subtitleElement.textContent = `- ${translate("collection.subtitle")} -`;
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

    // Auto-save section header
    if (domElements.autoSaveSectionHeader) {
        console.log('🌍 Translating auto-save header to:', translate("ids.autoSaveSectionHeader"));
        domElements.autoSaveSectionHeader.textContent = translate("ids.autoSaveSectionHeader");
    } else {
        console.warn('⚠️ Auto-save header element not found');
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
    // Get saved language preference from localStorage or default to English
    let initialLanguage = localStorage.getItem('locale') || "en";

    // Validate the saved language is supported
    const supportedLanguages = ['en', 'pt-BR', 'es'];
    if (!supportedLanguages.includes(initialLanguage)) {
        initialLanguage = "en";
    }

    console.log('🌍 Loading saved language preference:', initialLanguage);

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
        console.log('🔄 Language change started:', selectedValue);

        // Save language preference to localStorage
        localStorage.setItem('locale', selectedValue);
        console.log('💾 Language preference saved to localStorage:', selectedValue);

        // Save current radio button states before switching languages
        console.log('💾 Saving current radio button states...');
        const savedSelections = saveRadioButtonStates();
        console.log('💾 Saved selections:', savedSelections.length, 'cards');

        await setLocale(selectedValue);
        console.log('✅ setLocale completed');
        applyLabels();
        console.log('✅ applyLabels completed');

        // Reload collection data with new language
        console.log('🔄 Reloading collection...');
        const newCollection = reloadCollection();
        console.log('📦 New collection loaded:', newCollection ? newCollection.length : 'undefined', 'collections');

        // Re-render cards and decks with new language
        console.log('🎨 Re-rendering cards...');
        renderCards(newCollection);
        console.log('🎨 Re-rendering decks...');
        renderDecks(newCollection);
        console.log('✅ Re-rendering completed');

        // Show the first tab after re-rendering
        console.log('🔄 Managing tabs...');
        if (newCollection && newCollection.length > 0) {
            const firstCollectionId = newCollection[0].id;
            console.log('🎯 First collection ID:', firstCollectionId);
            const firstTabContent = document.getElementById(firstCollectionId);
            if (firstTabContent) {
                firstTabContent.style.display = 'block';
                console.log('✅ First tab shown:', firstCollectionId);
            } else {
                console.log('❌ First tab not found:', firstCollectionId);
            }
            // Hide all other tabs
            const allTabs = document.querySelectorAll('.tabcontent');
            console.log('📋 Total tabs found:', allTabs.length);
            allTabs.forEach(tab => {
                if (tab.id !== firstCollectionId) {
                    tab.style.display = 'none';
                }
            });

            // Update tab button states
            const allTabLinks = document.querySelectorAll('.tablink');
            console.log('🔗 Total tab links found:', allTabLinks.length);
            allTabLinks.forEach(tabLink => {
                if (tabLink.getAttribute('data-collection') === firstCollectionId) {
                    tabLink.classList.add('active');
                    console.log('✅ Active tab set:', firstCollectionId);
                } else {
                    tabLink.classList.remove('active');
                }
            });
        } else {
            console.log('❌ No collection data for tab management');
        }

        // Regenerate format text with new language
        console.log('🔄 Generating format text...');
        try {
            generateRedditFormat();
            console.log('✅ Reddit format generated');
        } catch (error) {
            console.error('❌ Error generating Reddit format:', error);
        }

        try {
            generateInGameFormat();
            console.log('✅ In-game format generated');
        } catch (error) {
            console.error('❌ Error generating in-game format:', error);
        }

        console.log('🎉 Language change process completed!');

        // Debug: Check if event listeners are working
        console.log('🔍 Checking event listeners after re-render...');
        const radioButtons = document.querySelectorAll('input[type="radio"]:not(.disabled)');
        console.log('📻 Radio buttons found:', radioButtons.length);

        const deckButtons = document.querySelectorAll('.tablink');
        console.log('🔗 Deck buttons found:', deckButtons.length);

        console.log('⚠️  NOTE: Event listeners may not be attached to these new elements!');

        // Re-attach event listeners to the newly rendered elements
        console.log('🔧 Re-attaching event listeners...');
        setupEventListeners();
        console.log('✅ Event listeners re-attached!');

        // Auto-save the current selections in the new language
        autoSaveToLocalStorage();

        // Update the language selector display to show the new selected language
        updateLanguageSelectorDisplay(selectedValue);

        // Restore radio button selections after re-rendering
        console.log('🔄 Restoring radio button selections...');
        restoreRadioButtonStates(savedSelections);
        console.log('✅ Radio button selections restored!');
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

        console.log('✅ Event listeners setup completed');
    } catch (error) {
        console.error('❌ Error setting up event listeners:', error);
    }
}

/**
 * Handle card status changes (radio button selections)
 */
function handleCardStatusChange() {
    try {
        console.log('📻 Card status changed:', this.name, this.value);
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

        console.log('💾 Saved', selections.length, 'radio button selections from all tabs');
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
    try {
        if (!savedSelections || savedSelections.length === 0) {
            console.log('💾 No saved selections to restore');
            return;
        }

        console.log('🔄 Attempting to restore', savedSelections.length, 'selections...');
        let restoredCount = 0;

        savedSelections.forEach(selection => {
            // Find the radio button using data attributes that don't change between languages
            const radioButton = document.querySelector(`input[data-card-id="${selection.cardId}"][data-collection-id="${selection.collectionId}"][value="${selection.value}"]`);

            if (radioButton) {
                radioButton.checked = true;
                restoredCount++;
                console.log('✅ Restored:', selection.cardId, 'in', selection.collectionId, '=', selection.value);
            } else {
                console.log('❌ Could not find radio button for:', selection.cardId, 'in', selection.collectionId, '=', selection.value);
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
        console.log('🔗 Tab clicked:', collectionName);
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
        const autoSaveData = localStorage.getItem('autoSaveData');
        console.log('🔄 Raw auto-save data from localStorage:', autoSaveData);

        if (autoSaveData) {
            const data = JSON.parse(autoSaveData);
            console.log('🔄 Parsed auto-save data:', data);

            // Check if data is from current language or can be migrated
            if (data.language === (localStorage.getItem('locale') || 'en') || data.selections) {
                console.log('🔄 Auto-restoring', data.selections.length, 'selections from localStorage');

                // Apply the saved selections
                restoreRadioButtonStates(data.selections);

                // Regenerate formats to show restored data
                generateRedditFormat();
                generateInGameFormat();

                console.log('✅ Auto-restore completed successfully');

                // Show auto-save status to indicate data was restored
                showAutoSaveStatus();
            } else {
                console.log('🔄 Language mismatch or no selections in data');
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
                subtitleElement.textContent = `- ${translate("collection.subtitle")} -`;
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
            loadInput: document.getElementById('loadInput')
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
            autoRestoreFromLocalStorage();
        }, 100); // Small delay to ensure DOM is fully ready

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
