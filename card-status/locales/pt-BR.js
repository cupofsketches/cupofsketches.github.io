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
    // FORMAT OUTPUT
    // ================================
    // Purpose: Translate text that appears in the generated format output

    format: {
        cardsNeeded: "Cartas Faltando:",
        cardsDuplicated: "Cartas Duplicadas:",
        need: "FALTANDO:",
        duplicate: "DUPLICADO:",
        redditFormatTitle: "Formato Reddit",
        inGameFormatTitle: "Formato In-Game",
        characterLimitDescription: "(1 parágrafo, limite de 500 caracteres)"
    },

    // ================================
    // COLLECTION DISPLAY
    // ================================
    // Purpose: Translate collection-related display text

    collection: {
        subtitle: "Coleção Hobby"
    },

    // ================================
    // CARD OPTIONS
    // ================================
    // Purpose: Translate the radio button labels for card status

    cardOptions: {
        needed: "Faltando",
        duplicate: "Duplicado",
        owned: "Tenho",
        nonTrade: "Não Negociável"
    }
};
