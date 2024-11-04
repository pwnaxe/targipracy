'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/app/context/languageContext';

export default function NavBar() {
  const { language, toggleLanguage } = useLanguage();
  const [navItems, setNavItems] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { name: 'polski', id: 1, flag: '/flags/poland.png', locale: 'pl' },
    { name: 'english', id: 2, flag: '/flags/britain.png', locale: 'en' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pja.waw.pl/api/nawigacja?populate=*');
        const data = await response.json();
        setNavItems(data.data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function selectLanguage(id) {
    const selectedLanguage = languages.find((lang) => lang.id === id);
    toggleLanguage(selectedLanguage.locale);

    if (selectedLanguage.locale === 'pl') {
      const originalData = dropdownRef.current.getAttribute('data-original');
      setNavItems(JSON.parse(originalData));
    } else {
      const localizedData = navItems?.localizations?.find(
        (loc) => loc.locale === selectedLanguage.locale
      );
      if (localizedData) {
        setNavItems({ ...navItems, ...localizedData });
      }
    }
    setDropdownVisible(false);
  }

  function toggleDropdown() {
    if (!dropdownVisible) {
      if (!dropdownRef.current.getAttribute('data-original')) {
        dropdownRef.current.setAttribute('data-original', JSON.stringify(navItems));
      }
    }
    setDropdownVisible((prevVisible) => !prevVisible);
  }

  return (
    <nav className='hidden lg:flex bg-neutral-950 border-b-2 border-yellow-400 text-yellow-400 items-center justify-center text-xl space-x-8'>
      <ul className='flex flex-row space-x-4 lg:space-x-6 uppercase py-4'>
        {navItems ? (
          <>
            {navItems.about && (
              <li><a href="/#about">{navItems.about}</a></li>
            )}
            {navItems.agenda && (
              <li><a href="/#agenda">{navItems.agenda}</a></li>
            )}
            {navItems.partners && (
              <li><a href="/#partners">{navItems.partners}</a></li>
            )}
            {navItems.gallery && (
              <li><a href="/#gallery">{navItems.gallery}</a></li>
            )}
            {navItems.partnership && (
              <li><a href="/#partnership">{navItems.partnership}</a></li>
            )}
            {navItems.contact && (
              <li><a href="/#contact">{navItems.contact}</a></li>
            )}
          </>
        ) : (
          <div className='flex space-x-4 animate-pulse'>
            <div className='bg-gray-700 h-6 w-24 rounded'></div>
            <div className='bg-gray-700 h-6 w-20 rounded'></div>
            <div className='bg-gray-700 h-6 w-28 rounded'></div>
            <div className='bg-gray-700 h-6 w-16 rounded'></div>
            <div className='bg-gray-700 h-6 w-24 rounded'></div>
            <div className='bg-gray-700 h-6 w-20 rounded'></div>
          </div>
        )}
      </ul>
      <div className="relative inline-block w-auto" ref={dropdownRef}>
        <div
          className="selected-language flex items-center space-x-2 cursor-pointer px-2"
          onClick={toggleDropdown}
        >
          {languages.map((lang) =>
            lang.locale === language ? (
              <div key={lang.id} className="flex items-center space-x-2">
                <img src={lang.flag} alt={lang.name} width="20" />
                <span>{lang.name}</span>
              </div>
            ) : null
          )}
        </div>

        {dropdownVisible && (
          <ul className="absolute bg-neutral-700 pt-4 z-10">
            {languages.map((lang) => (
              <li key={lang.id}>
                <button
                  type="button"
                  className="flex items-center space-x-2 p-2 pr-8 cursor-pointer hover:bg-gray-200"
                  onClick={() => selectLanguage(lang.id)}
                >
                  <img src={lang.flag} alt={lang.name} width="20" />
                  <span>{lang.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
