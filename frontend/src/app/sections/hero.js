'use client';
import { useEffect, useState } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Badge from '@/app/components/badge';
import { useLanguage } from '@/app/context/languageContext';

export default function Hero() {
  const { language } = useLanguage();
  const [content, setContent] = useState(null);
  const [text, setText] = useState(null)
  const [initialContent] = useState([
    {
      type: 'heading',
      level: 1,
      children: [{ type: 'text', text: 'Targi Pracy PJATK' }],
    },
    {
      type: 'heading',
      level: 2,
      children: [{ type: 'text', text: 'Kolejna edycja - już niedługo!' }],
    },
    {
      type: 'heading',
      level: 3,
      children: [{ type: 'text', text: 'Studencie i Absolwencie!' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', text: 'Nie przegap możliwości rozmów z czołowymi pracodawcami' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', text: 'oraz innych atrakcji podczas Targów.' }],
    },
    {
      type: 'paragraph',
      children: [{ type: 'text', text: 'Do zobaczenia wkrótce!' }],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://pja.waw.pl/api/hero?locale=${language}&populate=*`);
        const data = await res.json();
        setContent(data.data.content);
        setText(data.data.text)
      } catch (error) {
        console.error('Błąd podczas pobierania danych z API:', error);
      }
    };

    fetchData();
  }, [language]);

  if (content === null) {
    return (
      <div className='w-screen h-screen text-white bg-neutral-950'>
        <div className='w-screen h-screen absolute'>
          <Badge />
        </div>
        <div className="pl-10 pt-32">
          <Image
            src="/page/pjatk2.webp"
            alt="Targi Pracy PJATK"
            width={208}
            height={208}
          />
          <div className='pl-10 pt-10 animate-pulse'>
            <BlocksRenderer
              content={initialContent}
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-screen h-screen text-white bg-neutral-950'>
      <div className='w-screen h-screen absolute'>
        <Badge />
      </div>
      <div className="pl-10 pt-32">
        <Image
          src="/page/pjatk2.webp"
          alt="Targi Pracy PJATK"
          width={208}
          height={208}
        />
        <div className='pl-10 pt-10 animate-from-small w-2/5'>
          <BlocksRenderer
            content={content}
            blocks={{
              paragraph: ({ children }) => <p className="text-xl mt-4">{children}</p>,
              heading: ({ children, level }) => {
                const HeadingTag = `h${level}`;
                return <HeadingTag className={`text-${level === 1 ? '5xl' : '3xl'} font-bold leading-relaxed transition duration-1000 ease-in-out transform`}>{children}</HeadingTag>;
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
        </div>
        <button className='bg-yellow-400 text-black rounded-full ml-10 mt-10 py-3 px-6 hover:bg-yellow-300 transition duration-2000 transform opacity-100 uppercase font-semibold' aria-label='Zadeklaruj swój udział'>
          {text}
        </button>
      </div>
    </div>
  );
}
