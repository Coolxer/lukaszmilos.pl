---
meta:
  title: Napisałem własny program CAM przy pomocy AI! (Python)
  description: Zobacz, jak stworzyłem prosty generator G-code z plików DXF w Pythonie z pomocą AI (Claude Code). Zapomnij o ręcznym klikaniu we FreeCAD!
  canonical: /wlasny-program-cam-python-ai
  noindex: false
  nofollow: false
heading: Napisałem własny program CAM przy pomocy AI w kilka godzin!
subheading: Jak ułatwiłem sobie tworzenie  plików na grawerkę CNC pod skale aluminiowe?
leading: 'Kto ma frezarkę CNC, ten wie, jak wygląda rzeczywistość: kupujesz maszynę (w moim przypadku hobbystyczne CNC 3018 MAX), chcesz szybko wygrawerować prostą tabliczkę z aluminium, a logistyka oprogramowania zjada Ci pół wieczoru. Zamiast męczyć się ze skomplikowanymi, powolnymi programami, postanowiłem stworzyć własny, minimalistyczny generator G-code w Pythonie z pomocą AI. Oto jak działa i dlaczego oszczędza mi masę czasu.'
image:
  src: /images/blog/12.09.2025 miniatury.webp
  alt: Własny program CAM do grawerowania skal aluminiowych i nie tylko na cnc 3018 max
video: ''
categories:
  - cyfryzacja
  - automatyzacja
relatedPosts:
  - automatyzacja-wyceny-i-projektowania-konstrukcji-z-blach-konfigurator-3d
  - jak-zautomatyzowac-wycene-i-projektowanie-interaktywny-konfigurator-giecia-drutu-w-praktyce
date: 2026-07-13
draft: false
---

```markdown
## Dlaczego zrezygnowałem z gotowych programów CAM?

Szukając prostego generatora ścieżek, przetestowałem wiele rozwiązań dostępnych w sieci. Programy komercyjne są drogie i przekombinowane do prostych prac hobbystycznych. Oprogramowanie dedykowane do projektowania płytek PCB również mi nie leżało, a sieciowy *OpenBuilds CAM* miał wieczne problemy z poprawnym interpretowaniem moich plików DXF. 

Potrzebowałem narzędzia, które będzie robić tylko to, czego od niego wymagam, ale za to w ekspresowym tempie. Postawiłem na pełną automatyzację najnudniejszych procesów.

---

## Projektowanie własnego generatora G-code z AI

Dzięki wsparciu AI i środowiska **Cloud Code** mogłem skupić się na architekturze logicznej programu, podczas gdy generowanie kodu interfejsu (napisanego w Pythonie) przebiegało niemal automatycznie. Mój program opiera się na trzech najważniejszych filarach:

### 1. Automatyczne mapowanie warstw z pliku DXF
To funkcja, która oszczędza najwięcej czasu. Program automatycznie rozpoznaje nazwy warstw z programu CAD (np. LibreCAD). Jeśli nazwę warstwę `grawer`, soft sam wie, że ma tam wrzucić operację grawerowania. Warstwa oznaczona jako `otwor_wew` automatycznie otrzymuje parametry profilowania i wycinania po wewnętrznej krawędzi wektora.

### 2. Globalna biblioteka narzędzi i parametrów
We FreeCADzie brakowało mi łatwo dostępnych, globalnych profili. Tutaj raz definiuję parametry frezów i wierteł (prędkości posuwu, maksymalne zagłębienie na jeden krok) i program pamięta je na stałe przy każdym kolejnym projekcie.

### 3. Szybki symulator ścieżek 2D
Zamiast czekać na renderowanie skomplikowanych grafik 3D, mój program posiada bardzo lekki podgląd linia po linii. Pokazuje on w czasie rzeczywistym ruchy maszyny na płaszczyznach $X$ i $Y$ oraz precyzyjnie wylicza szacowany czas pracy grawerki.

---

## Co ma w środku ten "potworek"?

Interfejs użytkownika (UI) – umówmy się – nie dostanie nagrody Apple Design Award. Jest surowy, generowany częściowo przez sztuczną inteligencję (łącznie z ikonkami narzędzi, które w pierwszej iteracji wyszły dość... zabawnie). Ale nie o wygląd tu chodziło, a o funkcjonalność.

Program posiada również **pełny profil maszyny**. System pilnuje limitów osi $X$, $Y$ oraz $Z$, dbając o to, żebym przypadkiem nie wbił się frezem w aluminiowy stół teowy grawerki. Co ciekawe, całkowicie wyciąłem z poziomu kodu zbędne dla mnie komendy startu i stopu wrzeciona ($M3$ / $M5$), ponieważ obrotami silnika steruję ręcznie z poziomu fizycznego kontrolera maszyny. FreeCAD zawsze wciskał mi je na siłę do pliku wyjściowego.

---

## Live debugging, czyli uroki szybkiego kodowania

Żeby nie było zbyt pięknie – program pisałem i modyfikowałem dosłownie chwilę przed nagraniem filmu prezentującego jego działanie. Podczas eksportu testowego pliku aplikacja wypluła błąd pozycjonowania i wyjścia poza bezpieczny obrys (wjechała na wartości ujemne na osi $Z$). 

Czy to porażka? Skąd! To urok projektów tworzonych na własne potrzeby w kilka godzin. Szybka zmiana w ustawieniach pozycjonowania aplikacji, drobna korekta przesunięcia bazy i plik `.nc` finalnie wylądował w kontrolerze, działając bez zarzutu. Kod jest spakowany do wygodnego pliku `.exe` i działa w 100% lokalnie na moim komputerze bez potrzeby połączenia z internetem.

---

*A jak to wygląda u Was? Męczycie się w wielkich kombajnach CAM do prostych robót, czy też szukacie prostszych alternatyw na własne potrzeby? Dajcie znać w komentarzach pod artykułem!*
```
