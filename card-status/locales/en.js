export const translations = {
    ids: {
        // Sections
        saveLoadSection: "Save & Load Card Status",
        chooseDecksSection: "Choose Decks:",
        generateTextSection: "Generate Text",

        // Main buttons
        saveOptionsBtn: "Save",
        loadOptionsBtn: "Load",

        // Format buttons (two-line labels use <br>)
        "show-reddit-format": "Show Reddit<br>Format",
        "show-in-game-format": "Show In-Game<br>Format",

        // Warning popup
        warningMessage: "Select at least one \"needed\" or \"duplicate\" option before saving",
        closeWarningBtn: "OK",
        invalidFileMessage: "Please select a valid .json file!",

        // File name popup
        fileNamePopupTitle: "Save Card Status",
        confirmSaveBtn: "Save",
        cancelBtn: "Cancel",

        // File name validation popup
        fileNameValidationTitle: "Missing File Name",
        fileNameValidationMessage: "Please enter a file name to save your file",
        okFileNameValidationBtn: "OK"
    },

    // Optional placeholders
    placeholders: {
        fileNameInput: "Name Your File Here"
    },

    // Optional free-text messages (if you want to set these by ID later)
    messages: {
        redditUserMessage: "Start selecting your card status...",
        inGameUserMessage: "Start selecting your card status...\nSplitting text after 500 characters"
    },

    // Format text translations
    format: {
        cardsNeeded: "Cards Needed:",
        cardsDuplicated: "Cards Duplicated:",
        need: "NEED:",
        duplicate: "DUPLICATE:",
        redditFormatTitle: "Reddit Format",
        inGameFormatTitle: "In-Game Chat Format"
    }
};
