'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Laptop from '../assets/page/notebook.webp';
import Data from '../assets/page/data.webp';

function About() {
  const [aboutEvent, setAboutEvent] = useState({});
  const [springEdition, setSpringEdition] = useState({});
  const [aboutUsDate, setAboutUsDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAbout = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/about-event`);
        const aboutData = await resAbout.json();
        setAboutEvent(aboutData);

        const resSpring = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/spring-edition`);
        const springData = await resSpring.json();
        setSpringEdition(springData);

        const resDate = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/about-us-date`);
        const dateData = await resDate.json();
        setAboutUsDate(dateData.date);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <Image src={Laptop} alt="notebook" width={300} height={300} className="w-[45vh] h-auto" />
        </div>
        <div id="o-wydarzeniu" className="mt-8 mx-4 md:mx-16 text-center md:text-left">
          <h4 className="text-2xl font-semibold mb-4">{aboutEvent.title}</h4>
          <p className="text-lg">
            {aboutEvent.line1}<br />
            {aboutEvent.line2}<br />
            {aboutEvent.line3}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div id="agenda" className="mx-4 md:mx-16 text-center md:text-left">
          <h4 className="text-2xl font-semibold mb-4">{springEdition.title}</h4>
          <p className="text-lg">
            {springEdition.line1}<br />
            {springEdition.line2}<br />
            {springEdition.line3}<br />
            {springEdition.line4}<br />
            {springEdition.line5}
          </p>
        </div>
        <div className="relative flex justify-center">
          <Image src={Data} alt="date" width={300} height={300} className="w-[30vh] h-auto" />
          <h3 className="text-3xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
            {aboutUsDate}
          </h3>
        </div>
      </div>
    </>
  );
}

export default About;
