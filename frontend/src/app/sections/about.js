"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/languageContext";
import { useStaticData } from "@/app/context/staticDataContext";
import { CheckIcon } from "@heroicons/react/20/solid";


const About = () => {
  const { language } = useLanguage();
  const staticData = useStaticData();
  const [data, setData] = useState(null);
  const [titledata, setTitleData] = useState(null);

  useEffect(() => {
    if (staticData) {
      // Ustawiamy dane na podstawie wybranego języka
      if (language === 'pl') {
        setTitleData(staticData.aboutTitle?.pl?.data);
        setData(staticData.aboutContent?.pl?.data);
      } else {
        setTitleData(staticData.aboutTitle?.en?.data);
        setData(staticData.aboutContent?.en?.data);
      }
    }
  }, [language, staticData]);

  if (!data || !titledata) {
    return <div>Ładowanie...</div>;
  }

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <div className="col-span-2">
              <h2 className="text-base font-semibold text-yellow-500">
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
              {data.map((item, index) => (
                <div key={`${language}-${item.name}-${index}`} className="relative pl-9">
                  <dt className="font-semibold text-gray-900">
                    <CheckIcon
                      aria-hidden="true"
                      className="absolute left-0 top-1 h-5 w-5 text-indigo-500"
                    />
                    {item.name}
                  </dt>
                  <dd className="mt-2">{item.description}</dd>
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
