// ---------------------------------
// ---- GENERATING TEXT FORMAT -----
// ---------------------------------

// Shared function to process form data
function processFormData(form, collectionDeck, neededCards, duplicateCards) {
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    if (value === 'needed') {
      if (!neededCards[collectionDeck]) neededCards[collectionDeck] = [];
      neededCards[collectionDeck].push(key);
    } else if (value === 'duplicate') {
      if (!duplicateCards[collectionDeck]) duplicateCards[collectionDeck] = [];
      duplicateCards[collectionDeck].push(key);
    }
  });
}

// ------------ REDDIT -------------

// Function to handle form submission and generate Reddit format
export function generateRedditFormat() {
  // Define objects to store needed and duplicate cards
  const neededCards = {};
  const duplicateCards = {};

  // Collect data from all forms
  const forms = document.querySelectorAll('.collection-form');
  forms.forEach((form) => {
    const collectionDeck = form.getAttribute('data-collection');
    processFormData(form, collectionDeck, neededCards, duplicateCards);
  });

  // Format the output
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
  // Display the Reddit format
  document.getElementById('reddit-format').textContent = redditFormat;
}

// ----------- IN-GAME ------------

// Function to handle form submission and generate In-Game format
export function generateInGameFormat() {
  // Define objects to store needed and duplicate cards
  const neededCards = {};
  const duplicateCards = {};

  // Collect data from all forms
  const forms = document.querySelectorAll('.collection-form');
  forms.forEach((form) => {
    const collectionDeck = form.getAttribute('data-collection');
    processFormData(form, collectionDeck, neededCards, duplicateCards);
  });

  // Format the output
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

  // Split text into chunks for display
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

// Helper function to split text into chunks without breaking words
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
