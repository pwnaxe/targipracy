'use client';
import { useState, useEffect } from 'react';
import Badge from '@/app/components/badge';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const Hero = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://pja.waw.pl/api/hero?populate=*');
        const data = await response.json();

        setContent(data.data.content);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className='w-screen h-screen'>
      <div className="pl-10 mt-32">
        <img src="/page/logoabk.webp" alt="Targi Pracy PJATK" className="w-52" />
        <div className='pl-10 pt-10'>
        {content ? (
          <BlocksRenderer
            content={content}
            blocks={{
              paragraph: ({ children }) => <p className="text-xl mt-4">{children}</p>,
              heading: ({ children, level }) => {
                const HeadingTag = `h${level}`;
                return <HeadingTag className={`text-${level === 1 ? '5xl' : '3xl'} font-bold leading-relaxed`}>{children}</HeadingTag>;
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
        <button className='bg-yellow-400 text-black rounded-full ml-10 mt-10 py-3 px-6 hover:bg-yellow-300 transition duration-300 uppercase font-semibold'>Zadeklaruj swój udział</button>
      </div>
      <div className='absolute top-0 right-0 w-screen h-screen'>
        <Badge />
      </div>
    </div>
  );
}

export default Hero;
