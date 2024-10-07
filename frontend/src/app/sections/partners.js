"use client";

import React, { useEffect, useState } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';

const Partnership = () => {
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://pja.waw.pl/api/partnership?populate=*');
        const data = await response.json();
        
        setContent(data.data.description || []);
        setTitle(data.data.title);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <section
      id="dla-pracodawcy"
      className='mt-44 mb-44 relative h-96'
    >
    <Image 
    src="/assets/page/logos.webp" 
    alt="Logos" 
    layout="fill" 
    objectFit="cover" 
    className="-ml-10"
  />
      <div className="relative container mx-auto px-4">
        <div className="text-center md:text-left pt-32">
          <h3 className="text-4xl font-bold mb-4 md:ml-10">
            {title}
          </h3>
          {content ? (
            <BlocksRenderer
              content={content}
              blocks={{
                paragraph: ({ children }) => <p className="text-neutral-900 max-w-prose text-xl">{children}</p>,
                heading: ({ children, level }) => {
                  const HeadingTag = `h${level}`;
                  return <HeadingTag className={`text-${level === 1 ? '4xl' : '3xl'} font-bold`}>{children}</HeadingTag>;
                },
                list: ({ children, format }) => (
                  <ul className={`list-${format === 'ordered' ? 'decimal' : 'disc'} ml-5`}>{children}</ul>
                ),
                quote: ({ children }) => (
                  <blockquote className="border-l-4 pl-4 italic text-gray-600">{children}</blockquote>
                ),
                link: ({ children, url }) => <a href={url} className="text-blue-500 underline">{children}</a>,
              }}
              modifiers={{
                bold: ({ children }) => <strong>{children}</strong>,
                italic: ({ children }) => <span className="italic">{children}</span>,
              }}
              />
          ) : (
            <p>Ładowanie...</p>
          )}
        </div>
        {/* Sekcja przycisku (opcjonalna) */}
        <div className="flex justify-center items-center">
          {/* Zakomentowany przycisk, jeśli jest potrzebny */}
          {/* <button
            id="kontakt"
            className="bg-yellow-400 text-black rounded-full py-3 px-6 hover:bg-yellow-300 transition duration-300"
          >
            Rejestracja firmy
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Partnership;