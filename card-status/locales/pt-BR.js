export const translations = {
    // ================================
    // SECTION HEADERS
    // ================================
    ids: {
        // Main application sections
        saveLoadSection: "Salvar e Carregar Status",
        chooseDecksSection: "Escolher Baralhos:",
        generateTextSection: "Gerar Texto",

        // Primary action buttons
        saveOptionsBtn: "Salvar",
        loadOptionsBtn: "Carregar",

        // Format generation buttons
        "show-reddit-format": "Mostrar Formato<br>do Reddit",
        "show-in-game-format": "Mostrar Formato<br>do Jogo",

        // Warning and error messages
        warningMessage: "Selecione pelo menos uma opção \"faltando\" ou \"duplicada\" antes de salvar",
        closeWarningBtn: "OK",
        invalidFileMessage: "O arquivo selecionado não é compatível",

        // File name input popup
        fileNamePopupTitle: "Salvar Status das Cartas",
        confirmSaveBtn: "Salvar",
        cancelBtn: "Cancelar",

        // File name validation popup
        fileNameValidationTitle: "Nome do Arquivo Ausente",
        fileNameValidationMessage: "Por favor, insira um nome para salvar o arquivo",
        okFileNameValidationBtn: "OK"
    },

    // ================================
    // INPUT PLACEHOLDERS
    // ================================
    placeholders: {
        fileNameInput: "Nomeie seu arquivo aqui"
    },

    // ================================
    // USER GUIDANCE MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Comece selecionando o status das suas cartas...",
        inGameUserMessage: "Comece selecionando o status das suas cartas...\nTexto será dividido após 500 caracteres"
    },

    // ================================
    // FORMAT OUTPUT TEXT
    // ================================
    format: {
        // Section headers for Reddit format
        cardsNeeded: "Cartas Necessárias:",
        cardsDuplicated: "Cartas Duplicadas:",

        // Section headers for in-game format
        need: "NECESSÁRIO:",
        duplicate: "DUPLICADO:",

        // Format display titles
        redditFormatTitle: "Formato do Reddit",
        inGameFormatTitle: "Formato do Jogo",

        // Format descriptions and limits
        characterLimitDescription: "(1 parágrafo, limite de 500 caracteres)"
    }
};
