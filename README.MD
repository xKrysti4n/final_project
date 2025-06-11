# Elasticsearch Job Offers

## 🚀 Uruchomienie projektu

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Na Windows: .venv\Scripts\activate
pip install -r requirements.txt
fastapi run
```

## 📁 Struktura projektu

```
final_project/
├── frontend/                    # Aplikacja React
│   ├── src/                    # Kod źródłowy
│   │   ├── components/         # Komponenty React
│   │   ├── contexts/          # Konteksty React
│   │   ├── hooks/            # Hooki React
│   │   ├── lib/              # Biblioteki i narzędzia
│   │   ├── pages/            # Strony aplikacji
│   │   ├── services/         # Serwisy i API
│   │   ├── App.tsx           # Główny komponent aplikacji
│   │   ├── main.tsx          # Punkt wejścia aplikacji
│   │   └── config.ts         # Konfiguracja aplikacji
│   ├── public/                # Statyczne zasoby
│   ├── index.html            # Szablon HTML
│   ├── package.json          # Zależności i skrypty
│   ├── tsconfig.json         # Konfiguracja TypeScript
│   ├── vite.config.ts        # Konfiguracja Vite
│   ├── tailwind.config.ts    # Konfiguracja Tailwind CSS
│   └── eslint.config.js      # Konfiguracja ESLint
│
├── backend/                    # Aplikacja Python
│   ├── app/                   # Kod źródłowy backendu
│   │   ├── api/              # Endpointy API
│   │   ├── core/             # Rdzeń aplikacji
│   │   ├── schemas/          # Schematy danych
│   │   ├── services/         # Serwisy biznesowe
│   │   ├── utils/            # Narzędzia pomocnicze
│   │   ├── main.py           # Główny plik aplikacji
└── └── └── __init__.py       # Inicjalizacja pakietu

```
