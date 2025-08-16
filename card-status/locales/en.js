export const translations = {
    // ================================
    // CARD MANAGEMENT SECTION
    // ================================
    cardManagement: {
        // Main section header
        sectionHeader: "Card Management",

        // Primary action buttons
        save: "Save",
        load: "Load",
        reset: "Reset",

        // File name input
        fileNamePlaceholder: "Name Your File Here",

        // Popup titles and messages
        savePopupTitle: "Save Card Status",
        fileNameMissingTitle: "Missing File Name",
        fileNameMissingMessage: "Please enter a file name to save your file",

        // Popup buttons
        confirmSave: "Save",
        confirmReset: "Confirm",
        cancel: "Cancel",
        ok: "OK"
    },

    // ================================
    // DECK SELECTION SECTION
    // ================================
    deckSelection: {
        sectionHeader: "Choose Decks:"
    },

    // ================================
    // BULK SELECTION SECTION
    // ================================
    bulkSelection: {
        sectionHeader: "Select All As:",
        needed: "Needed",
        duplicate: "Duplicate",
        owned: "Owned",
        feedbackMessage: "cards set as"
    },

    // ================================
    // FORMAT GENERATION SECTION
    // ================================
    format: {
        // Section headers
        sectionHeader: "Generate Text",
        redditFormatTitle: "Reddit Format",
        inGameFormatTitle: "In-Game Chat",

        // Format labels
        need: "NEED:",
        duplicate: "DUPLICATE:",

        // Format descriptions
        characterLimitDescription: "(1 paragraph, 500-character limit)",

        // Generated text labels
        cardsNeeded: "Cards Needed:",
        cardsDuplicated: "Cards Duplicated:"
    },

    // ================================
    // FORMAT BUTTONS
    // ================================
    formatButtons: {
        showRedditFormat: "Show Reddit<br>Format",
        showInGameFormat: "Show In-Game<br>Format"
    },

    // ================================
    // CARD OPTIONS
    // ================================
    cardOptions: {
        needed: "Needed",
        duplicate: "Duplicate",
        owned: "Owned",
        nonTrade: "Non-Trade"
    },

    // ================================
    // USER MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Start selecting your card status...",
        inGameUserMessage: "Start selecting your card status..."
    },

    // ================================
    // WARNING & ERROR MESSAGES
    // ================================
    warnings: {
        noSelectionWarning: "Select at least one \"needed\" or \"duplicate\" option before saving",
        invalidFileMessage: "Please select a valid .json file!"
    },

    // ================================
    // AUTO-SAVE SECTION
    // ================================
    autoSave: {
        sectionHeader: "Auto-Save Status",
        enabled: "Auto-save enabled",
        saving: "Saving...",
        saved: "Saved automatically",
        savingLoaded: "Saving loaded selections...",
        loadedSaved: "Loaded selections saved automatically"
    },

    // ================================
    // RESET CONFIRMATION POPUP
    // ================================
    resetConfirmation: {
        title: "Reset All?",
        message: "This will reset all cards to 'Owned' and clear auto-saves. Manual saves remain safe",
        warning: "This action cannot be undone.",
        confirmButton: "Confirm",
        cancelButton: "Cancel",
        successMessage: "✅ All selections cleared! You can now start fresh."
    },

};
