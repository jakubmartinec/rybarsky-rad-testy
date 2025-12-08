# Rybářský řád - Testy

Interaktivní testovací aplikace pro přípravu na zkoušky z rybářského řádu. Aplikace obsahuje kvíz o minimálních lovných mírách ryb v mimopstruhovém rybářském revíru.

## 🎣 Funkce

- **Interaktivní kvíz** o minimálních lovných mírách 52 druhů ryb
- **Časový limit**: 15 minut na dokončení testu
- **Hodnocení**: maximálně 3 chyby pro úspěšné složení
- **Náhodné pořadí**: otázky i možnosti odpovědí se zamíchají
- **Mobilní design**: optimalizováno pro použití na telefonech
- **Offline data**: všechna data o rybách přímo v aplikaci

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Styling:** Tailwind CSS (minimalistický design)
- **Hosting:** Vercel

## 📦 Instalace

```bash
# Naklonuj repo
git clone https://github.com/jakubmartinec/rybarsky-rad-testy.git
cd rybarsky-rad-testy

# Nainstaluj dependencies
npm install

# Spusť development server
npm run dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000)

## 📱 Použití

1. Otevři aplikaci na `/ryby-kviz`
2. Klikni na **"Začít test"**
3. Pro každou rybu vyber správnou minimální lovnou míru
4. Sleduj čas a počet chyb v horní části obrazovky
5. Po dokončení testu uvidíš výsledky a správné odpovědi

## 🐟 Obsah kvízu

Kvíz obsahuje **52 druhů ryb** včetně:

### Mimopstruhový rybářský revír
- Bolen dravý (40 cm)
- Candát obecný (45 cm)
- Kapr obecný (40 cm)
- Lín obecný (25 cm)
- Štika obecná (50 cm)
- a další...

### Další druhy podle zákona
- Amur bílý (50 cm)
- Ostroretka stěhovavá (40 cm)
- Siven americký (40 cm)
- Sumec velkouný (70 cm)
- a další...

## 🗂️ Struktura projektu

```
/app
  /ryby-kviz              # Hlavní stránka kvízu
  /globals.css            # Globální styly
  /layout.tsx             # Root layout
/components
  /fish-quiz              # Komponenta kvízu
    /FishQuiz.tsx         # Hlavní logika kvízu
/lib
  /fish-data.ts           # Data o rybách a jejich mírách
  /utils.ts               # Pomocné funkce
/types
  /index.ts               # TypeScript definice
```

## 🎨 Design

- **Minimalistický a přehledný** interface
- **Mobile-first** přístup
- **Velká tlačítka** pro snadné ovládání
- **Jasné barevné označení** správných/špatných odpovědí
- **Časovač a progress bar** pro sledování postupu

## 🔧 Konfigurace

Aplikace nepotřebuje žádnou speciální konfiguraci. Všechna data jsou statická a zahrnuta v kódu.

Pro production build:

```bash
npm run build
npm start
```

## 🚢 Deployment

Aplikace je připravená pro nasazení na Vercel:

1. Push na GitHub
2. Připoj repo na [Vercel](https://vercel.com)
3. Deploy!

Žádné environment variables nejsou potřeba.

## 📝 TODO

- [ ] Přidat více testů (pstruhový revír, ochranné doby, apod.)
- [ ] Statistiky úspěšnosti jednotlivých otázek
- [ ] Uložení výsledků do localStorage
- [ ] Export výsledků do PDF
- [ ] Tréningový režim bez časového limitu
- [ ] Režim "pouze chyby" pro opakování nesprávných odpovědí

## 📚 Zdroje

Data o minimálních lovných mírách vycházejí z:
- Zákona č. 99/2004 Sb., o rybářství
- Prováděcích vyhlášek k zákonu o rybářství

## 📄 Licence

Soukromý vzdělávací projekt

---

**Připraveno pro úspěšné složení zkoušek! 🎣**
