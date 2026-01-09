# Struktura Kategorii - Przewodnik Budowa Folderu

## Problem Obecny
Sitemap.xml generuje się jako sitemap-0.xml zamiast sitemap.xml - to bug w @astrojs/sitemap gdy jest >50k URLs (nawet jeśli mamy mało, cache jest problem).

## Rozwiązanie
**Usunąć plik `/public/sitemap.xml`** jeśli istnieje - pakiet @astrojs/sitemap będzie generować poprawny podczas buildu.

---

## 1. DOCELOWA STRUKTURA KATEGORII

```
src/pages/budowa/
├── index.astro                                    ← CATEGORY PAGE
├── koszt-budowy-domu/
│   ├── index.astro                               ← PILLAR (główny artykuł)
│   ├── koszt-100m2.astro                         ← SUPPORTING
│   ├── koszt-parterowy.astro                     ← SUPPORTING
│   ├── koszt-z-garazem.astro                     ← SUPPORTING
│   ├── koszt-system-gospodarczy.astro            ← SUPPORTING
│   └── koszt-fundamentow.astro                   ← SUPPORTING
├── technologie-budowy/
│   ├── index.astro                               ← PILLAR
│   ├── murowany-vs-szkielet.astro                ← SUPPORTING
│   └── domy-modulowe.astro                       ← SUPPORTING
├── formalnosci-budowlane/
│   ├── index.astro                               ← PILLAR
│   └── pozwolenie-na-budowe.astro                ← SUPPORTING
├── materialy-budowlane/
│   ├── index.astro                               ← PILLAR
│   └── cena-materiałów.astro                     ← SUPPORTING
└── etapy-budowy/
    ├── index.astro                               ← PILLAR
    └── fundament-do-dachu.astro                  ← SUPPORTING
```

**URL Output:**
- `https://domjakosci.pl/budowa/koszt-budowy-domu/` ← Pillar
- `https://domjakosci.pl/budowa/koszt-budowy-domu/koszt-100m2/` ← Supporting

---

## 2. MINIMALISTYCZNY BOX - PODOBNE ARTYKUŁY

Stwórz komponent `src/components/RelatedArticles.astro`:

```astro
---
interface Props {
  category: string;        // 'budowa', 'energia' itp
  excludeUrl?: string;     // URL bieżącego artykułu
  limit?: number;          // ile artykułów (default 3)
}

const { category, excludeUrl, limit = 3 } = Astro.props;

// Dane artykułów w każdej kategorii
const articles = {
  budowa: [
    { title: 'Koszt budowy domu 100m²', url: '/budowa/koszt-budowy-domu/koszt-100m2/' },
    { title: 'Budowa parterowa vs piętrowa', url: '/budowa/koszt-budowy-domu/koszt-parterowy/' },
    { title: 'System gospodarczy - oszczędności', url: '/budowa/koszt-budowy-domu/koszt-system-gospodarczy/' },
  ],
  energia: [
    { title: 'Kolektory słoneczne czy pompa ciepła?', url: '/energia/koszty-energii/kolektory/' },
    { title: 'Koszt paneli fotowoltaiki', url: '/energia/oze-koszty/panele-fotowoltaika/' },
  ],
};

const categoryArticles = articles[category] || [];
const filtered = categoryArticles.filter(a => a.url !== excludeUrl).slice(0, limit);
---

<div class="mt-12 p-6 bg-stone-200 border-l-4 border-orange-500">
  <h3 class="text-lg font-bold text-zinc-700 mb-4">Przeczytaj też z tej kategorii</h3>
  <ul class="space-y-2">
    {filtered.map(article => (
      <li>
        <a href={article.url} class="text-orange-500 hover:text-orange-600 underline">
          → {article.title}
        </a>
      </li>
    ))}
  </ul>
</div>
```

**Użycie w dowolnym pliku .astro:**
```astro
---
import RelatedArticles from '../components/RelatedArticles.astro';
---

<main>
  <!-- Treść artykułu -->
  <RelatedArticles category="budowa" excludeUrl="/budowa/koszt-budowy-domu/koszt-100m2/" />
</main>
```

---

## 3. JAK DODAWAĆ ARTYKUŁY MANUALNIE

### Typ 1: SUPPORT ARTICLE (bez kalkulatora)

1. Stwórz plik: `src/pages/budowa/koszt-budowy-domu/nowy-artykul.astro`
2. Skopiuj template poniżej

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import ArticleSidebar from '../../../components/ArticleSidebar.astro';
import RelatedArticles from '../../../components/RelatedArticles.astro';

const title = "Twój tytuł artykułu";
const description = "Twój opis meta";
const category = "budowa";
const pillarUrl = "/budowa/koszt-budowy-domu/";
---

<BaseLayout title={title} description={description}>
  <div class="flex gap-8 pt-8">
    <!-- Article -->
    <main class="flex-1">
      <h1>{title}</h1>
      <p class="text-gray-600 mb-6">Wstęp do artykułu...</p>
      
      <!-- TWOJA TREŚĆ IDZIE TUTAJ -->
      <h2>Sekcja 1</h2>
      <p>Treść...</p>
      
      <!-- Related Articles Box -->
      <RelatedArticles category={category} excludeUrl={Astro.url.pathname} />
    </main>

    <!-- Sidebar -->
    <aside class="w-64">
      <ArticleSidebar pillarUrl={pillarUrl} />
    </aside>
  </div>
</BaseLayout>
```

### Typ 2: ARTYKUŁ Z KALKULATOREM

Dodaj `<script>` przed `</BaseLayout>`:

```astro
<script>
  // Twój kod JS kalkulatora
  function calculateCost() {
    const area = document.getElementById('area').value;
    const result = area * 2500; // przykład
    document.getElementById('result').textContent = result.toLocaleString();
  }
</script>

<div class="mt-8 p-6 bg-orange-50 border-2 border-orange-500">
  <h2>Kalkulator kosztów</h2>
  <input id="area" type="number" placeholder="Metry kwadratowe" />
  <button onclick="calculateCost()">Oblicz</button>
  <p id="result"></p>
</div>
```

---

## 4. FORMATY PLIKÓW - PORÓWNANIE TOKENÓW

### JSON vs CSV vs HTML (dla danych artykułów)

| Format | Tokeny | Przydatność | Kiedy Używać |
|--------|--------|-------------|-------------|
| **JSON** | ~1500 | ⭐⭐⭐⭐⭐ Najlepszy | Dane strukturalne (ceny, kalkulatory) |
| **CSV** | ~800 | ⭐⭐⭐ Średni | Tabelaryczne dane (porównania) |
| **HTML** | ~3500 | ⭐⭐ Zły | Nigdy - zawiera style inline |
| **Markdown** | ~2000 | ⭐⭐⭐⭐ Dobry | Treść tekstu, SEO |

**Rekomendacja:**
- **Tylko treść**: Podaj **Markdown** (wklejony tekst)
- **Dane do obliczeń**: Podaj **JSON** (struktura tabeli)
- **HTML artykuły**: Skopiuj treść do `.astro` ręcznie

---

## 5. JAK USUNĄĆ ARTYKUŁ BEZPIECZNIE

### KROK 1: Usuń plik
```bash
# Np. chcesz usunąć /budowa/koszt-100m2.astro
# Usuń plik z repo i push do GitHub
```

### KROK 2: Zmień linki wewnętrzne
- Wyszukaj w kodzie referencje do tego URL-a
- Zmień na nowy URL (jeśli przenosiłeś treść)

### KROK 3: Dodaj redirect (opcjonalnie)
Jeśli chcesz zachować SEO, stwórz `astro.config.mjs` redirect:
```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/budowa/koszt-100m2': '/budowa/koszt-budowy-domu/koszt-100m2/',
  }
});
```

### KROK 4: Deploy
Push do GitHub → Cloudflare automatycznie rebuilduje

**Rezultat:**
- Stary URL `https://domjakosci.pl/budowa/koszt-100m2` → znika z sitemap.xml
- Google via Search Console za ~2-3 tygodnie zauważy zmianę

---

## 6. TOPOWANIE SIDEBARU - ARTYKUŁY MANUALNE

ArticleSidebar automatycznie się renderuje jeśli go zaimportujesz:

```astro
import ArticleSidebar from '../../../components/ArticleSidebar.astro';

// W HTML:
<ArticleSidebar pillarUrl="/budowa/koszt-budowy-domu/" />
```

Sidebar wyświetli:
- ✅ TOC (spis treści) - automatycznie z h2/h3 twoich stronie
- ✅ Redaktorzy (Monika/Dariusz) - z linkami do /o-redakcji
- ✅ Powiązane artykuły - tych samej kategorii

---

## PODSUMOWANIE

| Zadanie | Jak Zrobić |
|---------|-----------|
| Dodać artykuł | Copy template powyżej + dodaj treść |
| Usunąć artykuł | Usuń plik, push do GitHub |
| Zmienić URL | Rename plik, update linki, redirect |
| Box podobnych artykułów | Import `<RelatedArticles />` |
| Kalkulator JS | Dodaj `<script>` w .astro |
| Sidebar/TOC | Import `<ArticleSidebar />` |
```
