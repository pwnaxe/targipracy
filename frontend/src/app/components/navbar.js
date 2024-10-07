'use client';
import { useState } from 'react';

export default function NavBar() {
  const [locationName, setLocationName] = useState({ languageId: 1 });
  const languages = [
    { name: 'polski', id: 1, flag: '/flags/poland.png' },
    { name: 'english', id: 2, flag: '/flags/britain.png' }
  ];

  function selectLanguage(id) {
    setLocationName({ languageId: id });
  }

  return (
    <nav className='hidden lg:flex bg-neutral-700 text-white items-center justify-center text-xl space-x-8 z-10'>
      <ul className='flex flex-row space-x-4 lg:space-x-6 uppercase py-4'>
        <li><a href="/">O Wydarzeniu</a></li>
        <li><a href="/">Agenda</a></li>
        <li><a href="/">Wystawcy</a></li>
        <li><a href="/">Galeria</a></li>
        <li><a href="/">Dla Pracodawcy</a></li>
        <li><a href="/">Kontakt</a></li>
      </ul>
      <div className="relative inline-block w-auto">
        <div className="selected-language flex items-center space-x-2 cursor-pointer px-2">
          {languages.map(language =>
            language.id === locationName.languageId ? (
              <div key={language.id} className="flex items-center space-x-2">
                <img src={language.flag} alt={language.name} width="20" />
                <span>{language.name}</span>
              </div>
            ) : null
          )}
        </div>

        <ul className="absolute hidden bg-neutral-700 pt-4 z-10">
          {languages.map(language => (
            <li key={language.id}>
              <button
                type="button"
                className="flex items-center space-x-2 p-2 pr-8 cursor-pointer hover:bg-gray-200"
                onClick={() => selectLanguage(language.id)}
              >
                <img src={language.flag} alt={language.name} width="20" />
                <span>{language.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
