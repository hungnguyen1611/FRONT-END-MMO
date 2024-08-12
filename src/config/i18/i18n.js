// src/i18n.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import vi from './vi.json'

const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
}
const savedLanguage = localStorage.getItem('language') || 'vi'
i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
