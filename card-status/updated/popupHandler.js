// ---------------------------------
// ------------ POP UPS ------------
// ---------------------------------
// This file defines functions that show and hide popups

import { translate } from './i18n.js';

// ================================
// WARNING POPUP: 
// -------------
// This shows a warning popup — like when someone tries to save without selecting anything.
// warningMessage: "Select at least one 'needed' or 'duplicate' option before saving"

// Function to show the warning popup
export function showWarningPopup() {
  const popupWarning = document.getElementById('warningPopup');

  // Handle clicking outside the popup
  window.onclick = (event) => {
    if (event.target === popupWarning) {
      popupWarning.style.display = 'none';
    }
  };

  document.getElementById('warningMessage').textContent = translate("ids.warningMessage");
  document.getElementById('warningPopup').style.display = 'flex';
}

// Function to hide the warning popup
export function hideWarningPopup() {
  document.getElementById('warningPopup').style.display = 'none';
}


// ================================
// NAME VALIDATION: 
// ----------------
// This shows an error if someone tries to save without typing a name.


// Function to show the file name validation popup
export function showFileNameValidationPopup() {
  const popupValidation = document.getElementById('fileNameValidationPopup');
  const popup = document.getElementById('fileNamePopup');

  // Handle clicking outside the popup
  window.onclick = (event) => {
    if (event.target === popupValidation) {
      popupValidation.style.display = 'none';
    } else if (event.target === popup) {
      popup.style.display = 'none';
    }
  };

  document.getElementById('fileNameValidationMessage').textContent = translate("ids.fileNameValidationMessage");
  document.getElementById('fileNameValidationPopup').style.display = 'flex';

}

// ================================
// SAVE FILE NAME INPUT
// --------------------
// It shows the popup asking the user to type a name.

// Function to show the custom popup for file name input
export function showFileNamePopup(callback) {

  const popup = document.getElementById('fileNamePopup'); //→ Finds the popup.

  const closeBtn = document.getElementById('closePopup');
  const confirmBtn = document.getElementById('confirmSaveBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const fileNameInput = document.getElementById('fileNameInput');

  popup.style.display = 'flex'; //→ Shows the popup.

  // Close popup when clicking the close button
  closeBtn.onclick = () => {
    popup.style.display = 'none';
  };

  // Handle file name confirmation
  confirmBtn.onclick = () => {
    const fileName = fileNameInput.value.trim();
    if (fileName) {
      popup.style.display = 'none';
      callback(fileName);
    } else {
      showFileNameValidationPopup();
    }
  };

  // Handle file name cancellation
  cancelBtn.onclick = () => {
    popup.style.display = 'none';
  };

  // Handle clicking outside the popup
  window.onclick = (event) => {
    const popupValidation = document.getElementById('fileNameValidationPopup');

    if (event.target === popup) {
      popup.style.display = 'none';
    } else if (event.target === popupValidation) {
      popupValidation.style.display = 'none';
    }
  };
}

// Function to hide the file name validation popup
export function hideFileNameValidationPopup() {
  document.getElementById('fileNameValidationPopup').style.display = 'none';
}

// ================================
// LOAD FILE
// ---------

// Function to verify when loading an invalid file
export function showInvalidFilePopup() {
  const popup = document.getElementById('invalidFilePopup');
  const message = document.getElementById('invalidFileMessage');
  const closeBtn = document.getElementById('closeInvalidFileBtn');

  // Apply translation
  message.textContent = translate('ids.invalidFileMessage');
  closeBtn.textContent = translate('ids.closeWarningBtn'); // Reuse close label

  popup.style.display = 'flex';

  // Close behavior
  closeBtn.onclick = () => popup.style.display = 'none';
  document.getElementById('closeInvalidFilePopup').onclick = () => popup.style.display = 'none';
}

// ================================

