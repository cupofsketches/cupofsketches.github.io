export const translations = {
    // ================================
    // CARD MANAGEMENT SECTION
    // ================================
    cardManagement: {
        // Main section header
        sectionHeader: "Kartenverwaltung",

        // Primary action buttons
        save: "Speichern",
        load: "Laden",
        reset: "Zurücksetzen",

        // File name input
        fileNamePlaceholder: "Dateinamen hier eingeben",

        // Popup titles and messages
        savePopupTitle: "Kartenstatus speichern",
        fileNameMissingTitle: "Dateiname fehlt",
        fileNameMissingMessage: "Bitte gib einen Dateinamen ein, um die Datei zu speichern",

        // Popup buttons
        confirmSave: "Speichern",
        confirmReset: "Bestätigen",
        cancel: "Abbrechen",
        ok: "OK"
    },

    // ================================
    // DECK SELECTION SECTION
    // ================================
    deckSelection: {
        sectionHeader: "Decks auswählen:"
    },

    // ================================
    // BULK SELECTION SECTION
    // ================================
    bulkSelection: {
        sectionHeader: "Alle auswählen als:",
        needed: "Benötigt",
        duplicate: "Doppelt",
        owned: "Besitzt",
        feedbackMessage: "Karten als festgelegt"
    },

    // ================================
    // FORMAT GENERATION SECTION
    // ================================
    format: {
        // Section headers
        sectionHeader: "Text generieren",
        redditFormatTitle: "Reddit-Format",
        inGameFormatTitle: "In-Game-Format",

        // Format labels
        need: "BENÖTIGT:",
        duplicate: "DOPPELT:",

        // Format descriptions
        characterLimitDescription: "(1 Absatz, Limit: 500 Zeichen)",

        // Generated text labels
        cardsNeeded: "Benötigte Karten:",
        cardsDuplicated: "Doppelte Karten:",

        // Language guidance message
        redditLanguageMessage: "Zum Posten in r/RoyalMatchGame bitte auf Englisch umschalten."
    },

    // ================================
    // FORMAT BUTTONS
    // ================================
    formatButtons: {
        showRedditFormat: "Reddit-<br>Format anzeigen",
        showInGameFormat: "In-Game-<br>Format anzeigen"
    },

    // ================================
    // CARD OPTIONS
    // ================================
    cardOptions: {
        needed: "Benötigt",
        duplicate: "Doppelt",
        owned: "Besitzt",
        nonTrade: "Nicht tauschbar"
    },

    // ================================
    // USER MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Beginne mit der Auswahl des Kartenstatus...",
        inGameUserMessage: "Beginne mit der Auswahl des Kartenstatus..."
    },

    // ================================
    // WARNING & ERROR MESSAGES
    // ================================
    warnings: {
        noSelectionWarning: "Bitte wähle mindestens eine Option 'benötigt' oder 'doppelt' aus, bevor du speicherst",
        invalidFileMessage: "Bitte wähle eine gültige .json-Datei aus!"
    },

    // ================================
    // AUTO-SAVE SECTION
    // ================================
    autoSave: {
        sectionHeader: "Auto-Speicherstatus",
        enabled: "Auto-Speichern aktiviert",
        saving: "Speichern...",
        saved: "Automatisch gespeichert",
        savingLoaded: "Geladene Auswahl wird gespeichert…",
        loadedSaved: "Geladene Auswahl automatisch gespeichert"
    },

    // ================================
    // RESET CONFIRMATION POPUP
    // ================================
    resetConfirmation: {
        title: "Alles zurücksetzen?",
        message: "Dadurch werden alle Karten auf 'Besitzt' zurückgesetzt und Auto-Speicher gelöscht. Manuelle Speicherungen bleiben erhalten",
        warning: "Diese Aktion kann nicht rückgängig gemacht werden.",
        confirmButton: "Bestätigen",
        cancelButton: "Abbrechen",
        successMessage: "✅ Alle Auswahlen wurden zurückgesetzt! Du kannst nun neu beginnen."
    }
};
