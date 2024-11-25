"use client";

import { useEffect, useState } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useLanguage } from '@/app/context/languageContext';


const Slider = () => {
  const [karuzela, setKaruzela] = useState([]);
  const [title, setTitle] = useState('');
  const { language } = useLanguage();


  useEffect(() => {
    const fetchKaruzela = async () => {
      try {
        const response = await fetch(
          `https://pja.waw.pl/api/galeria?locale=${language}&populate=*`
        );
        const data = await response.json();
        setTitle(data.data)
        const karuzelaData = data.data.karuzelas;                  

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
            url: `https://pja.waw.pl${imageUrl}`,
            alt: karuzela.alternativeText || karuzela.name,
          };
        });
        setKaruzela(imageKaruzela);
      } catch (error) {
        console.error("Błąd pobierania karuzelatypów:", error);
      }
    };

    fetchKaruzela();
  }, [language]);

  useEffect(() => {
    if (karuzela.length > 0) {
      new Splide("#slider", {
        type: "loop",
        perPage: 3,
        autoplay: true,
        drag: "free",
        interval: 2000,
        pagination: false,
        gap: "2rem",
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
  }, [karuzela]);

  if (!title) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-center text-4xl font-semibold py-24">{title.title}</h1>
      <div id="slider" className="splide pt-4" aria-label="Karuzela zdjęć">
        <div className="splide__track">
          <ul className="splide__list">
            {karuzela.map((karuzela) => (
              <li
                className="splide__slide h-80 w-auto flex items-center justify-center"
                key={karuzela.id}
              >
                <img
                  src={karuzela.url}
                  alt={karuzela.alt}
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
