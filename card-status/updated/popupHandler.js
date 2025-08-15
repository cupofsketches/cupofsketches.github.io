// ---------------------------------
// ------------ POP UPS ------------
// ---------------------------------
// This file defines functions that show and hide popups for various user interactions.
// Each popup provides feedback or requests input from the user, such as warnings, errors, or file name prompts.

import { translate } from './i18n.js';

// ================================
// WARNING POPUP
// ================================
// Purpose: Display a warning popup when the user attempts an action that requires a selection,
// such as saving without choosing any 'needed' or 'duplicate' options.
// The popup can be dismissed by clicking outside of it or on a close button.

export function showWarningPopup() {
  const warningPopup = document.getElementById('warningPopup');


  // Dismiss popup when clicking outside of it
  window.onclick = (event) => {
    if (event.target === warningPopup) {
      warningPopup.style.display = 'none';
    }
  };

  document.getElementById('warningMessage').textContent = translate("ids.warningMessage");
  warningPopup.style.display = 'flex';
}

// Hide the warning popup
export function hideWarningPopup() {
  document.getElementById('warningPopup').style.display = 'none'; // Already short and clear
}


// ================================
// NAME VALIDATION POPUP
// ================================
// Purpose: Show an error popup if the user tries to save without entering a file name.
// The popup can be dismissed by clicking outside of it or on a close button.

export function showFileNameValidationPopup() {
  const nameValidationPopup = document.getElementById('fileNameValidationPopup');
  const namePopup = document.getElementById('fileNamePopup');


  // Dismiss popup when clicking outside of it
  window.onclick = (event) => {
    if (event.target === nameValidationPopup) {
      nameValidationPopup.style.display = 'none';
    } else if (event.target === namePopup) {
      namePopup.style.display = 'none';
    }
  };

  document.getElementById('fileNameValidationMessage').textContent = translate("ids.fileNameValidationMessage");
  nameValidationPopup.style.display = 'flex';
}

// Hide the file name validation popup
export function hideFileNameValidationPopup() {
  document.getElementById('fileNameValidationPopup').style.display = 'none';
}


// ================================
// FILE NAME INPUT POPUP
// ================================
// Purpose: Prompt the user to enter a file name before saving.
// Handles confirmation, cancellation, and validation of the input.
// The popup can be dismissed by clicking outside of it or on a close button.

export function showFileNamePopup(callback) {
  const namePopup = document.getElementById('fileNamePopup');
  const closeButton = document.getElementById('closePopup');
  const confirmButton = document.getElementById('confirmSaveBtn');
  const cancelButton = document.getElementById('cancelBtn');
  const nameInput = document.getElementById('fileNameInput');

  namePopup.style.display = 'flex';

  // Close popup when clicking the close button
  closeButton.onclick = () => {
    namePopup.style.display = 'none';
  };

  // Confirm file name and proceed, or show validation error
  confirmButton.onclick = () => {
    const fileName = nameInput.value.trim();
    if (fileName) {
      namePopup.style.display = 'none';
      callback(fileName);
    } else {
      showFileNameValidationPopup();
    }
  };

  // Cancel and close popup
  cancelButton.onclick = () => {
    namePopup.style.display = 'none';
  };

  // Dismiss popup when clicking outside of it
  window.onclick = (event) => {
    const nameValidationPopup = document.getElementById('fileNameValidationPopup');
    if (event.target === namePopup) {
      namePopup.style.display = 'none';
    } else if (event.target === nameValidationPopup) {
      nameValidationPopup.style.display = 'none';
    }
  };
}


// ================================
// INVALID FILE POPUP
// ================================
// Purpose: Show a popup when the user attempts to load an invalid file.
// Provides a translated error message and a close button.

export function showInvalidFilePopup() {
  const invalidFilePopup = document.getElementById('invalidFilePopup');
  const invalidFileMsg = document.getElementById('invalidFileMessage');
  const closeButton = document.getElementById('closeInvalidFileBtn');

  // Apply translation
  invalidFileMsg.textContent = translate('ids.invalidFileMessage');
  closeBtn.textContent = translate('ids.closeWarningBtn'); // Reuse close label

  invalidFilePopup.style.display = 'flex';

  // Close behavior
  closeButton.onclick = () => invalidFilePopup.style.display = 'none';
  document.getElementById('closeInvalidFilePopup').onclick = () => invalidFilePopup.style.display = 'none';
}

// ================================

