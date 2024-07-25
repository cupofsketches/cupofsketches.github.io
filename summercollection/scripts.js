// Function to handle tab switching and display content
function openCollection(collectionName) {
    // Hide all tabcontent elements
    const tabcontents = document.querySelectorAll('.tabcontent');
    tabcontents.forEach(tabcontent => {
        tabcontent.style.display = 'none';
    });

    // Deactivate all tablinks
    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach(tablink => {
        tablink.classList.remove('active');
    });

    // Show the current tabcontent
    const currentTabcontent = document.getElementById(collectionName);
    if (currentTabcontent) {
        currentTabcontent.style.display = 'block';
    }

    // Activate the clicked tablink
    const clickedTablink = document.querySelector(`.tablink[data-collection="${collectionName}"]`);
    if (clickedTablink) {
        clickedTablink.classList.add('active');
    }
}

// Function to handle form submission and generate Reddit format
function generateRedditFormat() {
    const neededCards = {};
    const duplicateCards = {};

    // Function to process form data for a collection
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

    // Process form data for each collection
    const forms = document.querySelectorAll('.collection-form');
    forms.forEach(form => {
        const collectionName = form.getAttribute('data-collection');
        processFormData(form, collectionName);
    });

    // Generate Reddit format output
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

    // Display the generated Reddit format in the pre element
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

    // Function to process form data for a collection
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

    // Process form data for each collection
    const forms = document.querySelectorAll('.collection-form');
    forms.forEach(form => {
        const collectionName = form.getAttribute('data-collection');
        processFormData(form, collectionName);
    });

    // Generate In-Game format output
    let needed = '';
    let duplicate = '';

    if (Object.keys(neededCards).length > 0) {
        needed = 'NEED: ';
        let firstNeeded = true;
        for (const collection in neededCards) {
            if (!firstNeeded) {
                needed += '  /  ';
            }
            needed += `[${collection}] --> ${neededCards[collection].join(', ')}`;
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
                duplicate += '  /  ';
            }
            duplicate += `[${collection}] --> ${duplicateCards[collection].join(', ')}`;
            firstDuplicate = false;
        }
    }

    let inGameFormat = `${needed} ${duplicate}`;

    // Split the inGameFormat into chunks of 500 characters without breaking words
    const chunks = splitIntoChunks(inGameFormat, 500);

    // Display the generated In-Game format in the pre element
    const inGameFormatContainer = document.getElementById('in-game-format');
    inGameFormatContainer.innerHTML = '';
    chunks.forEach((chunk, index) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = chunk;
        inGameFormatContainer.appendChild(paragraph);
        
        // Add a line between paragraphs if it's not the last chunk
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

// Automatically generate formats on form input change
document.addEventListener('DOMContentLoaded', function () {
    // Show the initial tab content (Park) on page load
    document.getElementById('park').style.display = 'block';
    document.querySelector('.tablink').classList.add('active');

    // Attach event listener to each tablink to handle tab switching
    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach(tablink => {
        tablink.addEventListener('click', function () {
            openCollection(tablink.getAttribute('data-collection'));
        });
    });

    // Attach event listener to each form input to generate formats on change
    const formInputs = document.querySelectorAll('.collection-form input[type="radio"], .collection-form input[type="checkbox"]');
    formInputs.forEach(input => {
        input.addEventListener('change', () => {
            hideUserMessage();
            generateRedditFormat();
            generateInGameFormat();
        });
    });

    // Attach event listeners to buttons to show the desired format
    document.getElementById('show-reddit-format').addEventListener('click', showRedditFormat);
    document.getElementById('show-in-game-format').addEventListener('click', showInGameFormat);

    // Generate formats immediately on page load
    generateRedditFormat();
    generateInGameFormat();
});
