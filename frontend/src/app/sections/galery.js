"use client";

import { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useLanguage } from '@/app/context/languageContext';
import { useStaticData } from '@/app/context/staticDataContext';


const Slider = () => {
  const [karuzela, setKaruzela] = useState([]);
  const [title, setTitle] = useState('');
  const { language } = useLanguage();
  const staticData = useStaticData();


  useEffect(() => {
    if (staticData) {
      const galeryData = language === 'pl' ? staticData.galery?.pl : staticData.galery?.en;

      if (galeryData?.data) {
        setTitle(galeryData.data);
        const karuzelaData = galeryData.data.karuzelas;

        if (karuzelaData && karuzelaData.length > 0) {
          const imageKaruzela = karuzelaData.map((karuzela) => {
            const formats = karuzela.formats;
            let imageUrl = karuzela.url;

            if (formats) {
              if (formats.medium) {
                imageUrl = formats.medium.url;
              } else if (formats.thumbnail) {
                imageUrl = formats.thumbnail.url;
              }
            }

            return {
              id: karuzela.id,
              url: `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`,
              alt: karuzela.alternativeText || karuzela.name,
            };
          });
          setKaruzela(imageKaruzela);
        }
      }
    }
  }, [language, staticData]);

  useEffect(() => {
    let splideInstance = null;

    if (karuzela.length > 0) {
      // Zniszcz poprzednią instancję jeśli istnieje
      const existingSlider = document.querySelector('#gallery-slider');
      if (existingSlider && existingSlider.splide) {
        existingSlider.splide.destroy();
      }

      // Stwórz nową instancję
      splideInstance = new Splide("#gallery-slider", {
        type: "loop",
        perPage: 3,
        autoplay: true,
        drag: "free",
        interval: 4000, // Zwiększony czas między przejściami
        speed: 1200, // Płynniejsze przejście (domyślnie 400ms)
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth easing
        pagination: false,
        arrows: true,
        gap: "2rem",
        pauseOnHover: true, // Zatrzymaj na hover
        pauseOnFocus: true, // Zatrzymaj na focus
        resetProgress: false, // Nie resetuj progressu
        breakpoints: {
          1024: {
            perPage: 2,
            gap: "1.5rem",
          },
          640: {
            perPage: 1,
            gap: "1rem",
          },
        },
      }).mount();
    }

    return () => {
      if (splideInstance) {
        splideInstance.destroy();
      }
    };
  }, [karuzela, language]);

  if (!staticData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-center text-4xl font-semibold py-24">{title.title}</h1>
      <div id="gallery-slider" className="splide pt-4" aria-label="Karuzela zdjęć">
        <div className="splide__track">
          <ul className="splide__list">
            {karuzela.map((item) => (
              <li
                className="splide__slide h-80 w-auto flex items-center justify-center"
                key={`${language}-gallery-${item.id}`}
              >
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Slider;
