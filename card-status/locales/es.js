export const translations = {
    // ================================
    // SECTION HEADERS
    // ================================
    ids: {
        // Main application sections
        saveLoadSection: "Guardar y Cargar Estado",
        chooseDecksSection: "Elegir Barajas:",
        generateTextSection: "Generar Texto",

        // Primary action buttons
        saveOptionsBtn: "Guardar",
        loadOptionsBtn: "Cargar",
        resetAllBtn: "Empezar de Nuevo",

        // Format generation buttons
        "show-reddit-format": "Mostrar Formato<br>de Reddit",
        "show-in-game-format": "Mostrar Formato<br>en el Juego",

        // Warning and error messages
        warningMessage: "Selecciona al menos una opción \"faltante\" o \"duplicada\" antes de guardar",
        closeWarningBtn: "OK",
        invalidFileMessage: "El archivo seleccionado no es compatible!",

        // File name input popup
        fileNamePopupTitle: "Guardar Estado de Cartas",
        confirmSaveBtn: "Guardar",
        cancelBtn: "Cancelar",

        // File name validation popup
        fileNameValidationTitle: "Falta el Nombre del Archivo",
        fileNameValidationMessage: "Por favor, introduce un nombre para guardar el archivo",
        okFileNameValidationBtn: "OK",

        // Auto-save section header
        autoSaveSectionHeader: "Estado del Auto-Guardado",

        // Reset confirmation popup
        resetConfirmationTitle: "¿Empezar de Nuevo?",
        resetConfirmationMessage: "Esto restablecerá todas tus selecciones de cartas a \"Poseo esta carta\" y borrará cualquier dato auto-guardado.",
        resetConfirmationWarning: "Esta acción no se puede deshacer.",
        resetConfirmBtn: "Sí, Empezar de Nuevo",
        resetCancelBtn: "Cancelar",
        resetSuccessMessage: "✅ ¡Todas las selecciones han sido restablecidas! Puedes empezar de nuevo ahora."
    },

    // ================================
    // INPUT PLACEHOLDERS
    // ================================
    placeholders: {
        fileNameInput: "Nombra tu archivo aquí"
    },

    // ================================
    // USER GUIDANCE MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Empieza seleccionando el estado de tus cartas...",
        inGameUserMessage: "Empieza seleccionando el estado de tus cartas...\nEl texto se dividirá después de 500 caracteres"
    },

    // ================================
    // FORMAT OUTPUT
    // ================================
    // Purpose: Translate text that appears in the generated format output

    format: {
        cardsNeeded: "Cartas Necesarias:",
        cardsDuplicated: "Cartas Duplicadas:",
        need: "NECESITO:",
        duplicate: "DUPLICADO:",
        redditFormatTitle: "Formato Reddit",
        inGameFormatTitle: "Formato In-Game",
        characterLimitDescription: "(1 párrafo, límite de 500 caracteres)"
    },

    // ================================
    // COLLECTION DISPLAY
    // ================================
    // Purpose: Translate collection-related display text

    collection: {
        subtitle: "Colección Hobby"
    },

    // ================================
    // CARD OPTIONS
    // ================================
    // Purpose: Translate the radio button labels for card status

    cardOptions: {
        needed: "Necesito",
        duplicate: "Duplicado",
        owned: "Poseído",
        nonTrade: "No Negociable"
    },

    // ================================
    // AUTO-SAVE STATUS
    // ================================
    // Purpose: Translate auto-save status messages

    autoSave: {
        enabled: "Auto-guardado activado",
        saving: "Guardando...",
        saved: "Guardado automáticamente",
        savingLoaded: "Guardando selecciones cargadas...",
        loadedSaved: "Selecciones cargadas guardadas automáticamente"
    }
};
