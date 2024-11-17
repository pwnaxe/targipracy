'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('https://pja.waw.pl/api/stopka?populate=*');
        const data = await response.json();
        setFooterData(data.data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      }
    };

    fetchFooterData();
  }, []);

  if (!footerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='relative mt-24'>
      <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div>
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900">{footerData.title}</h2>
              <p className="mt-4 text-base/7 text-gray-600">
              {footerData.title2}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 p-10 col-span-2 text-center">
                <h3 className="text-base/7 font-semibold text-gray-900">{footerData.email}</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${footerData.email}`} className="font-semibold text-indigo-600">
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
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">{footerData.FirstpersonTitle}</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${footerData.firstEmail}`} className="font-semibold text-indigo-600">
                      {footerData.firstEmail}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-10">
                <h3 className="text-base/7 font-semibold text-gray-900">{footerData.SecoundpersonTitle}</h3>
                <dl className="mt-3 space-y-1 text-sm/6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${footerData.SecoundEmail}`} className="font-semibold text-indigo-600">
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
    <div
      className="relative w-full min-h-[60vh] bg-cover bg-no-repeat bg-bottom"
      style={{ backgroundImage: `url(${'/assets/page/footer.webp'})` }}
    >   
      <div className="absolute bottom-0 mt-10 w-full flex flex-col md:flex-row justify-between items-center pb-5 px-5">
        <Image src="/page/pjatk2.webp" alt="Logo" width={200} height={160} />
        <div className="flex flex-row mt-5 space-x-5 md:pr-6">
          <a href="https://www.facebook.com/BiuroKarierPJATK" className="text-white text-4xl border-2 border-white rounded-md flex items-center justify-center px-3">FB</a>
          <a href="https://www.instagram.com/abk_pjatk" className="text-white text-4xl border-2 border-white rounded-md flex items-center justify-center px-3">Insta</a>
          <a href="https://www.linkedin.com/company/85406761" className="text-white text-4xl border-2 border-white rounded-md flex items-center justify-center px-3">LI</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;
