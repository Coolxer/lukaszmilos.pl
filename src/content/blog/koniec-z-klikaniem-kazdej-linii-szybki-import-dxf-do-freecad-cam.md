---
slug: szybki-import-dxf-freecad-cam
meta:
  title: Szybki import DXF do FreeCAD CAM - Metoda Draft to Sketch
  description: Dowiedz się, jak poprawnie importować pliki DXF do FreeCAD CAM. Wykorzystaj trik Draft to Sketch i przestań ręcznie klikać setki linii!
  canonical: https://lukaszmilos.pl/blog/szybki-import-dxf-freecad-cam/
  noindex: false
  nofollow: false
heading: Koniec z klikaniem każdej linii! Szybki import DXF do FreeCAD CAM
subheading: Sprawdzona metoda "Draft to Sketch", która drastycznie skróci Twój czas pracy.
leading: Przejście od rysunku 2D (np. z darmowego LibreCAD-a) do gotowego kodu G-code bywa we FreeCAD frustrujące – zwłaszcza jeśli musisz ręcznie klikać każdą pojedynczą linię z osobna na ekranie. Na szczęście udało mi się wypracować i zoptymalizować proces, który dzięki sprytnemu przygotowaniu warstw oraz konwersji obiektów drastycznie skraca ten czas. Zobacz, jak zrobić to poprawnie krok po kroku.
image:
  src: freecad-cam.webp
  alt: Freecad, import dxf
video: ''
categories:
  - cyfryzacja
relatedPosts: []
date: 2026-07-13
draft: false
---

## Krok 1: Prawidłowe przygotowanie DXF w programie CAD (np. LibreCAD)

Cały sekret udanej pracy we FreeCAD tkwi w tym, co zrobisz z plikiem jeszcze przed jego importem. Pracując w programie 2D CAD (ja używam darmowego LibreCAD-a), musisz zadbać o cztery kluczowe rzeczy:

### Podział na warstwy (Layers)
To absolutny fundament. Podziel rysunek według planowanych operacji. Stwórz osobne warstwy np. `grawer`, `obrys`, `otwory`. Dzięki temu FreeCAD od razu zgrupuje te obiekty po zaimportowaniu pliku.

### Usunięcie podwójnych linii
Upewnij się, że linie nie nakładają się na siebie w miejscach łączeń. Nakładające się wektory to najczęstszy powód błędów generowania ścieżek narzędzia w programach CAM.

### Rozbicie liter (Explode)
Standardowy tekst CAD to dla środowiska CAM czarna magia. Zaznacz wszystkie napisy i liczby, a następnie użyj narzędzia **Modify ➡️ Explode**. Dzięki temu litery zostaną zamienione na pojedyncze, łatwe do odczytania segmenty linii i łuków.

### Zamknięcie obrysu zewnętrznego
Aby wyciąć element po zewnętrznej krawędzi, linia obrysu musi być w pełni zamknięta. W LibreCAD możesz to zrobić za pomocą opcji tworzenia polilinii z istniejących segmentów (**Create Polyline from Existing Segments**).

---

## Krok 2: Import i konwersja "Draft to Sketch" we FreeCAD

Gdy masz już gotowy plik DXF, otwórz FreeCAD i stwórz nowy dokument.

1. Przełącz się na środowisko pracy **Draft** (Projektowanie Draft).
2. Wybierz **Plik ➡️ Importuj** i wskaż swój plik DXF.
3. Zamiast męczyć się z surową, zaimportowaną warstwą, rozwiń ją w drzewie projektu, kliknij na sam obiekt graficzny (np. grawer), a następnie wybierz z górnego menu opcję **Modification ➡️ Draft to Sketch** (Draft na szkic).

**Dlaczego to takie ważne?** Ta prosta funkcja zamienia całą warstwę DXF w jeden czytelny szkic (Sketch) w drzewie projektu. Od tej pory moduł CAM będzie traktował te linie jako jeden spójny obiekt zbiorczy, a Ty nie będziesz musiał klikać każdego elementu z osobna podczas tworzenia operacji! Powtórz ten proces dla wszystkich warstw (`obrys` i `otwory`).

---

## Krok 3: Konfiguracja modułu CAM i generowanie ścieżek

Przechodzimy do środowiska **CAM** (w starszych wersjach programu znanego jako *Path*).

1. Kliknij **New Job** (Nowe zadanie obróbcze) i z listy obiektów wybierz nowo utworzone szkice (np. `grawer001`, `obrys001`, `otwory001`).
2. Ustaw parametry materiału bazowego (Stock) – jeśli grawerujesz cienkie, płaskie blaszki aluminiowe, możesz ustawić naddatki osi $Z$ na $0$, a pozycję startową od samej góry ($Z = 0$).
3. Dodaj odpowiednie narzędzia z biblioteki (np. frez grawerski typu V-bit oraz frez palcowy do wycinania) i zdefiniuj ich podstawowe prędkości robocze.

### 1. Generowanie graweru (Engrave)
Wybierz operację grawerowania, przypisz odpowiedni frez i po prostu wskaż cały szkic `grawer001`. Ponieważ wcześniej wykonaliśmy "Draft to Sketch", program automatycznie przypisze wszystkie linie tekstu i skali do jednej operacji! Pozostaje tylko ustawić głębokość końcową (np. finalna głębokość na `-0.2 mm`) i kliknąć *Apply*.

### 2. Wycinanie obrysu (Sztuczka z "Face from Wires")
Czasami FreeCAD stawia opór i nie chce wygenerować ścieżki profilu zewnętrznego bezpośrednio ze szkicu obrysu. Jeśli masz z tym problem, oto szybkie, niezawodne obejście:
1. Przejdź na chwilę do środowiska **Part**.
2. Zaznacz szkic obrysu i wybierz funkcję **Make face from wires** (Utwórz powierzchnię z linii).
3. Wróć do modułu CAM, dodaj tę nowo utworzoną płaszczyznę (Face) jako obiekt do swojego zadania (Job Edit ➡️ Add) i na jej bazie stwórz operację **Profile** (Profilowanie zewnętrzne). Ścieżka wygeneruje się bezbłędnie!

### 3. Wiercenie otworów
Na koniec zaznacz otwory (trzymając klawisz Ctrl) i stwórz dla nich operację profilu wewnętrznego lub kieszeni (Pocket), aby wyciąć je na wylot (dodając niewielki naddatek przejścia przez materiał w dół osi $Z$).

---

## Krok 4: Postprocessing i eksport G-code

Gdy wszystkie ścieżki na podglądzie 3D wyglądają prawidłowo, zaznacz całe zadanie (Job) i kliknij przycisk **Post Process** (Postprocesor). FreeCAD wygeneruje czysty plik `.nc` (kod G-code), który możesz bezpośrednio załadować do swojej grawerki CNC.

Dzięki temu procesowi nie tylko oszczędzasz mnóstwo czasu, ale też masz pewność, że wszystkie operacje są spójne, a ryzyko pominięcia jakiejś linii podczas ręcznego klikania spada do zera.
