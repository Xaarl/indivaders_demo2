# Dokumentacja Architektury: Wersja v7 (Unified Experience)

Niniejszy dokument opisuje strukturę i decyzje projektowe podjęte podczas konsolidacji i unifikacji wersji deweloperskiej v7 na branchu `codex/refractured-v7-unified`.

---

## 1. Uruchomienie i Lokacja Środowiska
* **Katalog roboczy:** `G:/Game Dev/Indievaders/.worktrees/refractured-v7-unified`
* **Port Dev:** `5185` (adres lokalny: [http://127.0.0.1:5185/](http://127.0.0.1:5185/))
* **Weryfikacja kodu:** Polecenie `npm run verify` przechodzi w 100% (sukces kompilacji ESLint oraz budowania produkcyjnego Vite).

---

## 2. Architektura i Przepływ Nawigacji (User Flow)

Zaimplementowaliśmy wspólny, zintegrowany model nawigacji za pomocą komponentu `GlobalNavbar.jsx` (wyświetlanego na publicznych stronach: Stronie Głównej, Prezentacji Metodologii oraz Przykładowym Raporcie).

```
   Strona Główna (/)  <--->  Jak to Działa (#prototype/refractured-flow)  <--->  Przykładowy Raport (#client-report/refractured)
         |
         v
   Intake Form (#order-report)  --->  Workspace Klienta (#workspace/:id)
```

Wszystkie trasy raportów i prototypów flow zostały w `App.jsx` skierowane na nowy, ujednolicony komponent `GuidedStoryReport.jsx`, dzięki czemu użytkownik widzi zawsze spójny motyw. Oryginalna strona `RefracturedReportPage.jsx` została zachowana jako nietknięta w tle, co gwarantuje pełną zgodność z testami komponentowymi SSR (`verify:refractured-components`).

---

## 3. Zrealizowane Ulepszenia Wizualne i Interaktywne

### A. Landing Page i Gra Hero (`Hero.jsx` & `landing.css`)
1. **Monochromatyczni Invaders:** Zastąpiliśmy jaskrawe, kolorowe sygnały (cyan, amber, blue) bardziej sleek i minimalistyczną, monochromatyczną paletą barw (odcienie bieli, srebra i szarości slate).
2. **Minimalistyczny Radar Sygnałów:** Usunęliśmy motyw "czarnej dziury" z sekcji Hero na stronie głównej. Zamiast niej w centrum umieściliśmy obracający się radar sygnałów / siatkę detektora o płynnym przejściu gradientowym (conical scanline).
3. **Paralaksa myszy w CSS:** Dodaliśmy organiczną głębię 3D za pomocą transformacji translate, wykorzystując już istniejące zmienne CSS `--mouse-x` i `--mouse-y` (mnożniki `-0.04` dla gwiazd i `-0.015` dla sygnałów).
4. **Skanowanie Tła (Brak pomarańczu/żółci):** Usunięto stare, ciepłe poświaty tła w sekcji Hero oraz na całej stronie głównej (`landing.css` i `body`), zastępując je głęboką czernią oraz nowoczesnymi poświatami błękitu i morskiego tealu.
5. **CTA w stylu Premium:** Główny przycisk "Open sample report" ma teraz czarne tło i neonową obwódkę teal, a po najechaniu świeci mocnym blaskiem.
6. **Usunięcie Zdublowanej Nawigacji:** Przestarzały pasek nawigacyjny w Hero został całkowicie ukryty w CSS na rzecz jednego, lepkiego (sticky) paska globalnej nawigacji na samej górze.

### B. Ujednolicony Raport Story Mode (`GuidedStoryReport.jsx`)
1. **Stars Trailing (Ogon Gwiezdny):** Kursor myszy na tle piaskownicy gwiezdnej przyciąga gwiazdy za sobą, tworząc efekt ogona/ciągnięcia się (gwiazdy nie są konsumowane przez kursor podczas zwykłego ruchu).
2. **Click-and-Hold Singularity (Czarna Dziura):** Kliknięcie i przytrzymanie przycisku myszy tworzy czarną dziurę o nieskończonym wzroście masy (usunięto limit wzrostu masy do 55). Gwiazdy krążą wokół niej po trajektoriach spiralnych i są wchłaniane po dotknięciu horyzontu zdarzeń. Płótno reaguje soczewkowaniem grawitacyjnym zakrzywiającym siatkę czasoprzestrzeni.
3. **Supernova Collapse Explosion (Wybuch):** Puszczenie przycisku myszy niszczy czarną dziurę, wywołując eksplozję cząsteczek supernova rozbiegających się we wszystkich kierunkach oraz rozchodzącą się falę uderzeniową ( spacetime shockwave).
4. **Pionowy Stack Opowieści (z portu 5181):** Pełny layout rozdziałów pionowych z `RefracturedStoryPrototype.jsx`, zastępujący stary układ konsoli/cockpitu i w pełni zintegrowany z interaktywnymi komponentami inline.
5. **Locking & Progress Flow (Unlocking z portu 5181):** Krok po kroku:
   * Czytanie rozdziałów i klikanie przycisków "Unlock Tool" w kartach sygnałów rozdziałów odblokowuje kolejne rozdziały oraz aktywuje powiązane widgety w tle.
   * Uruchomienie "Unlock Tool" odtwarza syntetyczny dźwięk odblokowania.
6. **Baza Dashboardów w Drawerach:** Sekcja "Unlocked workspace" na dole oraz aktywne przyciski w kartach rozdziałów umożliwiają wysunięcie z boku ekranu drawerów o pełnej szerokości (`min(1060px, 70vw)`) z głębokimi, gęstymi od informacji dashboardami (`ComparableExplorer`, `AudienceSignals`, `MarketMap`, `SteamPositioningBuilder`, `ActionPlanTimeline`).
7. **Brak Swobody Drawer vs Inline:** Usunięto deweloperski przełącznik i zaimplementowano jeden, dopracowany i spójny wizualnie system narracyjny.

---

## 4. Instrukcja dla Przyszłych Agentów i Deweloperów
* **Style:** Klasy piaskownicy i opowieści narracyjnej są zdefiniowane i udokumentowane w [refractured-story-prototype.css](file:///G:/Game%20Dev/Indievaders/.worktrees/refractured-v7-unified/src/styles/refractured-story-prototype.css) oraz [refractured-animation-sandbox.css](file:///G:/Game%20Dev/Indievaders/.worktrees/refractured-v7-unified/src/styles/refractured-animation-sandbox.css).
* **Nawigacja:** Przy edytowaniu tras w przyszłości pamiętaj, by dodawać je do tablicy `navLinks` w `GlobalNavbar.jsx` oraz dopisywać odpowiednią logikę w `App.jsx`.
