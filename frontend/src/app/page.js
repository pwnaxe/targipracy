import Hero from '@/app/sections/hero';
import About from '@/app/sections/about';
import Slider from '@/app/sections/slider';
import Galery from '@/app/sections/galery';
import Partners from '@/app/sections/partners';
import Footer from '@/app/sections/footer';


export default function Home() {
  return (
    <>
        <Hero />
        <About />
        <Slider />
        <Galery />
        <Partners />
        <Footer />
    </>  
  );
}
