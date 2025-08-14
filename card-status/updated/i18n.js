// Holds all translations for the current language
let currentTranslations = {};

/**
 * Retrieves a nested property from an object using a dot-separated key path.
 * Example: getNestedValue(translations, "ui.save") → "Save"
 */
function getNestedValue(object, keyPath) {
    return keyPath.split(".").reduce((nested, key) => {
        return nested && nested[key] != null ? nested[key] : undefined;
    }, object);
}

/**
 * Translation function.
 * Looks up the translated text for the given key.
 * Falls back to the key itself if translation is missing.
 */
export function translate(key) {
    return getNestedValue(currentTranslations, key) ?? key;
}

/**
 * Loads translations for the given locale code (e.g., "en", "pt-BR", "es").
 * Saves the selected locale to localStorage so it persists across sessions.
 */
export async function setLocale(localeCode = "en") {
    const localeModule = await import(`../locales/${localeCode}.js`);
    currentTranslations = localeModule.translations;
    localStorage.setItem("locale", localeCode);
}
