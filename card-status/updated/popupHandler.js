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
  const handleOutsideClick = (event) => {
    if (event.target === warningPopup) {
      warningPopup.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
    }
  };

  // Add event listener for outside clicks
  document.addEventListener('click', handleOutsideClick);

  document.getElementById('warningMessage').textContent = translate("ids.warningMessage");
  warningPopup.style.display = 'flex';
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
  const fileNameValidationPopup = document.getElementById('fileNameValidationPopup');
  const fileNamePopup = document.getElementById('fileNamePopup');

  // Dismiss popup when clicking outside of it
  const handleOutsideClick = (event) => {
    if (event.target === fileNameValidationPopup) {
      fileNameValidationPopup.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
    } else if (event.target === fileNamePopup) {
      fileNamePopup.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
    }
  };

  // Add event listener for outside clicks
  document.addEventListener('click', handleOutsideClick);

  document.getElementById('fileNameValidationMessage').textContent = translate("ids.fileNameValidationMessage");
  fileNameValidationPopup.style.display = 'flex';
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
  const fileNamePopup = document.getElementById('fileNamePopup');
  const closeButton = document.getElementById('closePopup');
  const confirmSaveButton = document.getElementById('confirmSaveBtn');
  const cancelButton = document.getElementById('cancelBtn');
  const fileNameInput = document.getElementById('fileNameInput');

  fileNamePopup.style.display = 'flex';

  // Close popup when clicking the close button
  closeButton.onclick = () => {
    fileNamePopup.style.display = 'none';
  };

  // Confirm file name and proceed, or show validation error
  confirmSaveButton.onclick = () => {
    const fileName = fileNameInput.value.trim();
    if (fileName) {
      fileNamePopup.style.display = 'none';
      callback(fileName);
    } else {
      showFileNameValidationPopup();
    }
  };

  // Cancel and close popup
  cancelButton.onclick = () => {
    fileNamePopup.style.display = 'none';
  };

  // Dismiss popup when clicking outside of it
  const handleOutsideClick = (event) => {
    const popupValidation = document.getElementById('fileNameValidationPopup');
    if (event.target === fileNamePopup) {
      fileNamePopup.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
    } else if (event.target === popupValidation) {
      popupValidation.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
    }
  };

  // Add event listener for outside clicks
  document.addEventListener('click', handleOutsideClick);
}

// ================================
// INVALID FILE POPUP
// ================================
// Purpose: Show a popup when the user attempts to load an invalid file.
// Provides a translated error message and a close button.

export function showInvalidFilePopup() {
  const popup = document.getElementById('invalidFilePopup');
  const message = document.getElementById('invalidFileMessage');
  const closeButton = document.getElementById('closeInvalidFileBtn');

  // Apply translation
  message.textContent = translate('ids.invalidFileMessage');
  closeButton.textContent = translate('ids.closeWarningBtn'); // Reuse close label

  popup.style.display = 'flex';

  // Close behavior
  closeButton.onclick = () => popup.style.display = 'none';
  document.getElementById('closeInvalidFilePopup').onclick = () => popup.style.display = 'none';
}

