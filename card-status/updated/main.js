// ---------------------------------
// -------- IMPORTING FILES --------
// ---------------------------------

//import { currentCollection } from './cardsData.js';
import { translate, setLocale } from "./i18n.js";
import { loadCollection, season } from './cardsData.js';
import { renderCards, renderDecks } from './htmlGenerator.js';
import { generateRedditFormat, generateInGameFormat } from './formatGenerators.js';
import { showRedditFormat, showInGameFormat, hideUserMessage } from './formatView.js';
import { hideWarningPopup, hideFileNameValidationPopup } from './popupHandler.js';

import { saveOptions, loadOptions } from './fileOperations.js';

// ---- INITIATING CurrentCollection FROM CardsData.js
const currentCollection = loadCollection();


// ---------------------------------
// ---- I18N: APPLYING LABELS  -----
// ---------------------------------

function applyLabels() {

  console.log("Translation test:", translate("ids.warningMessage"));


  // -------- SECTION HEADERS ---------

  // "Save & Load Card Status"
  const saveLoad = document.getElementById("saveLoadSection");
  if (saveLoad) saveLoad.textContent = translate("ids.saveLoadSection");

  // "Choose Decks:"
  const chooseDecks = document.getElementById("chooseDecksSection");
  if (chooseDecks) chooseDecks.textContent = translate("ids.chooseDecksSection");

  // "Generate Text"
  const generateText = document.getElementById("generateTextSection");
  if (generateText) generateText.textContent = translate("ids.generateTextSection");

  // -------- MAIN BUTTONS ---------

  // Save
  const saveBtn = document.getElementById("saveOptionsBtn");
  if (saveBtn) saveBtn.textContent = translate("ids.saveOptionsBtn");

  // Load
  const loadBtn = document.getElementById("loadOptionsBtn");
  if (loadBtn) loadBtn.textContent = translate("ids.loadOptionsBtn");

  // -------- FORMAT BUTTONS (WITH <br>) ---------
  // These two labels include a line break. Use innerHTML so <br> renders.

  // "Show Reddit<br>Format"
  const redditBtn = document.getElementById("show-reddit-format");
  if (redditBtn) redditBtn.innerHTML = translate("ids.show-reddit-format");

  // "Show In-Game<br>Format"
  const inGameBtn = document.getElementById("show-in-game-format");
  if (inGameBtn) inGameBtn.innerHTML = translate("ids.show-in-game-format");

  // -------- OPTIONAL: POPUP LABELS ---------
  // Uncomment if you want to translate popup text now.

  // "Whoops!" message text inside the warning popup
  const warningMsg = document.getElementById("warningMessage");
  if (warningMsg) warningMsg.textContent = translate("ids.warningMessage");

  // "OK" button inside the warning popup
  const closeWarn = document.getElementById("closeWarningBtn");
  if (closeWarn) closeWarn.textContent = translate("ids.closeWarningBtn");

  // File name popup buttons
  const confirmSave = document.getElementById("confirmSaveBtn");
  if (confirmSave) confirmSave.textContent = translate("ids.confirmSaveBtn");

  const cancelBtn = document.getElementById("cancelBtn");
  if (cancelBtn) cancelBtn.textContent = translate("ids.cancelBtn");

  // File name validation popup title and message
  const fnTitle = document.getElementById("fileNameValidationTitle");
  if (fnTitle) fnTitle.textContent = translate("ids.fileNameValidationTitle");

  const fnMsg = document.getElementById("fileNameValidationMessage");
  if (fnMsg) fnMsg.textContent = translate("ids.fileNameValidationMessage");

  const okFileNameBtn = document.getElementById("okFileNameValidationBtn");
  if (okFileNameBtn) okFileNameBtn.textContent = translate("ids.okFileNameValidationBtn");

  // -------- OPTIONAL: PLACEHOLDERS ---------
  // If you want to localize input placeholders as well, uncomment this.
  const nameInput = document.getElementById("fileNameInput");
  if (nameInput) nameInput.placeholder = translate("placeholders.fileNameInput");
}


// ---------------------------------
// -- I18N: BOOT AND INITIAL LOAD --
// ---------------------------------

async function bootI18n() {
  // -------- PICK FROM DROPDOWN (PREDICTABLE) ---------
  const sel = document.getElementById("langSel");
  const initial = sel ? sel.value : "en";

  // -------- LOAD DICTIONARY ---------
  await setLocale(initial);

  // -------- APPLY LABELS ---------

  applyLabels();

}


// ---------------------------------
// ---- I18N: LANGUAGE SELECTOR ----
// ---------------------------------

function initLanguageSelector() {
  const sel = document.getElementById("langSel");
  if (!sel) return;

  // When the user changes language, load it and re-label UI
  sel.addEventListener("change", async () => {
    await setLocale(sel.value);
    applyLabels();
    // If later you localize dynamic decks/cards, re-render here:
    // renderCards();
    // renderDecks();
  });
}



// ---------------------------------
// -------- EVENT LISTENER ---------
// ---------------------------------

// Automatically generate formats on form input change
document.addEventListener('DOMContentLoaded', async function () {

  // -------- I18N: INITIALIZE ---------

  await bootI18n();
  initLanguageSelector();


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
