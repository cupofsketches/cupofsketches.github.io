// ---------------------------------
// -------- IMPORTING FILES --------
// ---------------------------------

import { currentCollection } from './cardsData.js';

// ---------------------------------
// -- GENERATING HTML DYNAMICALLY --
// ---------------------------------

// ---- BUILDING (TAB CONTENT) DYNAMICALLY - ALL CARDS
export function generateCardsHTML(collection) {
    const formId = `${collection.id}-form`;

    const cardsHTML = collection.cards
        .map((card) => {
            if (card.isGold) {
                return `
                <div class="card gold">
                    <label class="cardName">${card.name}</label><br>
                    <div class="option">
                        <input type="radio" name="${card.name}" checked="false" value="owned" class="disabled">
                        <span style="color:rgb(179, 179, 179)"> Non-Trade </span>
                    </div>
                </div>
            `;
            } else {
                return `
                <div class="card">
                    <label class="cardName">${card.name}</label><br>
                    <div class="option">
                        <input type="radio" name="${card.name}" value="needed"> Needed<br>
                        <input type="radio" name="${card.name}" value="duplicate"> Duplicate<br>
                        <input type="radio" name="${card.name}" checked="false" value="owned" class="disabled">
                        <span style="color:rgb(179, 179, 179)"> Owned</span>
                    </div>
                </div>
            `;
            }
        })
        .join('');

    return `
        <div id="${collection.id}" class="tabcontent">
            <form id="${formId}" class="collection-form" data-collection="${collection.id}">
                <fieldset class="fieldset divider">
                    <legend>${collection.legend}</legend>
                    <div class="card-container">
                        ${cardsHTML}
                    </div>
                </fieldset>
            </form>
        </div>
    `;
}

// ---- RENDERING (TAB CONTENT) DYNAMICALLY - ALL CARDS
export function renderCards() {
    const container = document.getElementById('cards-container'); // Placeholder DIV
    container.innerHTML = currentCollection.map(generateCardsHTML).join('');
}

// ---- BUILDING (DECKS) DYNAMICALLY - ALL DECKS
export function generateDeckHTML(collection) {
    const deckId = collection.id;
    const deckName = collection.name;

    if (deckId === currentCollection[0].id) {
        return `
        <button class="tablink active" data-collection="${deckId}" onclick="openCollection('${deckId}')">
            ${deckName}
        </button>
        `;
    } else {
        return `
        <button class="tablink" data-collection="${deckId}" onclick="openCollection('${deckId}')">
            ${deckName}
        </button>
    `;
    }
}

// ---- RENDERING (DECKS) DYNAMICALLY - ALL DECKS
export function renderDecks() {
    const container = document.getElementById('decks-container'); // Placeholder DIV
    container.innerHTML = currentCollection.map(generateDeckHTML).join('');
}
