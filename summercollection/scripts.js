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
    let redditFormat = '**Cards Needed**:\n\n';
    for (const collection in neededCards) {
        redditFormat += `- ${collection}: ${neededCards[collection].join(', ')}\n`;
    }

    redditFormat += '\n\n**Cards Duplicated**:\n\n';
    for (const collection in duplicateCards) {
        redditFormat += `- ${collection}: ${duplicateCards[collection].join(', ')}\n`;
    }

    // Display the generated Reddit format in the pre element
    document.getElementById('reddit-format').textContent = redditFormat;
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
    let needed = 'NEEDED: ';
    let duplicate = 'DUPLICATE: ';

    const neededArray = [];
    const duplicateArray = [];

    for (const collection in neededCards) {
        neededCards[collection].forEach(card => {
            neededArray.push(`${card} (${collection})`);
        });
    }

    for (const collection in duplicateCards) {
        duplicateCards[collection].forEach(card => {
            duplicateArray.push(`${card} (${collection})`);
        });
    }

    needed += neededArray.join(', ');
    duplicate += duplicateArray.join(', ');

    let inGameFormat = `${needed} || ${duplicate}`;

    // Display the generated In-Game format in the pre element
    document.getElementById('in-game-format').textContent = inGameFormat;
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
