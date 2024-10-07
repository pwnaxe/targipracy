'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/stopka?populate=*');
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
    <div className="flex flex-col items-center text-center">
        <h4 className="text-3xl font-bold">{footerData.title}</h4>
        <p className="text-xl">
          {footerData.email} <br />
          {footerData.phone}
        </p>
        <p className="text-xl mt-5 mb-3">{footerData.title2}</p>
        <div className="flex flex-nowrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/3 p-2 flex flex-nowrap">
            <p className="text-lg">
              <strong>{footerData.FirstpersonTitle}</strong> <br />
              {footerData.firstEmail}
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 p-2 flex flex-nowrap">
            <p className="text-lg">
              <strong>{footerData.SecoundpersonTitle}</strong> <br />
              {footerData.SecoundEmail}
            </p>
          </div>
        </div>
      </div>
    <div
      className="absolute top-10 w-full min-h-[60vh] bg-cover bg-no-repeat bg-bottom"
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
