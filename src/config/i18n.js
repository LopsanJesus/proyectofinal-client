import i18next from "i18next";
import { initReactI18next } from "react-i18next";
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
    .init({
        resources,
        lng: "es",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });
export default i18next;