'use client';
import { useEffect } from 'react';
import Hero from '@/app/sections/hero';
import About from '@/app/sections/about';
import Slider from '@/app/sections/slider';
import Galery from '@/app/sections/galery';
import Partners from '@/app/sections/partners';
import Footer from '@/app/sections/footer';
import Navbar from '@/app/components/navbar';
import { LanguageProvider } from './context/languageContext';
import { StaticDataProvider } from './context/staticDataContext';
import Bar from '@/app/sections/bar';

export default function ClientPage({ staticData }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <StaticDataProvider data={staticData}>
            <LanguageProvider>
                <div>
                    <div className="sticky top-0 z-10">
                        <Navbar />
                    </div>
                    <Hero />
                    <About />
                    <Slider />
                    <Galery />
                    <Partners />
                    <Bar />
                    <Footer />
                </div>
            </LanguageProvider>
        </StaticDataProvider>
    );
}
