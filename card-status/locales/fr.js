export const translations = {
    // ================================
    // CARD MANAGEMENT SECTION
    // ================================
    cardManagement: {
        // Main section header
        sectionHeader: "Gestion des Cartes",

        // Primary action buttons
        save: "Sauvegarder",
        load: "Charger",
        reset: "Réinitialiser",

        // File name input
        fileNamePlaceholder: "Nommez Votre Fichier Ici",

        // Popup titles and messages
        savePopupTitle: "Sauvegarder le Statut des Cartes",
        fileNameMissingTitle: "Nom de Fichier Manquant",
        fileNameMissingMessage: "Veuillez entrer un nom de fichier pour sauvegarder votre fichier",

        // Popup buttons
        confirmSave: "Sauvegarder",
        confirmReset: "Confirmer",
        cancel: "Annuler",
        ok: "OK"
    },

    // ================================
    // DECK SELECTION SECTION
    // ================================
    deckSelection: {
        sectionHeader: "Choisir les Paquets :"
    },

    // ================================
    // BULK SELECTION SECTION
    // ================================
    bulkSelection: {
        sectionHeader: "Tout Sélectionner Comme :",
        needed: "Nécessaire",
        duplicate: "Dupliqué",
        owned: "Possédé",
        feedbackMessage: "cartes définies comme"
    },

    // ================================
    // FORMAT GENERATION SECTION
    // ================================
    format: {
        // Section headers
        sectionHeader: "Générer du Texte",
        redditFormatTitle: "Format Reddit",
        inGameFormatTitle: "Chat en Jeu",

        // Format labels
        need: "BESOIN :",
        duplicate: "DUPLIQUÉ :",

        // Format descriptions
        characterLimitDescription: "(1 paragraphe, limite de 500 caractères)",

        // Generated text labels
        cardsNeeded: "Cartes Nécessaires :",
        cardsDuplicated: "Cartes Dupliquées :",

        // Language guidance message
        redditLanguageMessage: "Pour poster dans r/RoyalMatchGame, veuillez passer en anglais."
    },

    // ================================
    // FORMAT BUTTONS
    // ================================
    formatButtons: {
        showRedditFormat: "Afficher Format<br>Reddit",
        showInGameFormat: "Afficher Format<br>En Jeu"
    },

    // ================================
    // CARD OPTIONS
    // ================================
    cardOptions: {
        needed: "Nécessaire",
        duplicate: "Dupliqué",
        owned: "Possédé",
        nonTrade: "Non-Échangeable"
    },

    // ================================
    // USER MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Commencez à sélectionner le statut de vos cartes...",
        inGameUserMessage: "Commencez à sélectionner le statut de vos cartes..."
    },

    // ================================
    // WARNING & ERROR MESSAGES
    // ================================
    warnings: {
        noSelectionWarning: "Sélectionnez au moins une option \"nécessaire\" ou \"dupliqué\" avant de sauvegarder",
        invalidFileMessage: "Veuillez sélectionner un fichier .json valide !"
    },

    // ================================
    // AUTO-SAVE SECTION
    // ================================
    autoSave: {
        sectionHeader: "Statut de Sauvegarde Automatique",
        enabled: "Sauvegarde automatique activée",
        saving: "Sauvegarde en cours...",
        saved: "Sauvegardé automatiquement",
        savingLoaded: "Sauvegarde des sélections chargées...",
        loadedSaved: "Sélections chargées sauvegardées automatiquement"
    },

    // ================================
    // RESET CONFIRMATION POPUP
    // ================================
    resetConfirmation: {
        title: "Tout Réinitialiser ?",
        message: "Cela réinitialisera toutes les cartes à 'Possédé' et effacera les sauvegardes automatiques. Les sauvegardes manuelles restent en sécurité",
        warning: "Cette action ne peut pas être annulée.",
        confirmButton: "Confirmer",
        cancelButton: "Annuler",
        successMessage: "✅ Toutes les sélections effacées ! Vous pouvez maintenant recommencer."
    },

};
