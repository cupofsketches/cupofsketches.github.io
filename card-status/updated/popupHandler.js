// ---------------------------------
// ------------ POP UPS ------------
// ---------------------------------

// ---- WARNING POPUP
//"Select at least one 'needed' or 'duplicate' option before saving"

// Function to show the warning popup
export function showWarningPopup(message) {
  const popupWarning = document.getElementById('warningPopup');
  // Handle clicking outside the popup
  window.onclick = (event) => {
    if (event.target === popupWarning) {
      popupWarning.style.display = 'none';
    }
  };

  document.getElementById('warningMessage').textContent = message;
  document.getElementById('warningPopup').style.display = 'flex';
}

// Function to hide the warning popup
export function hideWarningPopup() {
  document.getElementById('warningPopup').style.display = 'none';
}

// Function to show the file name validation popup
export function showFileNameValidationPopup(message) {
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

  document.getElementById('fileNameValidationMessage').textContent = message;
  document.getElementById('fileNameValidationPopup').style.display = 'flex';
}

// ---- FILE NAME INPUT

// Function to show the custom popup for file name input
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

  // Handle file name confirmation
  confirmBtn.onclick = () => {
    const fileName = fileNameInput.value.trim();
    if (fileName) {
      popup.style.display = 'none';
      callback(fileName);
    } else {
      showFileNameValidationPopup('Please enter a file name to save your file.');
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
