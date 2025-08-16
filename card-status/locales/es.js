export const translations = {
    // ================================
    // CARD MANAGEMENT SECTION
    // ================================
    cardManagement: {
        // Main section header
        sectionHeader: "Gestión de Cartas",

        // Primary action buttons
        save: "Guardar",
        load: "Cargar",
        reset: "Limpiar",

        // File name input
        fileNamePlaceholder: "Nombra tu archivo aquí",

        // Popup titles and messages
        savePopupTitle: "Guardar Estado de las Cartas",
        fileNameMissingTitle: "Nombre de Archivo Faltante",
        fileNameMissingMessage: "Por favor, ingresa un nombre para guardar tu archivo",

        // Popup buttons
        confirmSave: "Guardar",
        confirmReset: "Confirmar",
        cancel: "Cancelar",
        ok: "OK"
    },

    // ================================
    // DECK SELECTION SECTION
    // ================================
    deckSelection: {
        sectionHeader: "Elegir Mazos:"
    },

    // ================================
    // BULK SELECTION SECTION
    // ================================
    bulkSelection: {
        sectionHeader: "Seleccionar Todos Como:",
        needed: "Necesito",
        duplicate: "Duplicado",
        owned: "Tengo",
        feedbackMessage: "cartas establecidas como"
    },

    // ================================
    // FORMAT GENERATION SECTION
    // ================================
    format: {
        // Section headers
        sectionHeader: "Generar Texto",
        redditFormatTitle: "Formato Reddit",
        inGameFormatTitle: "Formato del Juego",

        // Format labels
        need: "NECESITO:",
        duplicate: "DUPLICADO:",

        // Format descriptions
        characterLimitDescription: "(1 párrafo, límite de 500 caracteres)",

        // Generated text labels
        cardsNeeded: "Cartas Necesarias:",
        cardsDuplicated: "Cartas Duplicadas:"
    },

    // ================================
    // FORMAT BUTTONS
    // ================================
    formatButtons: {
        showRedditFormat: "Mostrar Formato<br>Reddit",
        showInGameFormat: "Mostrar Formato<br>del Juego"
    },

    // ================================
    // CARD OPTIONS
    // ================================
    cardOptions: {
        needed: "Necesito",
        duplicate: "Duplicado",
        owned: "Tengo",
        nonTrade: "No Intercambiable"
    },

    // ================================
    // USER MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Empieza seleccionando el estado de tus cartas...",
        inGameUserMessage: "Empieza seleccionando el estado de tus cartas..."
    },

    // ================================
    // WARNING & ERROR MESSAGES
    // ================================
    warnings: {
        noSelectionWarning: "Selecciona al menos una opción \"necesaria\" o \"duplicada\" antes de guardar",
        invalidFileMessage: "¡Por favor, selecciona un archivo .json válido!"
    },

    // ================================
    // AUTO-SAVE SECTION
    // ================================
    autoSave: {
        sectionHeader: "Estado de Auto-Guardado",
        enabled: "Auto-guardado habilitado",
        saving: "Guardando...",
        saved: "Guardado automáticamente",
        savingLoaded: "Guardando selecciones cargadas...",
        loadedSaved: "Selecciones cargadas guardadas automáticamente"
    },

    // ================================
    // RESET CONFIRMATION POPUP
    // ================================
    resetConfirmation: {
        title: "¿Limpiar Todo?",
        message: "Esto restablecerá todas las cartas a 'Tengo' y limpiará auto-guardados. Los guardados manuales permanecen seguros",
        warning: "Esta acción no se puede deshacer.",
        confirmButton: "Confirmar",
        cancelButton: "Cancelar",
        successMessage: "✅ ¡Todas las selecciones han sido limpiadas! Puedes comenzar de nuevo ahora."
    }
};
