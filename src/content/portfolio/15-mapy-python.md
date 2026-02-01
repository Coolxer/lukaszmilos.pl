---
slug: automatyzacja-wizualizacji-danych-mapy-python
meta:
  title: Automatyczna wizualizacja danych statystycznych na mapach
  description: Jak wygenerować 242 mapy statystyczne zamiast zatrudniać grafika? Automatyzacja wizualizacji danych w Python z GeoPandas i AI.
title: Automatyczna wizualizacja danych na mapach – 242 wykresy w kilka chwil zamiast tygodni pracy grafika
problem: Konieczność ręcznego stworzenia setek map z danymi statystycznymi, co generowałoby ogromne koszty i czas pracy grafika.
target: Stworzenie skryptu generującego estetyczne wizualizacje mapowe dla ponad 200 zestawów danych w sposób automatyczny.
result: Wygenerowanie 242 gotowych do publikacji map z podziałem na katalogi, oszczędność budżetu klienta i czasu realizacji.
image:
  alt: Automatyzacja wizualizacji danych na mapach Polski
  src: portfolio/wizualizacja-danych-mapy-python.webp
category: automatyzacja
video: https://www.youtube.com/embed/hwUet0zNCWU?si=hrO17r1g0tTDwTgH
date: 2026-01-25
draft: false
---

## Wstęp

W tym case-study opisuję projekt polegający na masowym przetwarzaniu danych liczbowych na gotowe grafiki mapowe. Zamiast ręcznej pracy w programach graficznych, wykorzystałem moc programowania i bibliotek Pythona. Materiał wideo omawiający ten proces znajdziesz powyżej.

## Geneza

Klient potrzebował nałożyć konkretne dane statystyczne na mapę Polski, a dokładniej na specyficzne "subregiony" składające się z poszczególnych powiatów. Celem było uzyskanie estetycznej wizualizacji danych liczbowych dla każdego z tych obszarów, aby pokazać wyniki konkretnych badań/ankiet.

Głównym wyzwaniem była skala. Do przygotowania było około 250 oddzielnych map (różne pytania, kategorie). Zlecenie tego zadania grafikowi wiązałoby się z:

1. Bardzo długim czasem realizacji.
2. Wysokim ryzykiem pomyłek przy przepisywaniu liczb.
3. Ogromnymi kosztami pracy manualnej.

Zdecydowaliśmy się na podejście skryptowe – automatyzację procesu, która pozwoli zaoszczędzić czas i budżet.

## Jak działa rozwiązanie?

Całość została oparta o język **Python** oraz specjalistyczne biblioteki do obsługi danych i geolokalizacji: **Pandas, GeoPandas, Matplotlib oraz Shapely**. Wspomagałem się również sztuczną inteligencją do szybkiego czyszczenia danych wejściowych.

Proces wyglądał następująco:

### 1. Przygotowanie danych (AI + Parser)

Dane od klienta przyszły w formacie XLSX, który nie był ustrukturyzowany pod kątem maszynowym (dużo wolnych przestrzeni, formatowanie wizualne). Zamiast przepisywać je ręcznie lub pisać skomplikowane reguły od zera, wykorzystałem AI do konwersji danych bezpośrednio na tablicę w pythonie.

### 2. Obsługa map (GeoJSON)

Kluczowym elementem było znalezienie odpowiedniego pliku mapy (GeoJSON) zawierającego granice wszystkich powiatów w Polsce. Skrypt musiał łączyć te powiaty w zdefiniowane przez klienta "subregiony", aby stworzyć odpowiednie obszary na mapie.

### 3. Generowanie grafik (Pętla w Pythonie)

Skrypt działa w pętli dla każdego zestawu danych:

- Pobiera dane dla konkretnego wiersza (kategorii/pytania).
- Dopasowuje odpowiednie regiony na mapie.
- Generuje wykres/mapę przy użyciu biblioteki Matplotlib.
- Nakłada style: kolory (ostatecznie odcienie niebieskiego), legendę, tytuły oraz etykiety z wartościami liczbowymi.
- Zapisuje gotowy plik PNG w odpowiedniej strukturze folderów (kategoria -> podkategoria).

## Problemy i wyzwania, które rozwiązaliśmy

To nie był projekt typu "uruchom i zapomnij". Wymagał kilku iteracji i rozwiązywania nietypowych problemów:

### "Dziury" w mapach

Okazało się, że podstawowe pliki mapowe zawierały tylko powiaty ziemskie. Miasta na prawach powiatu (które również należały do subregionów) nie były uwzględnione w pliku źródłowym, co powodowało powstawanie "białych dziur" na generowanych mapach.
**Rozwiązanie:** Wykorzystanie biblioteki `Shapely` do manipulacji geometrią i programowe "wypełnienie" brakujących obszarów wielokątami (poligonami), aby mapa była spójna.

### Pozycjonowanie etykiet i czytelność

Automatyczne umieszczanie napisów na mapach o nieregularnych kształtach jest trudne. Etykiety niekiedy na siebie nachodziły lub były poza obszarem.
**Rozwiązanie:** Dopracowanie wielkości czcionek i poyzcji etykiet metodą prób i błędów.

### Estetyka

Początkowe wersje były czysto techniczne (surowe kolory). Klient potrzebował materiałów gotowych do prezentacji.
**Rozwiązanie:** Zdefiniowanie spójnej palety barw, dodanie czytelnych legend i tytułów bezpośrednio w kodzie generującym wykres.

## Wynik

Uruchomienie finalnej wersji skryptu zajmuje chwilę, a efektem jest **242 plików graficznych**.

Każdy plik jest:

- Przypisany do odpowiedniego katalogu tematycznego.
- Opisany i sformatowany w spójnym stylu.
- Wolny od błędów "przepisywania" (dane są pobierane bezpośrednio ze źródła).

## Podsumowanie

Ten projekt to doskonały przykład na to, że Python i automatyzacja sprawdzają się nie tylko przy "mieleniu danych" w Excelu, ale także w zadaniach kreatywnych i graficznych.

Dzięki podejściu programistycznemu klient otrzymał gotowy produkt wielokrotnie szybciej i taniej niż w przypadku tradycyjnej pracy grafika, a ewentualna aktualizacja danych wymaga teraz jedynie podmienienia pliku CSV i ponownego uruchomienia skryptu.
