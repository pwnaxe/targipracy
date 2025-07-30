"use client";

import React, { useEffect, useState } from 'react';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import { useLanguage } from '@/app/context/languageContext';


const Partnership = () => {
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');
  const [button, setButton] = useState('');
  const { language } = useLanguage();


  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partnership?locale=${language}&populate=*`);
        const data = await response.json();

        setContent(data.data.description || []);
        setTitle(data.data.title);
        setButton(data.data.button);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    fetchContent();
  }, [language]);

  if (!title) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="dla-pracodawcy"
      className='relative'
    >
      <div className="overflow-hidden bg-white py-32">
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h3 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl pb-4">{title}</h3>
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
              <div className="mt-10 flex">
                <a
                  href="#"
                  className="rounded-md bg-yellow-400 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                >
                  {button}
                </a>
              </div>
            </div>
            <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img
                  alt=""
                  src="/page/academyview.jpg"
                  className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <img
                    alt=""
                    src="/page/academyview.jpg"
                    className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img
                    alt=""
                    src="/page/academyview.jpg"
                    className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
                <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img
                    alt=""
                    src="/page/academyview.jpg"
                    className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partnership;