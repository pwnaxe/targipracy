'use client';

import { useEffect, useState } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Slider = () => {
  const [karuzela, setKaruzela] = useState([]);

  useEffect(() => {
    // Funkcja pobierająca karuzelatypy z API Strapi
    const fetchKaruzela = async () => {
      try {
        const response = await fetch('https://pja.waw.pl/api/galeria?populate=*');
        const data = await response.json();
        const karuzelaData = data.data.karuzelas; // Bezpośrednie odwołanie do karuzelas
    
        // Wybieranie odpowiednich formatów obrazów (najpierw large, potem medium, a jeśli nie, to oryginał)
        const imageKaruzela = karuzelaData.map((karuzela) => {
          const formats = karuzela.formats;
          let imageUrl = karuzela.url; // Domyślnie url oryginalnego obrazu
    
          // Wybieranie odpowiedniego formatu: large > medium > original
          if (formats) {
            if (formats.medium) {
              imageUrl = formats.medium.url;
            } else if (formats.thumbnail) {
              imageUrl = formats.thumbnail.url;
            }
          }
    
          return {
            id: karuzela.id,
            url: `https://pja.waw.pl${imageUrl}`, // URL z serwera Strapi
            alt: karuzela.alternativeText || karuzela.name,
          };
        });
    
        setKaruzela(imageKaruzela);
      } catch (error) {
        console.error('Błąd pobierania karuzelatypów:', error);
      }
    };

    fetchKaruzela();
  }, []);

  useEffect(() => {
    if (karuzela.length > 0) {
      // Inicjalizacja Splide po załadowaniu karuzelatypów
      new Splide('#slider', {
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
  }, [karuzela]);

  return (
    <>
    <h1 className='text-center text-4xl font-semibold py-24'>Galeria</h1>
    <div id="slider" className="splide pt-4" aria-label="Karuzela zdjęć">
      <div className="splide__track">
        <ul className="splide__list">
          {karuzela.map((karuzela) => (
            <li className="splide__slide h-32 w-auto" key={karuzela.id}>
              <img src={karuzela.url} alt={karuzela.alt} className="w-auto h-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Slider;
