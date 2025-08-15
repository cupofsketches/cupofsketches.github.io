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
  const warningMessage = document.getElementById('warningMessage');
  const closeButton = document.getElementById('closeWarningBtn');

  // Dismiss popup when clicking outside of it
  const handleOutsideClick = (event) => {
    if (event.target === warningPopup) {
      warningPopup.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      warningPopup.style.display = 'none';
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  // Add event listeners
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleKeyDown);

  if (warningMessage) {
    warningMessage.textContent = translate("ids.warningMessage");
  }

  warningPopup.style.display = 'flex';

  // Focus the close button for keyboard navigation
  if (closeButton) {
    closeButton.focus();
  }
}

// Hide the warning popup
export function hideWarningPopup() {
  const warningPopup = document.getElementById('warningPopup');
  if (warningPopup) {
    warningPopup.style.display = 'none';
  }
}

// ================================
// NAME VALIDATION POPUP
// ================================
// Purpose: Show an error popup if the user tries to save without entering a file name.
// The popup can be dismissed by clicking outside of it or on a close button.

export function showFileNameValidationPopup() {
  const fileNameValidationPopup = document.getElementById('fileNameValidationPopup');
  const fileNamePopup = document.getElementById('fileNamePopup');
  const fileNameValidationMessage = document.getElementById('fileNameValidationMessage');

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

  if (fileNameValidationMessage) {
    fileNameValidationMessage.textContent = translate("ids.fileNameValidationMessage");
  }
  fileNameValidationPopup.style.display = 'flex';
}

// Hide the file name validation popup
export function hideFileNameValidationPopup() {
  const fileNameValidationPopup = document.getElementById('fileNameValidationPopup');
  if (fileNameValidationPopup) {
    fileNameValidationPopup.style.display = 'none';
  }
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

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      fileNamePopup.style.display = 'none';
      document.removeEventListener('keydown', handleKeyDown);
    } else if (event.key === 'Enter' && event.target === fileNameInput) {
      event.preventDefault();
      confirmSaveButton.click();
    }
  };

  // Add keyboard event listener
  document.addEventListener('keydown', handleKeyDown);

  // Dismiss popup when clicking outside of it
  const handleOutsideClick = (event) => {
    const popupValidation = document.getElementById('fileNameValidationPopup');
    if (event.target === fileNamePopup) {
      fileNamePopup.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    } else if (event.target === popupValidation) {
      popupValidation.style.display = 'none';
      // Remove the event listener after popup is closed
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    }
  };

  // Add event listener for outside clicks
  document.addEventListener('click', handleOutsideClick);

  // Focus the input field for keyboard navigation
  if (fileNameInput) {
    fileNameInput.focus();
  }
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
  const closeInvalidFilePopup = document.getElementById('closeInvalidFilePopup');

  // Apply translation
  if (message) {
    message.textContent = translate('ids.invalidFileMessage');
  }
  if (closeButton) {
    closeButton.textContent = translate('ids.closeWarningBtn'); // Reuse close label
  }

  popup.style.display = 'flex';

  // Close behavior
  if (closeButton) {
    closeButton.onclick = () => popup.style.display = 'none';
  }
  if (closeInvalidFilePopup) {
    closeInvalidFilePopup.onclick = () => popup.style.display = 'none';
  }
}

