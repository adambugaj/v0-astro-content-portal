# FAQ: Dodawanie plików i Deployment na Cloudflare Pages

## 1. Dlaczego SVG avatary nie działały?

**Problem**: W kodzie była nadal ścieżka JPG zamiast SVG.

**Rozwiązanie**: 
- Usunąłem `<img src="/images/dariusz-nowicki.jpg">` 
- Zastąpiłem inlined SVG avatarami (gradient circles z inicjałami DN/MZ)
- SVG są inline w komponencie - nie ma problemu z ścieżkami

**Best practice**: W Astro inline SVG jest szybsze niż oddzielne pliki, bo:
- Nie wymaga dodatkowego HTTP request
- Można stylować CSS bezpośrednio
- Mniejsze bundle size

---

## 2. Dlaczego sitemap.xml nie pojawia się w public/?

**Wyjaśnienie**: Sitemap jest **generowany automatycznie podczas buildu**, a nie jest w kodzie źródłowym:

1. `@astrojs/sitemap` generuje XML na etapie BUILD
2. Plik pojawia się w `/dist/sitemap.xml` po `npm run build`
3. Na Cloudflare Pages automatycznie trafia do deploymentu

**Jak sprawdzić**:
```bash
npm run build
cat dist/sitemap.xml  # Powinna być tam pełna sitemap
```

**Sprawdzenie online**:
- Po deployu odwiedź: `https://domjakosci.pl/sitemap.xml`
- Powinny być tam WSZYSTKIE strony (bez 2026)

**Jeśli nadal nie działa**:
1. Sprawdź czy w `astro.config.mjs` jest `site: 'https://domjakosci.pl'` ✅
2. Sprawdź czy `@astrojs/sitemap` jest w `integrations` ✅
3. Rebuild: `npm run build && npm run preview`

---

## 3. Jak dodawać pliki Astro bez copy-paste?

### Opcja A: GitHub (ZALECANE)
1. Push kod do GitHub repo
2. Cloudflare Pages automatycznie builduje z gita
3. Nie musisz nic uploadować ręcznie

**Kroki**:
```bash
git add .
git commit -m "Add new page"
git push origin main
```
Cloudflare automatycznie rebuilduje 🎉

### Opcja B: Wrzucanie przez web UI (Cloudflare)
1. W Cloudflare Pages → Settings → Build configuration
2. Możesz zmienić branch lub ręcznie retrigger build
3. Ale to nie wrzuca plików - tylko rebuilduje

### Opcja C: Lokalna edycja + Sync
1. Edytujesz pliki lokalnie w v0
2. `npm run build` → testowanie
3. Commitujesz do gita
4. Cloudflare rebuilduje

### Nie rób tak ❌
- Nie uploaduj bezpośrednio `.astro` plików do Cloudflare (nie obsługuje)
- Nie używaj Drag & Drop w Cloudflare (to dla statycznych HTML)
- Nie edytuj `dist/` folder - regeneruje się przy każdym buildie

---

## 4. Best practices dla przyszłych plików

Gdy będziesz dodawał nowe strony:

**Plik Astro** (`src/pages/nazwa-strony.astro`):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import ArticleSidebar from '../components/ArticleSidebar.astro';
---

<BaseLayout 
  title="Unikalna nazwa | domjakosci.pl"
  description="Unikalna meta description - max 160 znaków"
>
  <Header />
  <main class="container mx-auto px-4 py-20">
    <article>
      <h1>Nagłówek artykułu</h1>
      {/* Zawartość */}
    </article>
  </main>
  
  <aside>
    <ArticleSidebar category="budowa" />
  </aside>
</BaseLayout>
```

**Workflow**:
1. Stwórz plik `.astro` w `src/pages/`
2. `npm run dev` → test na `localhost:3000`
3. Commit → push do GitHub
4. Cloudflare automatycznie builduje

---

## Podsumowanie

| Problem | Przyczyna | Rozwiązanie |
|---------|-----------|-------------|
| SVG avatary nie widać | JPG ścieżka zamiast inline | Inline SVG w komponencie ✅ |
| Sitemap nie w public | Runtime artifact (generuje się na BUILD) | Sprawdź `dist/sitemap.xml` po build |
| Dodawanie plików | Cloudflare to static hosting, nie IDE | Użyj GitHub push + auto-rebuild |
