import { useState, useEffect } from 'react';
import { LanguagesT } from 'types/General';

/**
  About the hook
  useLocal react hook looks to the users browser and returns
  the prefered language the browser is set to. The hook
  will then return an array of type LanguagesT "language codes"
**/

/**
 * @returns LanguagesT[]
 */
const useLocal = () => {
  const initLanguage: LanguagesT[] = [];
  const [language, setLanguage] = useState(initLanguage);

  const resolveLocal = (): LanguagesT[] => {
    let languages: LanguagesT[] = [];
    if (navigator.language) languages = [navigator.language as LanguagesT];
    if (navigator.languages)
      languages = [...(navigator.languages as LanguagesT[])];

    return languages;
  };

  useEffect(() => {
    setLanguage(resolveLocal());
  }, []);

  return language;
};

export default useLocal;
