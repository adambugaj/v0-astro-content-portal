# Instrukcja: Dodawanie SVG Avatarów do Projektu Astro

## Problem i Rozwiązanie

SVG avatary nie wyświetlają się, ponieważ plik komponentu próbuje importować SVG bezpośrednio jako tekst. W Astro należy używać prawidłowych ścieżek i typów.

## Kroki Dodawania SVG Avatara

### 1. Przechowaj SVG w folderze `/public`
```
public/
  avatars/
    monika-zielinska.svg
    dariusz-nowicki.svg
```

### 2. Użyj w komponencie Astro

```astro
---
// src/components/AuthorAvatar.astro
const { name, imagePath } = Astro.props;
---

<div class="flex items-center gap-3 p-4 bg-stone-100 rounded-lg">
  <img 
    src={imagePath || "/placeholder.svg"} 
    alt={name}
    class="w-12 h-12 rounded-full object-cover"
  />
  <div>
    <p class="font-semibold text-zinc-700">{name}</p>
    <p class="text-xs text-zinc-600">Redaktor</p>
  </div>
</div>
```

### 3. Importuj w stronach artykułów

```astro
---
import AuthorAvatar from '../../components/AuthorAvatar.astro';
---

<AuthorAvatar 
  name="Dariusz Nowicki" 
  imagePath="/avatars/dariusz-nowicki.svg"
/>
```

## Prawidłowe Ścieżki

- **W HTML/Astro**: `/avatars/nazwa.svg` (zaczyna się od /)
- **W CSS**: `url(/avatars/nazwa.svg)`
- **NIE UŻYWAJ**: względnych ścieżek (`./avatars/...`) lub importów ES6

## SVG Best Practices

1. **Rozmiar**: Optymalizuj SVG do ~5-20KB
2. **ViewBox**: Zawsze dodaj `viewBox="0 0 200 200"`
3. **Alt Text**: Zawsze dodaj atrybut `alt=""` w tagu `<img>`
4. **Responsywność**: Używaj CSS do skalowania
   ```css
   img {
     max-width: 100%;
     height: auto;
   }
   ```

## Favicon SVG

```astro
<!-- w head w BaseLayout.astro -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

## Troubleshooting

| Problem | Rozwiązanie |
|---------|------------|
| SVG nie ładuje się | Sprawdź ścieżkę - musi być `/public/...` bez `.` |
| SVG się ładuje ale jest biały | Sprawdź atrybuty `fill` w SVG |
| Slow loading | Zoptymalizuj SVG w SVGO lub TinyURL |
