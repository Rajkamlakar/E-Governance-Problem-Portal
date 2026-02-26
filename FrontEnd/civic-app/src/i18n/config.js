// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to Civic Problem App",
        login: "Login",
        logout: "Logout",
        officer: "Officer",
        citizen: "Citizen",
        selectLanguage: "Select Language",
      },
    },
    hi: {
      translation: {
        welcome: "सिविक प्रॉब्लम ऐप में आपका स्वागत है",
        login: "लॉगिन",
        logout: "लॉगआउट",
        officer: "अधिकारी",
        citizen: "नागरिक",
        selectLanguage: "भाषा चुनें",
      },
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
