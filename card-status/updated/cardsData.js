export const season = 'journey'; // Set this dynamically based on your logic, e.g., using the current date.

import { currentCollectionFall } from '../seasons/fallCards.js';
import { currentCollectionWinter } from '../seasons/winterCards.js';
import { currentCollectionJourney } from '../seasons/journeyCards.js';

let currentCollection;

export function loadCollection() {

    if (season === 'fall') {
        currentCollection = currentCollectionFall; // Import fall cards
    } else if (season === 'winter') {
        currentCollection = currentCollectionWinter; // Import fall cards
    } else if (season === 'journey') {
        currentCollection = currentCollectionJourney; // Import fall cards
    }

    return currentCollection; // Or handle the case when season doesn't match
}

