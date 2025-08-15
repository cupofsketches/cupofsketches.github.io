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
    // FORMAT OUTPUT TEXT
    // ================================
    format: {
        // Section headers for Reddit format
        cardsNeeded: "Cartas Necesarias:",
        cardsDuplicated: "Cartas Duplicadas:",

        // Section headers for in-game format
        need: "NECESITO:",
        duplicate: "DUPLICADO:",

        // Format display titles
        redditFormatTitle: "Formato de Reddit",
        inGameFormatTitle: "Formato en el Juego"
    }
};
