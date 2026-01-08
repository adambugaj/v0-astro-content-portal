# Dokumentacja SEO dla Dom Jakości

## Jak poprawnie dodawać nowe strony HTML do portalu

### 1. Struktura podstawowa każdej strony

Każda strona musi mieć unikalne metadane SEO:

```astro
---
// src/pages/kategoria/nazwa-artykulu.astro
const pageTitle = "Unikalny tytuł strony (50-60 znaków) | Dom Jakości";
const pageDescription = "Unikalny opis strony, który zachęca do kliknięcia (150-160 znaków). Zawiera słowa kluczowe i wartość dla użytkownika.";
const pageImage = "https://domjakosci.pl/images/nazwa-artykulu-og.jpg";
const pageAuthor = "Dariusz Nowicki"; // lub "Monika Zielińska"
---

<BaseLayout 
  title={pageTitle}
  description={pageDescription}
  type="article"
  image={pageImage}
  author={pageAuthor}
>
  <!-- Treść strony -->
</BaseLayout>
```

### 2. Wymagania dla tytułów (title)

- **Długość:** 50-60 znaków (max 70)
- **Format:** "Główne Słowo Kluczowe - Dodatkowy Kontekst | Dom Jakości"
- **Przykłady:**
  - ✅ "Koszt Budowy Domu 120m² - Kompletny Przewodnik 2026 | Dom Jakości"
  - ✅ "Fotowoltaika w Domu - Oszczędności i Dotacje | Dom Jakości"
  - ❌ "Budowa domu" (za krótkie, brak wartości)
  - ❌ "Kompletny przewodnik po kosztach budowy domu jednorodzinnego krok po kroku z kalkulatorem" (za długie)

### 3. Wymagania dla opisów (meta description)

- **Długość:** 150-160 znaków (max 165)
- **Zawiera:**
  - Główne słowo kluczowe
  - Wartość dla użytkownika (co zyska?)
  - Call to action (sprawdź, zobacz, oblicz)
- **Przykłady:**
  - ✅ "Sprawdź rzeczywisty koszt budowy domu 120m² w 2026 roku. Kompletna kalkulacja z podziałem na etapy + interaktywny kalkulator. Zobacz teraz!"
  - ✅ "Fotowoltaika w domu: koszty instalacji, oszczędności, dostępne dotacje i zwrot z inwestycji. Praktyczny poradnik + kalkulator opłacalności."
  - ❌ "Artykuł o budowie domu" (za ogólny, brak wartości)

### 4. Struktura nagłówków (H1-H6)

**BARDZO WAŻNE:** Hierarchia nagłówków wpływa na SEO!

```html
<h1>Tylko jeden H1 na stronie - główny tytuł artykułu</h1>

<h2>Pierwszy główny rozdział</h2>
  <h3>Podrozdział pierwszego rozdziału</h3>
  <h3>Kolejny podrozdział</h3>
    <h4>Szczegół w podrozdziale</h4>

<h2>Drugi główny rozdział</h2>
  <h3>Podrozdział drugiego rozdziału</h3>
```

**Zasady:**
- Tylko **jeden H1** na stronie (główny tytuł)
- H2-H6 w logicznej hierarchii (nie przeskakuj poziomów: H2→H4)
- Nagłówki zawierają słowa kluczowe
- Długość H1: 20-70 znaków
- Każdy nagłówek opisuje co znajduje się w sekcji

### 5. Schema.org - strukturalne dane

BaseLayout automatycznie dodaje Schema.org dla:
- WebSite (strony kategorialne, homepage)
- Article (artykuły, posty)

**Dla specjalnych typów treści dodaj dodatkowe Schema.org:**

#### a) FAQ (często zadawane pytania)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Ile kosztuje budowa domu 120m²?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Koszt budowy domu 120m² w 2026 roku wynosi od 400 000 do 600 000 zł w zależności od standardu wykończenia..."
    }
  }]
}
</script>
```

#### b) HowTo (instrukcje krok po kroku)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Jak obliczyć koszt budowy domu",
  "step": [{
    "@type": "HowToStep",
    "name": "Oblicz powierzchnię",
    "text": "Zmierz dokładnie powierzchnię użytkową domu..."
  }]
}
</script>
```

### 6. Checklist przed publikacją

- [ ] Unikalny title (50-60 znaków)
- [ ] Unikalny description (150-160 znaków)
- [ ] Jeden H1 na stronie
- [ ] Hierarchia H2-H6 bez przeskoków
- [ ] Obrazy z atrybutem alt=""
- [ ] Linki wewnętrzne do powiązanych artykułów
- [ ] Schema.org (Article/FAQ/HowTo jeśli pasuje)
- [ ] Autor określony (Dariusz/Monika)
- [ ] Canonical URL automatycznie dodany przez BaseLayout

### 7. Obrazy i multimedia

```html
<!-- Zawsze dodawaj alt text -->
<img 
  src="/images/koszt-budowy-domu.jpg" 
  alt="Wykres pokazujący koszty budowy domu 120m² w podziale na etapy"
  width="800"
  height="600"
/>
```

**Wymagania:**
- Format: WebP lub JPG (PNG tylko dla grafik)
- Alt text: opisowy, zawiera słowa kluczowe
- Rozmiar: max 200KB (kompresja)
- Wymiary: min 800px szerokości

### 8. Linki wewnętrzne (Internal Linking)

Każdy artykuł powinien zawierać 3-5 linków wewnętrznych:

```html
<p>
  Dowiedz się więcej o 
  <a href="/budowa/fotowoltaika" class="text-orange-500 hover:underline">
    kosztach instalacji fotowoltaiki
  </a>
  w naszym dedykowanym poradniku.
</p>
```

### 9. Przykład kompletnej strony

```astro
---
// src/pages/budowa/przyklad-artykulu.astro
const pageTitle = "Jak Wybrać Działkę pod Budowę Domu - Poradnik 2026 | Dom Jakości";
const pageDescription = "Kompleksowy przewodnik wyboru działki budowlanej: lokalizacja, media, cena, dokumenty. Sprawdź 10 kluczowych kryteriów przed zakupem!";
const pageImage = "https://domjakosci.pl/images/wybor-dzialki-og.jpg";
const pageAuthor = "Dariusz Nowicki";
---

<BaseLayout 
  title={pageTitle}
  description={pageDescription}
  type="article"
  image={pageImage}
  author={pageAuthor}
>
  <Header />
  
  <main class="container mx-auto px-4 py-8">
    <article class="max-w-4xl mx-auto">
      <!-- Breadcrumbs -->
      <Breadcrumbs items={[
        { label: 'Strona główna', href: '/' },
        { label: 'Budowa', href: '/budowa' },
        { label: 'Jak wybrać działkę pod budowę domu' }
      ]} />
      
      <!-- Główny tytuł - H1 (tylko jeden!) -->
      <h1 class="text-4xl font-bold text-zinc-700 mt-8 mb-4">
        Jak Wybrać Działkę pod Budowę Domu - Poradnik 2026
      </h1>
      
      <!-- Lead / wprowadzenie -->
      <p class="text-lg text-zinc-600 mb-8">
        Wybór działki to pierwsza i najważniejsza decyzja przy budowie domu. 
        W tym poradniku znajdziesz 10 kluczowych kryteriów...
      </p>
      
      <!-- Autor i data -->
      <div class="flex items-center gap-4 mb-8 pb-8 border-b">
        <img src="/images/dariusz-nowicki.jpg" 
             alt="Dariusz Nowicki - redaktor naczelny" 
             class="w-12 h-12 rounded-full" />
        <div>
          <p class="font-semibold text-zinc-700">Dariusz Nowicki</p>
          <p class="text-sm text-zinc-500">Opublikowano: 8 stycznia 2026</p>
        </div>
      </div>
      
      <!-- Treść artykułu z hierarchią nagłówków -->
      <h2 class="text-2xl font-bold text-zinc-700 mt-8 mb-4">
        1. Lokalizacja działki
      </h2>
      
      <p class="mb-4">
        Lokalizacja to kluczowy czynnik wpływający na komfort życia...
      </p>
      
      <h3 class="text-xl font-semibold text-zinc-700 mt-6 mb-3">
        Dostęp do infrastruktury
      </h3>
      
      <p class="mb-4">
        Sprawdź odległość do szkół, sklepów, przychodni...
      </p>
      
      <!-- Link wewnętrzny -->
      <p class="mb-4">
        Po wyborze działki, następnym krokiem jest 
        <a href="/budowa/koszt-budowy-domu" class="text-orange-500 hover:underline">
          obliczenie kosztów budowy domu
        </a>.
      </p>
      
      <h2 class="text-2xl font-bold text-zinc-700 mt-8 mb-4">
        2. Media i przyłącza
      </h2>
      
      <!-- FAQ Schema.org -->
      <section class="bg-stone-100 p-6 rounded-lg mt-8">
        <h2 class="text-2xl font-bold text-zinc-700 mb-4">
          Najczęściej zadawane pytania
        </h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold text-zinc-700 mb-2">
              Ile kosztuje działka budowlana?
            </h3>
            <p class="text-zinc-600">
              Ceny działek budowlanych wahają się od 50 do 300 zł/m²...
            </p>
          </div>
        </div>
      </section>
      
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "Ile kosztuje działka budowlana?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ceny działek budowlanych wahają się od 50 do 300 zł/m² w zależności od lokalizacji..."
          }
        }]
      }
      </script>
    </article>
  </main>
  
  <Footer />
</BaseLayout>
```

### 10. Narzędzia do sprawdzania SEO

- **Google Search Console**: https://search.google.com/search-console
- **Schema Validator**: https://validator.schema.org/
- **Meta Tags Preview**: https://metatags.io/

---

## Podsumowanie

1. Każda strona = unikalny title + description
2. Tylko jeden H1, reszta H2-H6 hierarchicznie
3. Schema.org automatycznie + dodatkowe dla FAQ/HowTo
4. 3-5 linków wewnętrznych w każdym artykule
5. Obrazy z alt text
6. Autor zawsze określony
```
