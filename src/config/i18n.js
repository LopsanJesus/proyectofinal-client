import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../locales/en/translation.json";
import es from "../locales/es/translation.json";

const resources = {
    en: {
        translation: en,
    },
    es: {
        translation: es,
    },
};
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        //lng: "es",
        supportedLngs: ["en", "es"],
        fallbackLng: "en",
        debug: process.env.NODE_ENV === "development",
        interpolation: {
            escapeValue: false,
        },
    });
export default i18next;