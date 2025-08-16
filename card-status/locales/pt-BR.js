export const translations = {
    // ================================
    // CARD MANAGEMENT SECTION
    // ================================
    cardManagement: {
        // Main section header
        sectionHeader: "Gerenciamento de Cartas",

        // Primary action buttons
        save: "Salvar",
        load: "Carregar",
        reset: "Limpar",

        // File name input
        fileNamePlaceholder: "Nomeie seu arquivo aqui",

        // Popup titles and messages
        savePopupTitle: "Salvar Status do Card",
        fileNameMissingTitle: "Nome do Arquivo Ausente",
        fileNameMissingMessage: "Por favor, digite um nome para salvar seu arquivo",

        // Popup buttons
        confirmSave: "Salvar",
        confirmReset: "Confirmar",
        cancel: "Cancelar",
        ok: "OK"
    },

    // ================================
    // DECK SELECTION SECTION
    // ================================
    deckSelection: {
        sectionHeader: "Escolher Baralhos:"
    },

    // ================================
    // BULK SELECTION SECTION
    // ================================
    bulkSelection: {
        sectionHeader: "Selecionar Todos Como:",
        needed: "Faltando",
        duplicate: "Duplicado",
        owned: "Tenho",
        feedbackMessage: "cartas definidas como"
    },

    // ================================
    // FORMAT GENERATION SECTION
    // ================================
    format: {
        // Section headers
        sectionHeader: "Gerar Texto",
        redditFormatTitle: "Formato Reddit",
        inGameFormatTitle: "Formato do Jogo",

        // Format labels
        need: "FALTANDO:",
        duplicate: "DUPLICADO:",

        // Format descriptions
        characterLimitDescription: "(1 parágrafo, limite de 500 caracteres)",

        // Generated text labels
        cardsNeeded: "Cartas Faltando:",
        cardsDuplicated: "Cartas Duplicadas:"
    },

    // ================================
    // FORMAT BUTTONS
    // ================================
    formatButtons: {
        showRedditFormat: "Mostrar Formato<br>Reddit",
        showInGameFormat: "Mostrar Formato<br>do Jogo"
    },

    // ================================
    // CARD OPTIONS
    // ================================
    cardOptions: {
        needed: "Faltando",
        duplicate: "Duplicado",
        owned: "Tenho",
        nonTrade: "Não Negociável"
    },

    // ================================
    // USER MESSAGES
    // ================================
    messages: {
        redditUserMessage: "Comece selecionando o status das suas cartas...",
        inGameUserMessage: "Comece selecionando o status das suas cartas..."
    },

    // ================================
    // WARNING & ERROR MESSAGES
    // ================================
    warnings: {
        noSelectionWarning: "Selecione pelo menos uma opção \"faltando\" ou \"duplicado\" antes de salvar",
        invalidFileMessage: "Por favor, selecione um arquivo .json válido!"
    },

    // ================================
    // AUTO-SAVE SECTION
    // ================================
    autoSave: {
        sectionHeader: "Status do Auto-Salvamento",
        enabled: "Auto-salvamento habilitado",
        saving: "Salvando...",
        saved: "Salvo automaticamente",
        savingLoaded: "Salvando seleções carregadas...",
        loadedSaved: "Seleções carregadas salvas automaticamente"
    },

    // ================================
    // RESET CONFIRMATION POPUP
    // ================================
    resetConfirmation: {
        title: "Limpar Tudo?",
        message: "Isso irá redefinir todas as cartas para 'Tenho' e limpar auto-salvamentos. Salvamentos manuais permanecem seguros",
        warning: "Esta ação não pode ser desfeita.",
        confirmButton: "Confirmar",
        cancelButton: "Cancelar",
        successMessage: "✅ Todas as seleções foram limpas! Você pode começar de novo agora."
    }
};
