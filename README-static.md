# Aplikacja Targipracy - Wersja Statyczna

## Opis

Ta aplikacja została przekształcona z dynamicznej aplikacji Next.js w stronę statyczną, która nie wymaga Node.js do działania po zbudowaniu.

## Zmiany wprowadzone dla wersji statycznej

### 1. Konfiguracja Next.js
- Dodano `output: 'export'` w `next.config.mjs`
- Skonfigurowano `trailingSlash: true` dla kompatybilności ze statycznymi hostingami
- Ustawiono `images: { unoptimized: true }` dla obrazów

### 2. Architektura danych
- **Stare podejście**: Każdy komponent pobierał dane z API w czasie renderowania
- **Nowe podejście**: Wszystkie dane są pobierane raz podczas budowania aplikacji

### 3. Nowe komponenty i konteksty
- `StaticDataProvider` - kontekst do przekazywania statycznych danych
- `fetchStaticData()` - funkcja pobierająca wszystkie dane podczas budowania
- `ClientPage` - komponent kliencki oddzielony od server component

### 4. Zmodyfikowane komponenty
Wszystkie komponenty zostały zaktualizowane, aby używać statycznych danych:
- `navbar.js`
- `hero.js`
- `about.js`
- `slider.js`
- `galery.js`
- `partners.js`
- `footer.js`
- `bar.js`

## Instrukcja budowania

### 1. Przygotowanie środowiska
```bash
cd frontend
npm install
```

### 2. Konfiguracja zmiennych środowiskowych
Upewnij się, że plik `.env` zawiera:
```
NEXT_PUBLIC_API_URL=https://api.pja.waw.pl
```

### 3. Budowanie aplikacji statycznej
```bash
# Ręcznie
cd frontend
npm run build

# Lub użyj przygotowanego skryptu
./build-static.sh
```

### 4. Wynik budowania
Po pomyślnym budowaniu zostanie utworzony katalog `out/` zawierający:
- `index.html` - główną stronę
- `_next/` - zasoby CSS, JS, obrazy
- Wszystkie inne statyczne pliki

## Deployment

### Opcja 1: Nginx
```nginx
server {
    listen 80;
    server_name twoja-domena.com;
    
    root /ścieżka/do/aplikacji/out;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Opcja 2: Apache
Stwórz plik `.htaccess` w katalogu `out/`:
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Opcja 3: Serowanie lokalne
```bash
# Używając serve
npm install -g serve
serve out

# Używając Pythona
cd out
python -m http.server 8000
```

### Opcja 4: Hosting statyczny
Katalog `out/` można przesłać na dowolny hosting statyczny:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3
- itp.

## Zalety wersji statycznej

✅ **Brak wymagań serwerowych**: Nie potrzeba Node.js na produkcji  
✅ **Szybkość**: Statyczne pliki są szybko serwowane  
✅ **Bezpieczeństwo**: Mniejsza powierzchnia ataku  
✅ **Skalowalność**: Łatwe skalowanie za pomocą CDN  
✅ **Niezawodność**: Mniej punktów awarii  
✅ **Koszt**: Tańszy hosting  

## Ograniczenia

⚠️ **Dane są pobierane podczas budowania**: Zmiany w CMS wymagają rebuildu  
⚠️ **Brak server-side renderingu**: Wszystko działa po stronie klienta  
⚠️ **SEO**: Może wymagać dodatkowej konfiguracji dla lepszego SEO  

## Aktualizacja danych

Aby zaktualizować dane z CMS:
1. Uruchom ponownie proces budowania: `npm run build`
2. Prześlij nowe pliki z katalogu `out/` na serwer

## Troubleshooting

### Problem: Brak danych po zbudowaniu
- Sprawdź połączenie z API podczas budowania
- Upewnij się, że NEXT_PUBLIC_API_URL jest poprawne

### Problem: 404 na podstronach
- Upewnij się, że serwer WWW ma skonfigurowany fallback do index.html
- Dla Nginx użyj `try_files $uri $uri/ /index.html;`

### Problem: Obrazy się nie ładują
- Sprawdź czy ścieżki do obrazów są poprawne
- Upewnij się, że `images: { unoptimized: true }` jest w next.config.mjs
