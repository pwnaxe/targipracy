// Funkcje do pobierania danych podczas budowania aplikacji
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.pja.waw.pl';

export async function fetchStaticData() {
    try {

        // Pobieramy wszystkie potrzebne dane równocześnie
        const [
            navData,
            heroDataPL,
            heroDataEN,
            aboutTitlePL,
            aboutTitleEN,
            aboutContentPL,
            aboutContentEN,
            sliderDataPL,
            sliderDataEN,
            galeryDataPL,
            galeryDataEN,
            partnersDataPL,
            partnersDataEN,
            footerDataPL,
            footerDataEN,
            barDataPL,
            barDataEN
        ] = await Promise.all([
            fetch(`${API_URL}/api/nawigacja?populate=*`).then(async res => {
                if (!res.ok) {
                    return null;
                }
                return res.json();
            }),
            fetch(`${API_URL}/api/hero?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/hero?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/o-wydarzeniu-tytul?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/o-wydarzeniu-tytul?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/abouts?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/abouts?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/loga-firm?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/loga-firm?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/galeria?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/galeria?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/partnership?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/partnership?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/stopka?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/stopka?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/baner?locale=pl&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            }),
            fetch(`${API_URL}/api/baner?locale=en&populate=*`).then(async res => {
                if (!res.ok) return null;
                return res.json();
            })
        ]);

        const data = {
            navigation: navData,
            hero: {
                pl: heroDataPL,
                en: heroDataEN
            },
            aboutTitle: {
                pl: aboutTitlePL,
                en: aboutTitleEN
            },
            aboutContent: {
                pl: aboutContentPL,
                en: aboutContentEN
            },
            slider: {
                pl: sliderDataPL,
                en: sliderDataEN
            },
            galery: {
                pl: galeryDataPL,
                en: galeryDataEN
            },
            partners: {
                pl: partnersDataPL,
                en: partnersDataEN
            },
            footer: {
                pl: footerDataPL,
                en: footerDataEN
            },
            bar: {
                pl: barDataPL,
                en: barDataEN
            }
        };

        return data;
    } catch (error) {
        // W przypadku błędu zwracamy pusty obiekt, żeby aplikacja nie crashowała
        return {
            navigation: null,
            hero: { pl: null, en: null },
            aboutTitle: { pl: null, en: null },
            aboutContent: { pl: null, en: null },
            slider: { pl: null, en: null },
            galery: { pl: null, en: null },
            partners: { pl: null, en: null },
            footer: { pl: null, en: null },
            bar: { pl: null, en: null }
        };
    }
}
