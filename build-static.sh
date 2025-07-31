#!/bin/bash

echo "🚀 Budowanie aplikacji statycznej..."

# Przejdź do katalogu frontend
cd frontend

# Sprawdź czy istnieje plik .env
if [ ! -f .env ]; then
    echo "❌ Brak pliku .env - skopiuj z .env.example"
    exit 1
fi

# Pobierz zależności (jeśli nie istnieje node_modules)
if [ ! -d "node_modules" ]; then
    echo "📦 Instalowanie zależności..."
    npm install
fi

# Zbuduj aplikację statyczną
echo "🔨 Budowanie aplikacji statycznej..."
npm run build:static

# Sprawdź czy build się udał
if [ -d "out" ]; then
    echo "✅ Strona statyczna została zbudowana pomyślnie!"
    echo "📁 Pliki znajdują się w katalogu 'out/'"
    echo ""
    echo "🌐 Możesz teraz serwować aplikację z dowolnego serwera WWW:"
    echo "   - nginx"
    echo "   - apache"
    echo "   - serve (npm install -g serve && serve out)"
    echo "   - python -m http.server (w katalogu out/)"
    echo ""
    echo "⚡ Aplikacja nie wymaga już Node.js do działania!"
else
    echo "❌ Błąd podczas budowania aplikacji"
    exit 1
fi
