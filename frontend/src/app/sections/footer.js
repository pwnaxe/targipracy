"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from '@/app/context/languageContext';


const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const { language } = useLanguage();
  

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`https://pja.waw.pl/api/stopka?locale=${language}&populate=*`);

        const data = await response.json();
        setFooterData(data.data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, [language]);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative mt-24">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div>
                <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900">
                  {footerData.title}
                </h2>
                <p className="mt-4 text-base/7 text-gray-600">
                  {footerData.title2}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                <div className="rounded-2xl bg-neutral-900 text-yellow-400 p-10 col-span-2 text-center">
                  <h3 className="text-base/7 font-semibold">
                    {footerData.emailTitle}
                  </h3>
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${footerData.email}`}
                          className="font-semibold text-zinc-200"
                        >
                          {footerData.email}
                        </a>
                      </dd>
                    </div>
                    <div className="mt-1">
                      <dt className="sr-only">Phone number</dt>
                      <a href={`tel:${footerData.phone}`}>{footerData.phone}</a>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl bg-neutral-900 text-yellow-400 p-10">
                  <h3 className="text-base/7 font-semibold">
                    {footerData.FirstpersonTitle}
                  </h3>
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${footerData.firstEmail}`}
                          className="font-semibold text-zinc-200"
                        >
                          {footerData.firstEmail}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl bg-neutral-900 text-yellow-400 p-10">
                  <h3 className="text-base/7 font-semibold">
                    {footerData.SecoundpersonTitle}
                  </h3>
                  <dl className="mt-3 space-y-1 text-sm/6">
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${footerData.SecoundEmail}`}
                          className="font-semibold text-zinc-200"
                        >
                          {footerData.SecoundEmail}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <svg
          className="relative w-full transform rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#171717"
            fillOpacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,234.7C672,235,768,213,864,186.7C960,160,1056,128,1152,133.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <div className="absolute bottom-0 w-full flex flex-col md:flex-row justify-between items-center pb-5 px-5">
          <Image src="/page/pjatk2.webp" alt="Logo" width={200} height={160} />
          <div className="flex flex-row mt-5 space-x-5 md:pr-6">
            <a
              href="https://www.facebook.com/BiuroKarierPJATK"
              className="text-white text-4xl border-2 border-white rounded-md flex items-center justify-center px-3"
            >
              FB
            </a>
            <a
              href="https://www.instagram.com/abk_pjatk"
              className="text-white text-4xl border-2 border-white rounded-md flex items-center justify-center px-3"
            >
              Insta
            </a>
            <a
              href="https://www.linkedin.com/company/85406761"
              className="text-white text-4xl border-2 border-white rounded-md flex items-center justify-center px-3"
            >
              LI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
