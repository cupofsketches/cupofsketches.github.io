// ---------------------------------
// ------------ I18N.JS ------------
// ---------------------------------
// This file handles internationalization (i18n) for the Royal Match Card Status Tool.
// It provides translation functionality and manages locale switching between different languages.

// ================================
// GLOBAL VARIABLES
// ================================
// Purpose: Store the current translations and locale state

// Holds all translations for the current language
let currentTranslations = {};

// ================================
// UTILITY FUNCTIONS
// ================================
// Purpose: Helper functions for accessing nested translation data

/**
 * Retrieves a nested property from an object using a dot-separated key path.
 * This function allows accessing deeply nested translation keys like "ui.save" → "Save"
 * @param {Object} object - The object to search in
 * @param {string} keyPath - Dot-separated path to the desired property
 * @returns {*} The value at the specified path, or undefined if not found
 * @example
 * getNestedValue(translations, "ui.save") → "Save"
 * getNestedValue(translations, "errors.fileNotFound") → "File not found"
 */
function getNestedValue(object, keyPath) {
    return keyPath.split(".").reduce((nested, key) => {
        return nested && nested[key] != null ? nested[key] : undefined;
    }, object);
}

// ================================
// TRANSLATION FUNCTIONS
// ================================
// Purpose: Core functions for translating text content

/**
 * Main translation function that looks up translated text for a given key.
 * Falls back to the key itself if no translation is found, ensuring the app never breaks.
 * @param {string} key - The translation key to look up (e.g., "ui.save", "errors.fileNotFound")
 * @returns {string} The translated text, or the original key if translation is missing
 * @example
 * translate("ui.save") → "Save" (in English) or "Guardar" (in Spanish)
 * translate("nonexistent.key") → "nonexistent.key" (fallback)
 */
export function translate(key) {
    return getNestedValue(currentTranslations, key) ?? key;
}

// ================================
// LOCALE MANAGEMENT
// ================================
// Purpose: Handle loading and switching between different languages

/**
 * Loads translations for the given locale code and saves the selection.
 * Dynamically imports the appropriate language file and updates the current translations.
 * @param {string} localeCode - The locale code to load (e.g., "en", "pt-BR", "es")
 * @returns {Promise<void>} Promise that resolves when the locale is loaded
 * @example
 * await setLocale("es") // Loads Spanish translations
 * await setLocale("pt-BR") // Loads Brazilian Portuguese translations
 */
export async function setLocale(localeCode = "en") {
    // Dynamically import the locale module based on the selected language
    const localeModule = await import(`../locales/${localeCode}.js`);

    // Update the current translations with the new language
    currentTranslations = localeModule.translations;

    // Save the selected locale to localStorage for persistence across sessions
    localStorage.setItem("locale", localeCode);
}
