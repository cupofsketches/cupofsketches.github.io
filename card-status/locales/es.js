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
        resetAllBtn: "Limpiar",

        // Format generation buttons (two-line labels use <br>)
        "show-reddit-format": "Mostrar Formato<br>Reddit",
        "show-in-game-format": "Mostrar Formato<br>del Juego",

        // Warning and error messages
        warningMessage: "Selecciona al menos una opción \"necesaria\" o \"duplicada\" antes de guardar",
        closeWarningBtn: "OK",
        invalidFileMessage: "¡Por favor, selecciona un archivo .json válido!",

        // File name input popup
        fileNamePopupTitle: "Guardar Estado de las Cartas",
        confirmSaveBtn: "Guardar",
        cancelBtn: "Cancelar",

        // File name validation popup
        fileNameValidationTitle: "Nombre de Archivo Faltante",
        fileNameValidationMessage: "Por favor, ingresa un nombre para guardar tu archivo",
        okFileNameValidationBtn: "OK",

        // Auto-save section header
        autoSaveSectionHeader: "Estado de Auto-Guardado",

        // Reset confirmation popup
        resetConfirmationTitle: "¿Limpiar Todo?",
        resetConfirmationMessage: "Esto restablecerá todas tus selecciones de cartas a \"Tengo\" y limpiará cualquier dato guardado automáticamente. Los guardados manuales están seguros y no se verán afectados.",
        resetConfirmationWarning: "Esta acción no se puede deshacer.",
        resetConfirmBtn: "Confirmar",
        resetCancelBtn: "Cancelar",
        resetSuccessMessage: "✅ ¡Todas las selecciones han sido limpiadas! Puedes comenzar de nuevo ahora."
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
        owned: "Tengo",
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
