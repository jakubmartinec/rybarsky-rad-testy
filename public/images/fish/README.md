# Obrázky ryb

Tato složka obsahuje obrázky jednotlivých druhů ryb pro kvíz.

## Formát souborů

Každý obrázek by měl být pojmenován podle ID ryby z `fish-data.ts`:

- Formát: `{fish-id}.png` nebo `{fish-id}.jpg`
- Doporučené rozměry: 800x200 px (poměr 4:1)
- Transparentní pozadí (PNG) je preferováno

## Seznam ryb a jejich ID

Mimopstruhový rybářský revír:
- `bolen-dravy` - bolen dravý
- `candat-obecny` - candát obecný
- `hlavatka-obecna` - hlavatka obecná (podunajská)
- `jelec-jesen` - jelec jesen
- `jelec-tloust` - jelec tloušť
- `jeseter-maly` - jeseter malý
- `kapr-obecny` - kapr obecný
- `lin-obecny` - lín obecný
- `mren` - mřena
- `ostroretka-stehavova` - ostroretka stěhovavá
- `ouklej-obecna` - ouklej obecná
- `parma-obecna` - parma obecná
- `plice-obecna` - plíce obecná
- `stika-obecna` - štika obecná

Další druhy podle zákona:
- `amur-bily` - amur bílý
- `amur-cerny` - amur černý
- `bolec-dravec` - bolec dravec
- `bolen-severocaspicky` - bolen severokaspický
- `cervenec-nahac` - červenec nahá
- `hrouzek-obecny` - hrouzek obecný
- `jelec-proudnik` - jelec proudník
- `jeseter-rusky` - jeseter ruský
- `lesec-duhovy` - lesec duhový
- `lososi-a-pstruzi` - lososovití (Salmonidae)
- `okoun-ricni` - okoun říční
- `ostroretka-severni` - ostroretka severní
- `perlooocka-ricni` - perloočka říční
- `piskor-obecny` - piskořobecný
- `podoustev-ricni` - podoustev říční
- `pudik` - půdík
- `sekavec-podunajsky` - sekavec podunajský
- `siven-americky` - siven americký
- `sumec-velky` - sumec velký
- `tolstolobik-bily` - tolstolobik bílý
- `tolstolobik-pestry` - tolstolobik pestrý
- `tolar-maloocky` - tolarmaloočký

A mnoho dalších... (celkem 52 druhů)

## Jak přidat obrázky

1. Ulož obrázky do této složky (`public/images/fish/`)
2. Pojmenuj je podle ID výše (např. `kapr-obecny.png`)
3. Aplikace je automaticky načte

## Fallback

Pokud obrázek pro danou rybu neexistuje, zobrazí se emoji 🐟
