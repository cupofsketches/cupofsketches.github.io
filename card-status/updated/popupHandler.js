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
  const popupWarning = document.getElementById('warningPopup');

  // Dismiss popup when clicking outside of it
  window.onclick = (event) => {
    if (event.target === popupWarning) {
      popupWarning.style.display = 'none';
    }
  };

  document.getElementById('warningMessage').textContent = translate("ids.warningMessage");
  popupWarning.style.display = 'flex';
}

// Hide the warning popup
export function hideWarningPopup() {
  document.getElementById('warningPopup').style.display = 'none';
}


// ================================
// NAME VALIDATION POPUP
// ================================
// Purpose: Show an error popup if the user tries to save without entering a file name.
// The popup can be dismissed by clicking outside of it or on a close button.

export function showFileNameValidationPopup() {
  const popupValidation = document.getElementById('fileNameValidationPopup');
  const popup = document.getElementById('fileNamePopup');

  // Dismiss popup when clicking outside of it
  window.onclick = (event) => {
    if (event.target === popupValidation) {
      popupValidation.style.display = 'none';
    } else if (event.target === popup) {
      popup.style.display = 'none';
    }
  };

  document.getElementById('fileNameValidationMessage').textContent = translate("ids.fileNameValidationMessage");
  popupValidation.style.display = 'flex';
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
  const popup = document.getElementById('fileNamePopup');
  const closeBtn = document.getElementById('closePopup');
  const confirmBtn = document.getElementById('confirmSaveBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const fileNameInput = document.getElementById('fileNameInput');

  popup.style.display = 'flex';

  // Close popup when clicking the close button
  closeBtn.onclick = () => {
    popup.style.display = 'none';
  };

  // Confirm file name and proceed, or show validation error
  confirmBtn.onclick = () => {
    const fileName = fileNameInput.value.trim();
    if (fileName) {
      popup.style.display = 'none';
      callback(fileName);
    } else {
      showFileNameValidationPopup();
    }
  };

  // Cancel and close popup
  cancelBtn.onclick = () => {
    popup.style.display = 'none';
  };

  // Dismiss popup when clicking outside of it
  window.onclick = (event) => {
    const popupValidation = document.getElementById('fileNameValidationPopup');
    if (event.target === popup) {
      popup.style.display = 'none';
    } else if (event.target === popupValidation) {
      popupValidation.style.display = 'none';
    }
  };
}


// ================================
// INVALID FILE POPUP
// ================================
// Purpose: Show a popup when the user attempts to load an invalid file.
// Provides a translated error message and a close button.

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

