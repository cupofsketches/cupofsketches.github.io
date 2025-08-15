// ---------------------------------
// -------- FILE OPERATIONS --------
// ---------------------------------
// This file handles all file-related operations including saving and loading card status data.
// It provides functions for exporting user selections to JSON files and importing previously saved data.

// ================================
// IMPORT STATEMENTS
// ================================
// Purpose: Import necessary functions and modules from other files

import { generateRedditFormat, generateInGameFormat } from './formatGenerators.js';
import { showWarningPopup, showFileNamePopup, showInvalidFilePopup } from './popupHandler.js';
import { translate } from './i18n.js';

// ================================
// SAVE FUNCTIONALITY
// ================================
// Purpose: Handle saving card status data to JSON files

/**
 * Saves the current card status selections to a JSON file
 * This function validates that at least one option is selected before allowing save
 */
export function saveOptions() {
  // ================================
  // VALIDATION
  // ================================
  // Purpose: Ensure user has selected at least one 'needed' or 'duplicate' option

  // Check if any 'needed' or 'duplicate' options are selected across all forms
  const forms = document.querySelectorAll('.collection-form');
  let optionsSelected = false;

  forms.forEach((form) => {
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    const selectedOptions = Array.from(radioButtons).some(
      (radio) => radio.checked && (radio.value === 'needed' || radio.value === 'duplicate')
    );
    if (selectedOptions) {
      optionsSelected = true;
    }
  });

  // Show warning if no valid options are selected
  if (!optionsSelected) {
    showWarningPopup(translate("ids.warningMessage"));
    return;
  }

  // ================================
  // FILE NAME COLLECTION
  // ================================
  // Purpose: Prompt user for file name and proceed with saving

  // Show the custom popup to get the file name from user
  showFileNamePopup((fileName) => {
    // ================================
    // DATA COLLECTION
    // ================================
    // Purpose: Gather all selected card statuses from the forms

    // Initialize objects to store different card categories
    const neededCards = {};
    const duplicateCards = {};
    const ownedCards = {};

    /**
     * Processes form data and categorizes cards by their status
     * @param {HTMLFormElement} form - The form element to process
     * @param {string} collectionName - The name of the collection
     */
    function processFormData(form, collectionName) {
      const formData = new FormData(form);
      formData.forEach((value, key) => {
        if (value === 'needed') {
          if (!neededCards[collectionName]) neededCards[collectionName] = [];
          neededCards[collectionName].push(key);
        } else if (value === 'duplicate') {
          if (!duplicateCards[collectionName]) duplicateCards[collectionName] = [];
          duplicateCards[collectionName].push(key);
        } else if (value === 'owned') {
          if (!ownedCards[collectionName]) ownedCards[collectionName] = [];
          ownedCards[collectionName].push(key);
        }
      });
    }

    // Process all forms to collect card data
    forms.forEach((form) => {
      const collectionName = form.getAttribute('data-collection');
      processFormData(form, collectionName);
    });

    // ================================
    // FILE CREATION AND DOWNLOAD
    // ================================
    // Purpose: Create JSON file and trigger download

    // Combine all card data into a single object
    const optionsData = { neededCards, duplicateCards, ownedCards };

    // Create and download the JSON file
    const blob = new Blob([JSON.stringify(optionsData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// ================================
// LOAD FUNCTIONALITY
// ================================
// Purpose: Handle loading previously saved card status data from JSON files

/**
 * Loads card status data from a JSON file and applies it to the current interface
 * @param {Event} event - The file input change event
 */
export function loadOptions(event) {
  // ================================
  // HELPER FUNCTIONS
  // ================================
  // Purpose: Local utility functions for the load operation

  /**
   * Hides user message displays when loading new data
   */
  function hideUserMessage() {
    document.getElementById('user-message').style.display = 'none';
    document.getElementById('in-game-user-message').style.display = 'none';
  }

  // ================================
  // FILE VALIDATION
  // ================================
  // Purpose: Ensure the selected file is valid JSON

  const file = event.target.files[0];

  if (file && file.type === 'application/json') {
    // Hide user messages and proceed with loading
    hideUserMessage();

    // ================================
    // FILE READING AND PROCESSING
    // ================================
    // Purpose: Read file contents and apply data to the interface

    const reader = new FileReader();
    reader.onload = function () {
      try {
        // Parse the JSON data from the file
        const optionsData = JSON.parse(reader.result);

        // ================================
        // DATA APPLICATION
        // ================================
        // Purpose: Apply loaded data to all collection forms

        // Iterate through all collection forms
        document.querySelectorAll('.collection-form').forEach((form) => {
          const collectionName = form.getAttribute('data-collection');

          // Apply needed cards data
          if (optionsData.neededCards[collectionName]) {
            optionsData.neededCards[collectionName].forEach((card) => {
              const input = form.querySelector(`input[name="${card}"][value="needed"]`);
              if (input) input.checked = true;
            });
          }

          // Apply duplicate cards data
          if (optionsData.duplicateCards[collectionName]) {
            optionsData.duplicateCards[collectionName].forEach((card) => {
              const input = form.querySelector(`input[name="${card}"][value="duplicate"]`);
              if (input) input.checked = true;
            });
          }

          // Apply owned cards data
          if (optionsData.ownedCards[collectionName]) {
            optionsData.ownedCards[collectionName].forEach((card) => {
              const input = form.querySelector(`input[name="${card}"][value="owned"]`);
              if (input) input.checked = true;
            });
          }
        });

        // ================================
        // UI UPDATE
        // ================================
        // Purpose: Refresh the display to show loaded data

        // Regenerate format displays with new data
        generateRedditFormat();
        generateInGameFormat();

      } catch (error) {
        // Handle JSON parsing errors
        console.error('Error parsing JSON file:', error);
        showInvalidFilePopup(translate("ids.invalidFileMessage"));
      }
    };

    // Start reading the file
    reader.readAsText(file);

  } else {
    // ================================
    // ERROR HANDLING
    // ================================
    // Purpose: Show error message for invalid file types

    // Show error popup for invalid file type
    showInvalidFilePopup(translate("ids.invalidFileMessage"));
  }

  // ================================
  // CLEANUP
  // ================================
  // Purpose: Reset file input for future selections

  // Reset the file input value to allow re-selection of the same file
  const fileInput = document.getElementById('loadInput');
  fileInput.value = '';
}
