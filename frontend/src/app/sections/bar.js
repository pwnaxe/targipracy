import { useState, useEffect } from 'react';
import { useLanguage } from "@/app/context/languageContext";
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function Bar() {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [titledata, setTitleData] = useState(null);

  useEffect(() => {
    const fetchTitle = async () => {
      setTitleData(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/baner?locale=${language}&populate=*`
        );
        const responseData = await response.json();
        setTitleData(responseData.data);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      }
    };

    fetchTitle();
  }, [language]);

  if (!titledata) {
    return <div>Ładowanie...</div>;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8 z-50">
        <div className="pointer-events-auto flex items-center justify-between gap-x-6 bg-yellow-400 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
          <p className="text-sm/6 text-black">
            <a href="#agenda">
              <strong className="font-semibold">{titledata.title}</strong>
              <svg viewBox="0 0 2 2" aria-hidden="true" className="mx-2 inline size-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              {titledata.text}&nbsp;<span aria-hidden="true">&rarr;</span>
            </a>
          </p>
          <button
            type="button"
            className="-m-1.5 flex-none p-1.5"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon aria-hidden="true" className="size-5 text-black" />
          </button>
        </div>
      </div>
    </>
  );
}
