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
        okFileNameValidationBtn: "OK"
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
    }
};
