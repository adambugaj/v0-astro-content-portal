# Integracja SVG Avatarów - Dokumentacja

## Problem i Rozwiązanie

**Problem:** SVG avatary nie wyświetlały się na stronie, ponieważ ścieżki były nieprawidłowe (backslashes zamiast forwardslashes).

**Rozwiązanie:** Avatary są teraz wyświetlane jako minimalistyczne SVG z inicjałami w pasku bocznym artykułów.

## Lokalizacja Plików

- **SVG Avatary**: 
  - `/public/images/avatar-dariusz.svg` - Inicjały DN (Dariusz Nowicki)
  - `/public/images/avatar-monika.svg` - Inicjały MZ (Monika Zielińska)

- **Zdjęcia JPG** (opcjonalne):
  - `/public/images/dariusz-nowicki.jpg` - Zdjęcie Dariusza
  - `/public/images/monika-zielinska.jpg` - Zdjęcie Moniki

## Jak Działa Aktualnie

### W sidebaru artykułów (ArticleSidebar.astro)
```astro
<div class="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center text-white text-xs font-bold">
  DN
</div>
```

SVG avatary są automatycznie wyświetlane jako inicjały w kolorach:
- **Dariusz Nowicki**: Tło gradient szary (zinc 600→800), inicjały **DN** w białym
- **Monika Zielińska**: Tło gradient pomarańczowy (orange 400→600), inicjały **MZ** w białym

### W sekcji kierownictwa (o-redakcji.astro)
```html
<img src="/images/dariusz-nowicki.jpg" alt="Dariusz Nowicki" />
<img src="/images/monika-zielinska.jpg" alt="Monika Zielińska" />
```

Używane są rzeczywiste zdjęcia JPG.

## Jak Dodać Nowego Autora

1. **Dodaj do ArticleSidebar.astro**:
```astro
{editor.name === 'Jan Kowalski' && (
  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">
    JK
  </div>
)}
```

2. **Dodaj SVG** w `/public/images/avatar-jan.svg`

3. **Dodaj zdjęcie JPG** w `/public/images/jan-kowalski.jpg`

## Spis Zmian - Struktura URL

### Pillar Pages (Główne Kategorie)
- `/budowa/` - Kategoria Budowa
  - `/budowa/koszt-budowy-domu` ❌ USUNIĘTY
  - `/budowa/koszt-budowy-domu-2026` ✅ AKTUALNY (główny pillar)
  - `/budowa/budowa-domu-krok-po-kroku` ✅ NOWY pillar page

### Supporting Pages (Artykuły)
- `/budowa/bledy-przy-budowie`
- `/budowa/system-gospodarczy`
- `/budowa/koszt-120m2`
- `/budowa/koszt-140m2-piwnica`

### Pozostałe Strony
- `/o-redakcji` - Redakcja i Eksperci
- `/kontakt` - Kontakt
- `/wspolpraca` - Współpraca
- `/polityka-redakcyjna` - Polityka Redakcyjna

## Sitemap i SEO

Sitemap jest **automatycznie generowany** przez `@astrojs/sitemap` integration w `astro.config.mjs`.

- Dostępny na: `https://domjakosci.pl/sitemap.xml`
- Priorytet głównego pillara: **0.95**
- Priorytet kategorii: **0.9**
- Priorytet artykułów: **0.8**
- Zmiana się na: **weekly**

## Build na Cloudflare Pages

```bash
Build command: npm run build
Output directory: dist
```

Sitemap generuje się automatycznie podczas builda.
