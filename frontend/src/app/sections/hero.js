import Badge from '@/app/components/badge';

let hero = {
    title: 'Targi Pracy PJATK',
    date: 'wiosenna edycja - już 18 kwietnia 2024!',
    text1: 'Studencie i Absolwencie nie przegap możliwości rozmów z czołowymi pracodawcami oraz innych atrakcji podczas Targów.',
    text2: 'Widzimy się od 9:30 do 16:30 w budynku A.'
}

export default function Hero() {
    return (
      <div className='w-screen h-screen'>
        <div className="pl-10 mt-32">
            <img src="/page/logoabk.webp" alt="Targi Pracy PJATK" className="w-52" />
            <h1 className="text-6xl font-bold mt-6">{hero.title}</h1>
            <h2 className="text-2xl font-bold mt-4">{hero.date}</h2>
            <p className="text-xl mt-4">{hero.text1}</p>
            <p className="text-xl mt-4">{hero.text2}</p>
            <button className='bg-yellow-400 text-black rounded-full py-3 px-6 hover:bg-yellow-300 transition duration-300'>Wasdasdsa</button>
        </div>
        <div className='mr-10'>
        <Badge />   
        </div>       
      </div>
    );
}
