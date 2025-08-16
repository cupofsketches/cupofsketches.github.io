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
        resetAllBtn: "Começar de Novo",

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
        okFileNameValidationBtn: "OK",

        // Auto-save section header
        autoSaveSectionHeader: "Status do Auto-Salvamento",

        // Reset confirmation popup
        resetConfirmationTitle: "Começar de Novo?",
        resetConfirmationMessage: "Isso irá redefinir todas as suas seleções de cartas para \"Tenho esta carta\" e limpar quaisquer dados auto-salvos.",
        resetConfirmationWarning: "Esta ação não pode ser desfeita.",
        resetConfirmBtn: "Sim, Começar de Novo",
        resetCancelBtn: "Cancelar",
        resetSuccessMessage: "✅ Todas as seleções foram redefinidas! Você pode começar de novo agora."
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
    },

    // ================================
    // AUTO-SAVE STATUS
    // ================================
    // Purpose: Translate auto-save status messages

    autoSave: {
        enabled: "Auto-salvamento ativado",
        saving: "Salvando...",
        saved: "Salvo automaticamente",
        savingLoaded: "Salvando seleções carregadas...",
        loadedSaved: "Seleções carregadas salvas automaticamente"
    }
};
