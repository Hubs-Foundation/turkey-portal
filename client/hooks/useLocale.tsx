import { useState, useEffect } from 'react';

/**
 * @param
 * @returns
 */
const useLocal = () => {
  const initLanguage = [''];
  const [language, setLanguage] = useState(initLanguage);

  const resolveLocal = (): string[] => {
    let languages: string[] = [];
    console.log('navigator.language', navigator.language);
    console.log('navigator.languages', navigator.languages);
    if (navigator.language) languages = [navigator.language];
    if (navigator.languages) languages = [...navigator.languages];

    return languages;
  };

  useEffect(() => {
    setLanguage(resolveLocal());
  }, []);

  return language;
};

export default useLocal;
