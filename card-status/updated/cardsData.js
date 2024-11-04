export const season = 'winter'; // Set this dynamically based on your logic, e.g., using the current date.

import { currentCollectionFall } from '../seasons/fallCards.js';
import { currentCollectionWinter } from '../seasons/winterCards.js';

let currentCollection;

export function loadCollection() {

    if (season === 'fall') {
        currentCollection = currentCollectionFall; // Import fall cards
    } else if (season === 'winter') {
        currentCollection = currentCollectionWinter; // Import fall cards
    } /*else if (season === 'summer') {
        currentCollection = currentCollectionSummer; // Import fall cards
        return currentCollection; // Return the loaded collection directly
    } else if (season === 'spring') {
        currentCollection = currentCollectionSpring; // Import fall cards
        return currentCollection; // Return the loaded collection directly
    }*/
    return currentCollection; // Or handle the case when season doesn't match
}

