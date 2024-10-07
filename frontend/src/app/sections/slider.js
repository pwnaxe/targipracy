'use client';

import { useEffect, useState } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Slider = () => {
  const [logo, setLogos] = useState([]);

  useEffect(() => {
    // Funkcja pobierająca logotypy z API Strapi
    const fetchLogos = async () => {
      try {
        const response = await fetch('https://pja.waw.pl/api/loga-firm?populate=*');
        const data = await response.json();
        const logoData = data.data.logos; // Bezpośrednie odwołanie do logos
    
        // Wybieranie odpowiednich formatów obrazów (najpierw large, potem medium, a jeśli nie, to oryginał)
        const imageLogos = logoData.map((logo) => {
          const formats = logo.formats;
          let imageUrl = logo.url; // Domyślnie url oryginalnego obrazu
    
          // Wybieranie odpowiedniego formatu: large > medium > original
          if (formats) {
            if (formats.medium) {
              imageUrl = formats.medium.url;
            } else if (formats.thumbnail) {
              imageUrl = formats.thumbnail.url;
            }
          }
    
          return {
            id: logo.id,
            url: `https://pja.waw.pl${imageUrl}`, // URL z serwera Strapi
            alt: logo.alternativeText || logo.name,
          };
        });
    
        setLogos(imageLogos);
      } catch (error) {
        console.error('Błąd pobierania logotypów:', error);
      }
    };

    fetchLogos();
  }, []);

  useEffect(() => {
    if (logo.length > 0) {
      // Inicjalizacja Splide po załadowaniu logotypów
      new Splide('#logos-slider', {
        type: 'loop',
        perPage: 3,
        autoplay: true,
        drag   : 'free',
        interval: 2000,
        pagination: false,
        autoScroll: {
           speed: 1,
         },
      }).mount();
    }
  }, [logo]);

  return (
    <>
    <h1 className='text-center text-4xl font-semibold py-24'>Galeria</h1>
    <div id="logos-slider" className="splide pt-4" aria-label="Logos zdjęć">
      <div className="splide__track">
        <ul className="splide__list">
          {logo.map((logo) => (
            <li className="splide__slide h-32 w-auto" key={logo.id}>
              <img src={logo.url} alt={logo.alt} className="w-auto h-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Slider;
