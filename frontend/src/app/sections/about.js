"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/languageContext";
import { CheckIcon } from "@heroicons/react/20/solid";


const About = () => {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [titledata, setTitleData] = useState(null);

  useEffect(() => {
    const fetchTitle = async () => {
      setTitleData(null);
      try {
        const response = await fetch (
          `https://pja.waw.pl/api/o-wydarzeniu-tytul?locale=${language}&populate=*`
        );
        const responseData = await response.json();
        setTitleData(responseData.data);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      }
    };

    fetchTitle();

    const fetchContent = async () => {
      setData(null);
      try {
        const response = await fetch(
          `https://pja.waw.pl/api/abouts?locale=${language}&populate=*`
        );
        const responseData = await response.json();

        setData(responseData.data);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      }
    };

    fetchContent();
  }, [language]);

  if (!data) {
    return <div>Ładowanie...</div>;
  }

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <div className="col-span-2">
              <h2 className="text-base font-semibold text-indigo-600">
                {titledata.altTitle}
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {titledata.title}
              </p>
              <p className="mt-6 text-base text-gray-600">
                {titledata.description}
              </p>
            </div>
            <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base text-gray-600 sm:grid-cols-2 lg:gap-y-16">
              {data.map((data) => (
                <div key={data.name} className="relative pl-9">
                  <dt className="font-semibold text-gray-900">
                    <CheckIcon
                      aria-hidden="true"
                      className="absolute left-0 top-1 h-5 w-5 text-indigo-500"
                    />
                    {data.name}
                  </dt>
                  <dd className="mt-2">{data.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
