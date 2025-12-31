# 🚀 Manual Deploymentu na Cloudflare Pages - Debugging Guide

## 📋 Spis Treści
1. [Konfiguracja Buildów](#konfiguracja-buildów)
2. [Najczęstsze Błędy i Rozwiązania](#najczęstsze-błędy-i-rozwiązania)
3. [Gdzie Sprawdzić Logi](#gdzie-sprawdzić-logi)
4. [Checklist Przed Deploymentem](#checklist-przed-deploymentem)

---

## 🔧 Konfiguracja Buildów

### Poprawne Ustawienia dla Astro na Cloudflare Pages:

```
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: (puste)
```

⚠️ **NAJCZĘSTSZY BŁĄD**: Ustawienie "Build output directory" na `/` zamiast `dist`

---

## 🐛 Najczęstsze Błędy i Rozwiązania

### 1. **Błąd: "Expected '>' but found 'class'"**

**Przykład z logów:**
```
Expected ">" but found "class"
Location: /src/components/Footer.astro:25:8
```

**Przyczyna:** Niepoprawna składnia HTML/Astro - najczęściej niezamknięty tag lub błąd w atrybucie.

**Rozwiązanie:**
1. Otwórz plik wskazany w błędzie (np. `Footer.astro`)
2. Przejdź do linii 25
3. Sprawdź czy:
   - Wszystkie tagi są prawidłowo zamknięte: `<a href="...">tekst</a>`
   - Brak spacji w atrybutach: `class="..."` zamiast `class ="..."`
   - Użyte są podwójne cudzysłowy: `class="..."` zamiast `class='...'`

**Przykład naprawy:**
```astro
<!-- ❌ BŁĄD -->
<li><a href="/kalkulatory" class="hover:text-orange-500">Kalkulatory</li>

<!-- ✅ POPRAWNIE -->
<li><a href="/kalkulatory" class="hover:text-orange-500">Kalkulatory</a></li>
```

---

### 2. **Błąd: "Module not found" / "Cannot find module"**

**Przykład:**
```
Error: Cannot find module '@components/Header.astro'
```

**Przyczyna:** Niepoprawna ścieżka importu lub brak pliku.

**Rozwiązanie:**
1. Sprawdź czy plik istnieje w `src/components/`
2. Użyj względnych ścieżek:
   ```astro
   // ❌ BŁĄD
   import Header from '@components/Header.astro';
   
   // ✅ POPRAWNIE
   import Header from '../components/Header.astro';
   ```
3. Upewnij się, że wielkość liter jest zgodna: `Header.astro` ≠ `header.astro`

---

### 3. **Blank Page / Biała Strona Po Deployu**

**Przyczyna:** CSS/JS nie są ładowane lub błędy w ścieżkach.

**Rozwiązanie:**
1. Sprawdź `astro.config.mjs`:
   ```javascript
   export default defineConfig({
     output: 'static',  // ← Musi być 'static'
     integrations: [tailwind()],
     build: {
       inlineStylesheets: 'never'  // ← Wymusza zewnętrzne CSS
     }
   });
   ```

2. Usuń cache Cloudflare:
   - Idź do Settings → Caching
   - Kliknij "Purge Everything"

3. Sprawdź console przeglądarki (F12):
   - Szukaj błędów 404 (Not Found)
   - Sprawdź ścieżki do CSS i JS

---

### 4. **Błąd: "pnpm install failed" lub "npm install failed"**

**Przykład:**
```
Error: Command failed: pnpm install
```

**Przyczyna:** Konflikt zależności lub brak `package.json`.

**Rozwiązanie:**
1. Sprawdź czy w `package.json` masz TYLKO Astro i Tailwind:
   ```json
   {
     "dependencies": {
       "@astrojs/tailwind": "^5.1.4",
       "astro": "^4.16.18",
       "tailwindcss": "^3.4.17"
     }
   }
   ```

2. **USUŃ** wszelkie zależności Next.js i React:
   ```json
   // ❌ USUŃ TO:
   "next": "16.1.1",
   "react": "19.2.3",
   "react-dom": "19.2.3"
   ```

3. Zatwierdź zmiany i ponownie deploy:
   ```bash
   git add package.json
   git commit -m "fix: remove Next.js dependencies"
   git push
   ```

---

### 5. **Błąd: "Build exceeded time limit"**

**Przyczyna:** Build trwa zbyt długo (limit 20 min na Free tier).

**Rozwiązanie:**
1. Zmniejsz liczbę zależności
2. Usuń nieużywane komponenty
3. Rozważ upgrade planu Cloudflare (Pro ma limit 30 min)

---

## 📊 Gdzie Sprawdzić Logi

### Cloudflare Pages Dashboard:

1. **Deployment Logs:**
   - Przejdź do `Workers & Pages` → `[Nazwa projektu]`
   - Kliknij na ostatni deployment
   - Sekcja `View build logs` - tutaj znajdziesz szczegółowe logi budowania

2. **Co szukać w logach:**
   ```
   ✅ SUKCES:
   12:09:09 [build] ✓ Completed in 107ms
   12:09:09 [build] Building static entrypoints...
   ✓ Built in 532ms
   
   ❌ BŁĄD:
   12:09:09 [ERROR] [vite] x Build failed in 532ms
   Expected ">" but found "class"
   ```

3. **Real-time Function Logs:**
   - (Nie dotyczy statycznego Astro, ale przydatne dla SSR)
   - Sekcja `Real-time Logs` w dashboardzie

---

## ✅ Checklist Przed Deploymentem

### Przed każdym push do Git:

- [ ] **Sprawdź składnię wszystkich .astro plików** (szukaj niezamkniętych tagów)
- [ ] **Uruchom lokalnie `npm run build`** i sprawdź czy build się powiódł
- [ ] **Sprawdź `package.json`**:
  - [ ] Brak Next.js, React w dependencies
  - [ ] Jest Astro i Tailwind
- [ ] **Sprawdź `astro.config.mjs`**:
  - [ ] `output: 'static'`
  - [ ] `integrations: [tailwind()]`
- [ ] **Sprawdź ścieżki importów**:
  - [ ] Używasz względnych ścieżek (`../components/Header.astro`)
  - [ ] Wielkość liter jest zgodna z nazwami plików

---

## 🔍 Debugging Workflow

### Gdy deploy się nie powiedzie:

1. **Przeczytaj logi** w Cloudflare Pages dashboard
2. **Znajdź pierwszy błąd** (często są powiązane błędy - szukaj pierwszego)
3. **Sprawdź plik i linię** wskazaną w błędzie
4. **Popraw lokalnie** i przetestuj `npm run build`
5. **Commit i push** jeśli lokalnie działa
6. **Monitoruj nowy deployment** w Cloudflare

---

## 🚨 Emergency: Jak Wrócić do Poprzedniej Wersji

Jeśli deployment kompletnie nie działa:

1. Przejdź do `Workers & Pages` → `[Projekt]` → `Deployments`
2. Znajdź ostatni działający deployment (zielony status)
3. Kliknij `...` → `Rollback to this deployment`
4. Potwierdź rollback

---

## 📞 Ostatnia Deska Ratunku

Jeśli nic nie działa:

1. **Sprawdź Cloudflare Status:** https://www.cloudflarestatus.com/
2. **Usuń projekt i stwórz od nowa** z czystymi ustawieniami
3. **Skontaktuj się z supportem Cloudflare:**
   - Community: https://community.cloudflare.com/
   - Ticket support (dla płatnych planów)

---

**Powodzenia! 🚀**
