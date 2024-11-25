'use client';

import { useEffect, useState } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useLanguage } from '@/app/context/languageContext';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';


const Slider = () => {
  const [logo, setLogos] = useState([]);
  const [title, setTitle] = useState('');
  const { language } = useLanguage();


  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch(`https://pja.waw.pl/api/loga-firm?locale=${language}&populate=*`);
        const data = await response.json();
        setTitle(data.data)

        const logoData = data.data.logos;
    
        const imageLogos = logoData.map((logo) => {
          const formats = logo.formats;
          let imageUrl = logo.url;
    
          if (formats) {
            if (formats.medium) {
              imageUrl = formats.medium.url;
            } else if (formats.thumbnail) {
              imageUrl = formats.thumbnail.url;
            }
          }
    
          return {
            id: logo.id,
            url: `https://pja.waw.pl${imageUrl}`,
            alt: logo.alternativeText || logo.name,
          };
        });
    
        setLogos(imageLogos);
      } catch (error) {
        console.error('Błąd pobierania logotypów:', error);
      }
    };

    fetchLogos();
  }, [language]);

  useEffect(() => {
    if (logo.length > 0) {
      new Splide('#logos-slider', {
        type: 'loop',
        perPage: 5,
        gap: '4rem',
        autoplay: false,
        drag: 'free',
        pagination: false,
        autoScroll: {
          speed: 0.1,
        },
        breakpoints: {
          1440: {
            perPage: 3,
            gap:"2rem"
          },
          1024: {
            perPage: 2,
            gap: "1.5rem",
          },
          640: {
            perPage: 1,
            gap: "1rem",
          },
        },
      }).mount({ AutoScroll });
    }
  }, [logo]);

  return (
    <div className="bg-neutral-900 text-yellow-400 py-24 sm:py-32">
      <div className="mx-auto w-screen px-6 lg:px-8">
    <h1 className='text-center text-4xl font-semibold pb-12'>{title.title}</h1>
    <div id="logos-slider" className="splide pt-4" aria-label="Logos zdjęć">
      <div className="splide__track w-11/12 mx-auto">
        <ul className="splide__list">
          {logo.map((logo) => (
            <li className="splide__slide h-32 w-auto mr-2" key={logo.id}>
              <img src={logo.url} alt={logo.alt} className="w-auto h-full object-contain rounded-lg shadow-lg" />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Slider;
