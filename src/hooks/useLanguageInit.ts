import { useEffect } from "react";
import { useTranslation } from "react-i18next";


const DEFAULT_LANGUAGE = 'en';
const LANG_KEY = 'lang';

export const useLanguageInit = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANGUAGE;
    localStorage.setItem(LANG_KEY, storedLang);
    
    i18n.changeLanguage(storedLang);
    document.documentElement.lang = storedLang;
    document.documentElement.dir = storedLang === 'ar' ? 'rtl' : 'ltr';
  }, []);
};