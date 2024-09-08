// ---------------------------------
// -------- IMPORTING FILES --------
// ---------------------------------

import { generateRedditFormat, generateInGameFormat } from './formatGenerators.js';
import { showWarningPopup, showFileNamePopup } from './popupHandler.js';

// ---------------------------------
// --------- SAVE BUTTON -----------
// ---------------------------------

// ---- SAVING AS FILE

// Function to save options to a file
export function saveOptions() {
  // Check if any 'needed' or 'duplicate' options are selected
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

  if (!optionsSelected) {
    showWarningPopup('Select at least one "needed" or "duplicate" option before saving.');
    return;
  }

  // Show the custom popup to get the file name
  showFileNamePopup((fileName) => {
    // Proceed with saving the options
    const neededCards = {};
    const duplicateCards = {};
    const ownedCards = {};

    function processFormData(form, collectionDeck) {
      const formData = new FormData(form);
      formData.forEach((value, key) => {
        if (value === 'needed') {
          if (!neededCards[collectionDeck]) neededCards[collectionDeck] = [];
          neededCards[collectionDeck].push(key);
        } else if (value === 'duplicate') {
          if (!duplicateCards[collectionDeck]) duplicateCards[collectionDeck] = [];
          duplicateCards[collectionDeck].push(key);
        } else if (value === 'owned') {
          if (!ownedCards[collectionDeck]) ownedCards[collectionDeck] = [];
          ownedCards[collectionDeck].push(key);
        }
      });
    }

    forms.forEach((form) => {
      const collectionDeck = form.getAttribute('data-collection');
      processFormData(form, collectionDeck);
    });

    const optionsData = { neededCards, duplicateCards, ownedCards };

    const blob = new Blob([JSON.stringify(optionsData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// ---------------------------------
// ---------- LOAD BUTTON ----------
// ---------------------------------

// Load options from a file
export function loadOptions(event) {
  function hideUserMessage() {
    document.getElementById('user-message').style.display = 'none';
    document.getElementById('in-game-user-message').style.display = 'none';
  }

  const file = event.target.files[0];

  if (file && file.type === 'application/json') {
    hideUserMessage();

    const reader = new FileReader();
    reader.onload = function () {
      const optionsData = JSON.parse(reader.result);

      document.querySelectorAll('.collection-form').forEach((form) => {
        const collectionDeck = form.getAttribute('data-collection');

        if (optionsData.neededCards[collectionDeck]) {
          optionsData.neededCards[collectionDeck].forEach((card) => {
            form.querySelector(`input[name="${card}"][value="needed"]`).checked = true;
          });
        }
        if (optionsData.duplicateCards[collectionDeck]) {
          optionsData.duplicateCards[collectionDeck].forEach((card) => {
            form.querySelector(`input[name="${card}"][value="duplicate"]`).checked = true;
          });
        }
        if (optionsData.ownedCards[collectionDeck]) {
          optionsData.ownedCards[collectionDeck].forEach((card) => {
            form.querySelector(`input[name="${card}"][value="owned"]`).checked = true;
          });
        }
      });

      generateRedditFormat();
      generateInGameFormat();
    };
    reader.readAsText(file);
  } else {
    showWarningPopup('Please select a valid .json file!'); // Show warning popup
  }

  // Reset the file input value to trigger the change event if the same file is selected
  const fileInput = document.getElementById('loadInput');
  fileInput.value = ''; // Clear the file input value
}
