export const translations = {
    // ================================
    // SECTION HEADERS
    // ================================
    ids: {
        // Main application sections
        saveLoadSection: "Save & Load Card Status",
        chooseDecksSection: "Choose Decks:",
        generateTextSection: "Generate Text",

        // Primary action buttons
        saveOptionsBtn: "Save",
        loadOptionsBtn: "Load",

        // Format generation buttons (two-line labels use <br>)
        "show-reddit-format": "Show Reddit<br>Format",
        "show-in-game-format": "Show In-Game<br>Format",

        // Warning and error messages
        warningMessage: "Select at least one \"needed\" or \"duplicate\" option before saving",
        closeWarningBtn: "OK",
        invalidFileMessage: "Please select a valid .json file!",

        // File name input popup
        fileNamePopupTitle: "Save Card Status",
        confirmSaveBtn: "Save",
        cancelBtn: "Cancel",

        // File name validation popup
        fileNameValidationTitle: "Missing File Name",
        fileNameValidationMessage: "Please enter a file name to save your file",
        okFileNameValidationBtn: "OK"
    },

    // ================================
    // INPUT PLACEHOLDERS
    // ================================
    placeholders: {
        fileNameInput: "Name Your File Here"
    },

    // ================================
    // USER GUIDANCE MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Start selecting your card status...",
        inGameUserMessage: "Start selecting your card status...\nSplitting text after 500 characters"
    },

    // ================================
    // FORMAT OUTPUT TEXT
    // ================================
    format: {
        // Section headers for Reddit format
        cardsNeeded: "Cards Needed:",
        cardsDuplicated: "Cards Duplicated:",

        // Section headers for in-game format
        need: "NEED:",
        duplicate: "DUPLICATE:",

        // Format display titles
        redditFormatTitle: "Reddit Format",
        inGameFormatTitle: "In-Game Chat Format"
    }
};
