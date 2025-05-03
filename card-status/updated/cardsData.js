export const season = 'space'; // Set this dynamically based on your logic, e.g., using the current date.

import { currentCollectionFall } from '../seasons/fallCards.js';
import { currentCollectionWinter } from '../seasons/winterCards.js';
import { currentCollectionJourney } from '../seasons/journeyCards.js';
import { currentCollectionNature } from '../seasons/natureCards.js';
import { currentCollectionSpace } from '../seasons/spaceCards.js';

let currentCollection;

export function loadCollection() {

    if (season === 'fall') {
        currentCollection = currentCollectionFall; // Import fall cards
    } else if (season === 'winter') {
        currentCollection = currentCollectionWinter; // Import winter cards
    } else if (season === 'journey') {
        currentCollection = currentCollectionJourney; // Import journey cards
    } else if (season === 'nature') {
        currentCollection = currentCollectionNature; // Import nature cards
    } else if (season === 'space') {
        currentCollection = currentCollectionSpace; // Import space cards
    }
    console.log(currentCollection);
    return currentCollection; // Or handle the case when season doesn't match

}

