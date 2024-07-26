// Function to handle tab switching and display content
function openCollection(collectionName) {
    const tabcontents = document.querySelectorAll('.tabcontent');
    tabcontents.forEach(tabcontent => {
        tabcontent.style.display = 'none';
    });

    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach(tablink => {
        tablink.classList.remove('active');
    });

    const currentTabcontent = document.getElementById(collectionName);
    if (currentTabcontent) {
        currentTabcontent.style.display = 'block';
    }

    const clickedTablink = document.querySelector(`.tablink[data-collection="${collectionName}"]`);
    if (clickedTablink) {
        clickedTablink.classList.add('active');
    }
}

// Function to handle form submission and generate Reddit format
function generateRedditFormat() {
    const neededCards = {};
    const duplicateCards = {};

    function processFormData(form, collectionName) {
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            if (value === 'needed') {
                if (!neededCards[collectionName]) neededCards[collectionName] = [];
                neededCards[collectionName].push(key);
            } else if (value === 'duplicate') {
                if (!duplicateCards[collectionName]) duplicateCards[collectionName] = [];
                duplicateCards[collectionName].push(key);
            }
        });
    }

    const forms = document.querySelectorAll('.collection-form');
    forms.forEach(form => {
        const collectionName = form.getAttribute('data-collection');
        processFormData(form, collectionName);
    });

    let redditFormat = '';
    let needCards = false;
    if (Object.keys(neededCards).length > 0) {
        redditFormat += '**Cards Needed**:\n\n';
        for (const collection in neededCards) {
            redditFormat += `- ${collection} ➜ ${neededCards[collection].join(', ')}\n`;
        }
        needCards = true;
    }

    if (Object.keys(duplicateCards).length > 0) {
        if (needCards) {
            redditFormat += '\n\n';
        }
        redditFormat += '**Cards Duplicated**:\n\n';
        for (const collection in duplicateCards) {
            redditFormat += `- ${collection} ➜ ${duplicateCards[collection].join(', ')}\n`;
        }
    }

    document.getElementById('reddit-format').textContent = redditFormat;
}

// Helper function to split text into chunks of a specified size without breaking words
function splitIntoChunks(text, chunkSize) {
    const chunks = [];
    let startIndex = 0;
    while (startIndex < text.length) {
        let endIndex = startIndex + chunkSize;
        if (endIndex < text.length) {
            endIndex = text.lastIndexOf(' ', endIndex);
            if (endIndex <= startIndex) {
                endIndex = startIndex + chunkSize;
            }
        }
        chunks.push(text.slice(startIndex, endIndex).trim());
        startIndex = endIndex + 1;
    }
    return chunks;
}

// Function to handle form submission and generate In-Game format
function generateInGameFormat() {
    const neededCards = {};
    const duplicateCards = {};

    function processFormData(form, collectionName) {
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            if (value === 'needed') {
                if (!neededCards[collectionName]) neededCards[collectionName] = [];
                neededCards[collectionName].push(key);
            } else if (value === 'duplicate') {
                if (!duplicateCards[collectionName]) duplicateCards[collectionName] = [];
                duplicateCards[collectionName].push(key);
            }
        });
    }

    const forms = document.querySelectorAll('.collection-form');
    forms.forEach(form => {
        const collectionName = form.getAttribute('data-collection');
        processFormData(form, collectionName);
    });

    let needed = '';
    let duplicate = '';

    if (Object.keys(neededCards).length > 0) {
        needed = 'NEED: ';
        let firstNeeded = true;
        for (const collection in neededCards) {
            if (!firstNeeded) {
                needed += ' / ';
            }
            needed += `[${collection}] => ${neededCards[collection].join(', ')}`;
            firstNeeded = false;
        }
    }

    if (Object.keys(duplicateCards).length > 0) {
        if (needed !== '') {
            duplicate = ' ||  DUPLICATE: ';
        } else {
            duplicate = 'DUPLICATE: ';
        }
        let firstDuplicate = true;
        for (const collection in duplicateCards) {
            if (!firstDuplicate) {
                duplicate += ' / ';
            }
            duplicate += `[${collection}] => ${duplicateCards[collection].join(', ')}`;
            firstDuplicate = false;
        }
    }

    let inGameFormat = `${needed} ${duplicate}`;

    const chunks = splitIntoChunks(inGameFormat, 500);

    const inGameFormatContainer = document.getElementById('in-game-format');
    inGameFormatContainer.innerHTML = '';
    chunks.forEach((chunk, index) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = chunk;
        inGameFormatContainer.appendChild(paragraph);
        
        if (index < chunks.length - 1) {
            const line = document.createElement('hr');
            inGameFormatContainer.appendChild(line);
        }
    });
}

// Function to show the Reddit format
function showRedditFormat() {
    document.getElementById('reddit-format-container').style.display = 'block';
    document.getElementById('in-game-format-container').style.display = 'none';
}

// Function to show the In-Game format
function showInGameFormat() {
    document.getElementById('reddit-format-container').style.display = 'none';
    document.getElementById('in-game-format-container').style.display = 'block';
}

// Function to hide the user message
function hideUserMessage() {
    document.getElementById('user-message').style.display = 'none';
    document.getElementById('in-game-user-message').style.display = 'none';
}

// Save options to a file
// Function to show the warning popup
function showWarningPopup(message) {
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
function hideWarningPopup() {
    document.getElementById('warningPopup').style.display = 'none';
}

// Add event listener to the OK button in the warning popup
document.getElementById('closeWarningBtn').addEventListener('click', hideWarningPopup);

// Function to show the file name validation popup
function showFileNameValidationPopup(message) {
   
    const popupValidation = document.getElementById('fileNameValidationPopup');
    const popup = document.getElementById('fileNamePopup');

       // Handle clicking outside the popup
    window.onclick = (event) => {
        if (event.target === popupValidation) {
            popupValidation.style.display = 'none';
        }else if(event.target === popup){
            popup.style.display = 'none';
        }
    };

    document.getElementById('fileNameValidationMessage').textContent = message;
    document.getElementById('fileNameValidationPopup').style.display = 'flex';
    
}

// Function to show the custom popup for file name input
function showFileNamePopup(callback) {
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
function hideFileNameValidationPopup() {
    document.getElementById('fileNameValidationPopup').style.display = 'none';
}

// Add event listener to the OK button in the file name validation popup
document.getElementById('okFileNameValidationBtn').addEventListener('click', hideFileNameValidationPopup);


// Function to save options to a file
function saveOptions() {
    // Check if any 'needed' or 'duplicate' options are selected
    const forms = document.querySelectorAll('.collection-form');
    let optionsSelected = false;

    forms.forEach(form => {
        const radioButtons = form.querySelectorAll('input[type="radio"]');
        const selectedOptions = Array.from(radioButtons).some(radio => radio.checked && (radio.value === 'needed' || radio.value === 'duplicate'));
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

        forms.forEach(form => {
            const collectionName = form.getAttribute('data-collection');
            processFormData(form, collectionName);
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

// Add event listener to the save button
document.getElementById('saveOptionsBtn').addEventListener('click', saveOptions);



// Load options from a file
function loadOptions(event) {
    function hideUserMessage() {
        document.getElementById('user-message').style.display = 'none';
        document.getElementById('in-game-user-message').style.display = 'none';
    }
    const file = event.target.files[0];
    if (file) {
        hideUserMessage();
        const reader = new FileReader();
        reader.onload = function () {
            const optionsData = JSON.parse(reader.result);
            document.querySelectorAll('.collection-form').forEach(form => {
                const collectionName = form.getAttribute('data-collection');
                if (optionsData.neededCards[collectionName]) {
                    optionsData.neededCards[collectionName].forEach(card => {
                        form.querySelector(`input[name="${card}"][value="needed"]`).checked = true;
                    });
                }
                if (optionsData.duplicateCards[collectionName]) {
                    optionsData.duplicateCards[collectionName].forEach(card => {
                        form.querySelector(`input[name="${card}"][value="duplicate"]`).checked = true;
                    });
                }
                if (optionsData.ownedCards[collectionName]) {
                    optionsData.ownedCards[collectionName].forEach(card => {
                        form.querySelector(`input[name="${card}"][value="owned"]`).checked = true;
                    });
                }
            });

            generateRedditFormat();
            generateInGameFormat();
        };
        reader.readAsText(file);

    }
}

// Automatically generate formats on form input change
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('park').style.display = 'block';
    document.querySelector('.tablink').classList.add('active');

    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach(tablink => {
        tablink.addEventListener('click', function () {
            openCollection(tablink.getAttribute('data-collection'));
        });
    });

    const formInputs = document.querySelectorAll('.collection-form input[type="radio"], .collection-form input[type="checkbox"]');
    formInputs.forEach(input => {
        input.addEventListener('change', () => {
            hideUserMessage();
            generateRedditFormat();
            generateInGameFormat();
        });
    });

    document.getElementById('show-reddit-format').addEventListener('click', showRedditFormat);
    document.getElementById('show-in-game-format').addEventListener('click', showInGameFormat);

    document.getElementById('saveOptionsBtn').addEventListener('click', saveOptions);
    document.getElementById('loadOptionsBtn').addEventListener('click', () => document.getElementById('loadInput').click());
    document.getElementById('loadInput').addEventListener('change', loadOptions);

    generateRedditFormat();
    generateInGameFormat();
});
