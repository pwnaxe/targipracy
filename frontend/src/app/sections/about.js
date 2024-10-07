'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Laptop from '../assets/page/notebook.webp';
import Data from '../assets/page/data.webp';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';


const About = () => {
  const [content, setContent] = useState(null);
  const [content2, setContent2] = useState(null); 
  const [title, setTitle] = useState('');
  const [title2, setTitle2] = useState('');
  const [aboutUsDate, setAboutUsDate] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://pja.waw.pl/api/about?populate=*');
        const data = await response.json();
        
        // Ustawienie treści dla pierwszej sekcji
        setContent(data.data.description || []);
        setTitle(data.data.title);
        
        // Ustawienie treści dla drugiej sekcji
        setContent2(data.data.description2 || []); // Assuming `description2` is available in API
        setTitle2(data.data.title2);
        setAboutUsDate(data.data.aboutUsDate); // Jeśli data jest w API
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <>
      {/* Pierwsza sekcja */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <Image src={Laptop} alt="notebook" width={300} height={300} className="w-[45vh] h-auto" />
        </div>
        <div id="o-wydarzeniu" className="mt-8 mx-4 md:mx-16 text-center md:text-left">
          <h4 className="text-2xl font-semibold mb-4">{title}</h4>
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
      </div>

      {/* Druga sekcja */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div id="agenda" className="mx-4 md:mx-16 text-center md:text-left">
          <h4 className="text-2xl font-semibold mb-4">{title2}</h4>
          {content2 ? (
            <BlocksRenderer
              content={content2}
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
        <div className="relative flex justify-center">
          <Image src={Data} alt="date" width={300} height={300} className="w-[30vh] h-auto" />
          <h3 className="text-5xl font-medium absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
            {aboutUsDate}
          </h3>
        </div>
      </div>
    </>
  );
};

export default About;
