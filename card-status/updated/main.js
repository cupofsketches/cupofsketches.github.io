// ---------------------------------
// -------- IMPORTING FILES --------
// ---------------------------------

//import { currentCollection } from './cardsData.js';
import { loadCollection, season } from './cardsData.js';
import { renderCards, renderDecks } from './htmlGenerator.js';
import { generateRedditFormat, generateInGameFormat } from './formatGenerators.js';
import { showRedditFormat, showInGameFormat, hideUserMessage } from './formatView.js';
import { hideWarningPopup, hideFileNameValidationPopup } from './popupHandler.js';

import { saveOptions, loadOptions } from './fileOperations.js';

// ---- INITIATING CurrentCollection FROM CardsData.js
const currentCollection = loadCollection();

// ---------------------------------
// -------- EVENT LISTENER ---------
// ---------------------------------

// Automatically generate formats on form input change
document.addEventListener('DOMContentLoaded', function () {
  // -------- HTML GENERATOR ---------

  const titleElement = document.querySelector('h1 span.subtitle');

  if (titleElement) {
    // Update the subtitle with the current season
    titleElement.textContent = `- ${season.charAt(0).toUpperCase() + season.slice(1)} Collection -`;
  }

  // showing in browser (decks & cards) dynamically with render functions
  renderCards(); //
  renderDecks(); //

  // --- DISPLAYING TABS (DECKS) ----

  // First tab is active

  document.getElementById(currentCollection[0].id).style.display = 'block';
  document.querySelector('.tablink').classList.add('active');

  // Add event listeners for collection tabs
  const tablinks = document.querySelectorAll('.tablink');
  tablinks.forEach((tablink) => {
    tablink.addEventListener('click', function () {
      openCollection(tablink.getAttribute('data-collection'));
    });
  });

  // ---- DISPLAYING TEXT FORMAT ----

  // Add event listeners for form inputs
  const formInputs = document.querySelectorAll(
    '.collection-form input[type="radio"], .collection-form input[type="checkbox"]'
  );

  formInputs.forEach((input) => {
    input.addEventListener('change', () => {
      hideUserMessage();
      generateRedditFormat();
      generateInGameFormat();
    });
  });

  // Add event listeners for showing formats
  document.getElementById('show-reddit-format').addEventListener('click', showRedditFormat);
  document.getElementById('show-in-game-format').addEventListener('click', showInGameFormat);

  // ------------ SAVING -------------

  // Add event listeners for saving options
  document.getElementById('saveOptionsBtn').addEventListener('click', saveOptions);

  // Add event listener to the OK button in the warning popup
  document.getElementById('closeWarningBtn').addEventListener('click', hideWarningPopup);

  // Add event listener to the OK button in the file name validation popup
  document
    .getElementById('okFileNameValidationBtn')
    .addEventListener('click', hideFileNameValidationPopup);

  // ------------ LOADING ------------

  // Add event listeners for load options
  document
    .getElementById('loadOptionsBtn')
    .addEventListener('click', () => document.getElementById('loadInput').click());
  document.getElementById('loadInput').addEventListener('change', loadOptions);

  // Generate formats initially
  generateRedditFormat();
  generateInGameFormat();
});
