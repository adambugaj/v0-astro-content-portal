# Instrukcja Dodawania Stron do Portalu Astro

## 1. Struktura Folderów

```
src/pages/
├── index.astro                    # Strona główna
├── budowa/
│   ├── index.astro               # Pillar page dla kategorii Budowa
│   ├── materialy-budowlane.astro # Supporting page (artykuł)
│   └── fotowoltaika.astro        # Supporting page (artykuł)
├── wnetrza/
│   ├── index.astro               # Pillar page dla kategorii Wnętrza
│   ├── aranzacja-salonu.astro    # Supporting page
│   └── trendy-kuchnia.astro      # Supporting page
├── ogrod/
│   ├── index.astro               # Pillar page
│   ├── ogrod-japonski.astro      # Supporting page
│   └── przygotowanie-wiosna.astro # Supporting page
└── kalkulatory/
    ├── index.astro               # Strona z wszystkimi kalkulatorami
    ├── materialy.astro
    ├── koszty.astro
    └── powierzchnia.astro
```

## 2. Jak Dodać PILLAR PAGE (Stronę Kategorii)

**Pillar page** to główna strona kategorii, np. `/budowa/index.astro`

### Krok 1: Utwórz folder i plik
```bash
mkdir src/pages/budowa
touch src/pages/budowa/index.astro
```

### Krok 2: Szablon Pillar Page

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';
import ArticleCard from '../../components/ArticleCard.astro';

const breadcrumbs = [
  { label: 'Strona główna', href: '/' },
  { label: 'Budowa' }
];

const articles = [
  {
    title: 'Jak wybrać materiały budowlane',
    excerpt: 'Kompleksowy przewodnik...',
    href: '/budowa/materialy-budowlane',
    category: 'Budowa',
    date: '2024-01-15'
  },
  // Dodaj więcej artykułów
];
---

<MainLayout 
  title="Budowa - Portal Budowlany"
  description="Wszystko o budowie domu - projekty, materiały, technologie"
>
  <Header />
  
  <main class="max-w-7xl mx-auto px-4 py-8">
    <Breadcrumbs items={breadcrumbs} />
    
    <h1 class="text-4xl md:text-5xl font-bold text-zinc-700 mb-6">
      Budowa
    </h1>
    <p class="text-xl text-zinc-600 mb-12">
      Profesjonalne porady dotyczące budowy domu od podstaw.
    </p>

    <!-- Lista artykułów -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard {...article} />
      ))}
    </div>
  </main>

  <Footer />
</MainLayout>
```

## 3. Jak Dodać SUPPORTING PAGE (Artykuł)

**Supporting page** to pojedynczy artykuł, np. `/budowa/materialy-budowlane.astro`

### Krok 1: Utwórz plik artykułu
```bash
touch src/pages/budowa/materialy-budowlane.astro
```

### Krok 2: Szablon Supporting Page

```astro
---
import MainLayout from '../../layouts/MainLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Breadcrumbs from '../../components/Breadcrumbs.astro';

const breadcrumbs = [
  { label: 'Strona główna', href: '/' },
  { label: 'Budowa', href: '/budowa' },
  { label: 'Materiały budowlane' }
];
---

<MainLayout 
  title="Jak wybrać materiały budowlane - Portal Budowlany"
  description="Poznaj kluczowe aspekty wyboru materiałów budowlanych"
>
  <Header />
  
  <article class="max-w-4xl mx-auto px-4 py-8">
    <Breadcrumbs items={breadcrumbs} />
    
    <header class="mb-8">
      <div class="text-sm text-orange-500 font-semibold mb-2">
        Budowa • 15 stycznia 2024
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-zinc-700 mb-4">
        Jak wybrać najlepsze materiały do budowy domu
      </h1>
      <p class="text-xl text-zinc-600">
        Poznaj kluczowe aspekty wyboru materiałów budowlanych...
      </p>
    </header>

    <div class="prose prose-lg max-w-none">
      <h2 class="text-2xl font-bold text-zinc-700 mt-8 mb-4">
        Wprowadzenie
      </h2>
      <p class="text-zinc-600 mb-4">
        Treść artykułu...
      </p>

      <h2 class="text-2xl font-bold text-zinc-700 mt-8 mb-4">
        Rodzaje materiałów
      </h2>
      <p class="text-zinc-600 mb-4">
        Więcej treści...
      </p>
    </div>
  </article>

  <Footer />
</MainLayout>
```

## 4. Konwencje Nazewnictwa

- **Nazwy plików**: kebab-case (małe litery, myślniki)
  - ✅ `materialy-budowlane.astro`
  - ❌ `MaterialyBudowlane.astro`
  
- **URL**: Automatycznie mapowane z nazwy pliku
  - `src/pages/budowa/index.astro` → `/budowa/`
  - `src/pages/budowa/materialy.astro` → `/budowa/materialy/`

## 5. Checklist Dodawania Nowej Strony

- [ ] Utwórz plik `.astro` w odpowiednim folderze
- [ ] Użyj `MainLayout` zamiast `BaseLayout`
- [ ] Dodaj `Header` i `Footer`
- [ ] Dodaj `Breadcrumbs` dla nawigacji
- [ ] Ustaw prawidłowy `title` i `description` (SEO)
- [ ] Użyj semantycznych tagów HTML (H1, H2, H3)
- [ ] Sprawdź responsywność (Tailwind: `md:`, `lg:`)
- [ ] Dodaj link do nowej strony w odpowiednim miejscu (np. pillar page)

## 6. SEO Best Practices

```astro
<MainLayout 
  title="Krótki, opisowy tytuł (50-60 znaków)"
  description="Meta opis przyciągający kliknięcia (150-160 znaków)"
>
```

- **H1**: Tylko jeden na stronę, główny temat
- **H2**: Podsekcje artykułu
- **H3**: Podpunkty w sekcjach
- **Breadcrumbs**: Zawsze dodawaj dla lepszej nawigacji

## 7. Przykład: Dodanie Nowego Artykułu

```bash
# 1. Utwórz plik
touch src/pages/budowa/izolacja-fundamentow.astro

# 2. Skopiuj szablon supporting page
# 3. Dostosuj treść
# 4. Dodaj link w src/pages/budowa/index.astro
# 5. Build i test: npm run build
```

## 8. Testowanie

```bash
# Tryb deweloperski
npm run dev

# Build produkcyjny (sprawdź błędy)
npm run build

# Podgląd buildu
npm run preview
