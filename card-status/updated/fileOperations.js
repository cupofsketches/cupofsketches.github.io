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
  try {
    // ================================
    // VALIDATION
    // ================================
    // Purpose: Ensure user has selected at least one 'needed' or 'duplicate' option

    // Check if any 'needed' or 'duplicate' options are selected across all forms
    const forms = document.querySelectorAll('.collection-form');

    if (!forms || forms.length === 0) {
      throw new Error('No collection forms found');
    }

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
      try {
        // Validate file name
        if (!fileName || typeof fileName !== 'string' || fileName.trim().length === 0) {
          throw new Error('Invalid file name provided');
        }

        // Sanitize file name (remove invalid characters)
        const sanitizedFileName = fileName.replace(/[<>:"/\\|?*]/g, '_').trim();

        if (sanitizedFileName.length === 0) {
          throw new Error('File name contains only invalid characters');
        }

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
          if (!form || !collectionName) {
            throw new Error('Invalid form or collection name');
          }

          const formData = new FormData(form);
          formData.forEach((value, key) => {
            // Find the radio button to get the card ID
            const radioButton = form.querySelector(`input[name="${key}"][value="${value}"]`);
            if (radioButton) {
              const cardId = radioButton.getAttribute('data-card-id');

              if (value === 'needed') {
                if (!neededCards[collectionName]) neededCards[collectionName] = [];
                neededCards[collectionName].push(cardId || key); // Use card ID if available, fallback to key
              } else if (value === 'duplicate') {
                if (!duplicateCards[collectionName]) duplicateCards[collectionName] = [];
                duplicateCards[collectionName].push(cardId || key); // Use card ID if available, fallback to key
              } else if (value === 'owned') {
                if (!ownedCards[collectionName]) ownedCards[collectionName] = [];
                ownedCards[collectionName].push(cardId || key); // Use card ID if available, fallback to key
              }
            }
          });
        }

        // Process all forms to collect card data
        forms.forEach((form) => {
          const collectionName = form.getAttribute('data-collection');
          if (collectionName) {
            processFormData(form, collectionName);
          }
        });

        // ================================
        // FILE CREATION AND DOWNLOAD
        // ================================
        // Purpose: Create JSON file and trigger download

        // Combine all card data into a single object
        const optionsData = { neededCards, duplicateCards, ownedCards };

        // Validate data before creating file
        if (Object.keys(neededCards).length === 0 && Object.keys(duplicateCards).length === 0) {
          throw new Error('No valid card data to save');
        }

        // Create and download the JSON file
        const jsonString = JSON.stringify(optionsData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        try {
          const a = document.createElement('a');
          a.href = url;
          a.download = sanitizedFileName + '.json';
          a.click();
        } finally {
          // Always clean up the URL to prevent memory leaks
          URL.revokeObjectURL(url);
        }

      } catch (error) {
        console.error('Error during save operation:', error);
        // Show user-friendly error message
        showInvalidFilePopup(translate("ids.invalidFileMessage"));
      }
    });

  } catch (error) {
    console.error('Error in saveOptions:', error);
    showInvalidFilePopup(translate("ids.invalidFileMessage"));
  }
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
  try {
    // Validate event parameter
    if (!event || !event.target || !event.target.files) {
      throw new Error('Invalid file input event');
    }

    // ================================
    // HELPER FUNCTIONS
    // ================================
    // Purpose: Local utility functions for the load operation

    /**
     * Hides user message displays when loading new data
     */
    function hideUserMessage() {
      try {
        const userMessage = document.getElementById('user-message');
        const inGameUserMessage = document.getElementById('in-game-user-message');

        if (userMessage) userMessage.style.display = 'none';
        if (inGameUserMessage) inGameUserMessage.style.display = 'none';
      } catch (error) {
        console.warn('Could not hide user messages:', error);
      }
    }

    // ================================
    // FILE VALIDATION
    // ================================
    // Purpose: Ensure the selected file is valid JSON

    const file = event.target.files[0];

    if (!file) {
      throw new Error('No file selected');
    }

    // Check file type and size
    if (file.type !== 'application/json') {
      throw new Error('Invalid file type. Please select a JSON file.');
    }

    // Check file size (limit to 1MB)
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      throw new Error('File too large. Please select a file smaller than 1MB.');
    }

    // Hide user messages and proceed with loading
    hideUserMessage();

    // ================================
    // FILE READING AND PROCESSING
    // ================================
    // Purpose: Read file contents and apply data to the interface

    const reader = new FileReader();

    // Clean up reader on error
    reader.onerror = function () {
      try {
        reader.abort(); // Abort any ongoing read operation
        throw new Error('Error reading file');
      } catch (error) {
        console.error('FileReader error:', error);
        showInvalidFilePopup(translate("ids.invalidFileMessage"));
      }
    };

    // Clean up reader when done
    reader.onloadend = function () {
      try {
        // Clear the reader reference
        reader.onload = null;
        reader.onerror = null;
        reader.onloadend = null;
      } catch (error) {
        console.warn('Error cleaning up FileReader:', error);
      }
    };

    reader.onload = function () {
      try {
        // Validate reader result
        if (!reader.result || typeof reader.result !== 'string') {
          throw new Error('Invalid file content');
        }

        // Parse the JSON data from the file
        let optionsData;
        try {
          optionsData = JSON.parse(reader.result);
        } catch (parseError) {
          throw new Error('Invalid JSON format in file');
        }

        // Validate data structure
        if (!optionsData || typeof optionsData !== 'object') {
          throw new Error('Invalid data structure in file');
        }

        // Check if required properties exist
        if (!optionsData.neededCards && !optionsData.duplicateCards && !optionsData.ownedCards) {
          throw new Error('File does not contain valid card data');
        }

        // ================================
        // DATA APPLICATION
        // ================================
        // Purpose: Apply loaded data to all collection forms

        // Iterate through all collection forms
        const forms = document.querySelectorAll('.collection-form');

        if (!forms || forms.length === 0) {
          throw new Error('No collection forms found in interface');
        }

        forms.forEach((form) => {
          try {
            const collectionName = form.getAttribute('data-collection');
            if (!collectionName) return;

            // Apply needed cards data
            if (optionsData.neededCards && optionsData.neededCards[collectionName]) {
              optionsData.neededCards[collectionName].forEach((card) => {
                if (card && typeof card === 'string') {
                  // Try to find by card ID first, then fallback to name
                  let input = form.querySelector(`input[data-card-id="${card}"][value="needed"]`);
                  if (!input) {
                    // Fallback: try to find by name (for backward compatibility)
                    input = form.querySelector(`input[name="${card}"][value="needed"]`);
                  }
                  if (input) input.checked = true;
                }
              });
            }

            // Apply duplicate cards data
            if (optionsData.duplicateCards && optionsData.duplicateCards[collectionName]) {
              optionsData.duplicateCards[collectionName].forEach((card) => {
                if (card && typeof card === 'string') {
                  // Try to find by card ID first, then fallback to name
                  let input = form.querySelector(`input[data-card-id="${card}"][value="duplicate"]`);
                  if (!input) {
                    // Fallback: try to find by name (for backward compatibility)
                    input = form.querySelector(`input[name="${card}"][value="duplicate"]`);
                  }
                  if (input) input.checked = true;
                }
              });
            }

            // Apply owned cards data
            if (optionsData.ownedCards && optionsData.ownedCards[collectionName]) {
              optionsData.ownedCards[collectionName].forEach((card) => {
                if (card && typeof card === 'string') {
                  // Try to find by card ID first, then fallback to name
                  let input = form.querySelector(`input[data-card-id="${card}"][value="owned"]`);
                  if (!input) {
                    // Fallback: try to find by name (for backward compatibility)
                    input = form.querySelector(`input[name="${card}"][value="owned"]`);
                  }
                  if (input) input.checked = true;
                }
              });
            }
          } catch (formError) {
            console.warn(`Error processing form for collection ${collectionName}:`, formError);
          }
        });

        // ================================
        // UI UPDATE
        // ================================
        // Purpose: Refresh the display to show loaded data

        // Regenerate format displays with new data
        try {
          generateRedditFormat();
          generateInGameFormat();
          hideUserMessage();

          // Auto-save the loaded selections to localStorage
          console.log('💾 Auto-saving loaded file selections...');
          autoSaveLoadedSelections();
        } catch (formatError) {
          console.warn('Error regenerating formats:', formatError);
        }

      } catch (error) {
        // Handle JSON parsing errors
        console.error('Error processing loaded file:', error);
        showInvalidFilePopup(translate("ids.invalidFileMessage"));
      }
    };

    // Start reading the file
    reader.readAsText(file);

  } catch (error) {
    console.error('Error in loadOptions:', error);
    // Show user-friendly error message
    showInvalidFilePopup(translate("ids.invalidFileMessage"));
  } finally {
    // ================================
    // CLEANUP
    // ================================
    // Purpose: Reset file input for future selections

    // Reset the file input value to allow re-selection of the same file
    try {
      const fileInput = document.getElementById('loadInput');
      if (fileInput) fileInput.value = '';
    } catch (cleanupError) {
      console.warn('Error during cleanup:', cleanupError);
    }
  }
}

/**
 * Automatically saves the loaded file selections to localStorage
 * This ensures that loaded selections persist across browser sessions
 */
function autoSaveLoadedSelections() {
  try {
    // Get all current radio button selections (including the newly loaded ones)
    const allTabs = document.querySelectorAll('.tabcontent');
    const selections = [];

    allTabs.forEach(tab => {
      const radioButtons = tab.querySelectorAll('input[type="radio"]:not(.disabled)');
      radioButtons.forEach(radio => {
        if (radio.checked) {
          const cardId = radio.getAttribute('data-card-id');
          const collectionId = radio.getAttribute('data-collection-id');
          const selectedValue = radio.value;

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

    if (selections.length > 0) {
      const autoSaveData = {
        timestamp: Date.now(),
        language: localStorage.getItem('locale') || 'en',
        selections: selections,
        version: '1.0'
      };

      localStorage.setItem('autoSaveData', JSON.stringify(autoSaveData));
      console.log('💾 Auto-saved', selections.length, 'loaded selections to localStorage:', autoSaveData);

      // Show auto-save status indicator
      showAutoSaveStatusAfterLoad();
    } else {
      console.log('💾 No selections found to auto-save after file load');
    }
  } catch (error) {
    console.warn('Auto-save of loaded selections failed:', error);
  }
}

/**
 * Shows auto-save status after loading a file
 * This provides visual feedback that loaded selections are being saved
 */
function showAutoSaveStatusAfterLoad() {
  try {
    const statusIndicator = document.getElementById('auto-save-status');
    const statusText = statusIndicator?.querySelector('.auto-save-text');

    if (statusIndicator && statusText) {
      // Show "Saving loaded selections..." first (translated)
      statusText.textContent = translate('autoSave.savingLoaded');
      statusIndicator.style.display = 'inline-flex';
      statusIndicator.style.opacity = '1';

      // After a short delay, show "Loaded selections saved automatically" (translated)
      setTimeout(() => {
        if (statusText) {
          statusText.textContent = translate('autoSave.loadedSaved');
        }
      }, 500);

      // Fade out after 3 seconds
      setTimeout(() => {
        if (statusIndicator) {
          statusIndicator.style.opacity = '0.3';
        }
      }, 3000);
    }
  } catch (error) {
    console.warn('Error showing auto-save status after load:', error);
  }
}
