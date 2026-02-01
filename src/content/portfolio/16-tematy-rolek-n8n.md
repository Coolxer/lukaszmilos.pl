---
slug: automatyzacja-research-tematy-rolek
meta:
  title: Automatyzacja n8n researchu i generowania tematów do rolek
  description: System automatycznie badający potrzeby klientów, sprawdzający realne zapytania w Google i generujący siatkę 15 tematów wideo na 5 poziomach świadomości.
title: Automatyczny research i generacja tematów wideo – od persony do siatki 15 pomysłów na rolki
problem: Brak pomysłów na treści wideo, które faktycznie odpowiadają na potrzeby klientów i są wyszukiwane w Google. Ręczny research zajmuje godziny.
target: Stworzenie systemu, który na podstawie opisu branży i persony klienta wykona research SEO i wygeneruje strategiczną listę tematów.
result: Automatyzacja generująca 15 dopasowanych tematów (edukacja, viral, sprzedaż) opartych o realne dane z Google, gotowych do dalszej obróbki.
image:
  alt: Automatyzacja tworzenia tematów rolek
  src: portfolio/automatyzacja-n8n-tematy-rolek.webp
category: automatyzacja
video: https://www.youtube.com/embed/eMz75siE9Yk?si=9vXCP7pKQhkEeJYQ
date: 2026-30-01
draft: false
---

## Wstęp

W tym case-study przedstawiam pierwszą część systemu do automatyzacji produkcji wideo. Zanim zaczniemy pisać scenariusze, musimy wiedzieć, o czym w ogóle mówić. Ten moduł odpowiada za **strategiczny research**. System nie "zgaduje" tematów, ale opiera je na analizie persony klienta oraz realnych danych z wyszukiwarki Google.

## Geneza

Klient wiedział, do kogo chce mówić (miał opisaną branżę i personę), ale brakowało mu pomysłów na konkretne nagrania, uwzględniając to, czego ludzie faktycznie szukają w sieci.

Kluczowe było oparcie się na **poziomach świadomości klienta** (Awareness Levels) – od klienta, który nie wie, że ma problem, po takiego, który jest gotowy do zakupu.

## Jak działa automatyzacja?

Proces jest sterowany z poziomu **Google Sheets** i obsługiwany przez **n8n** przy wsparciu **Google Apps Script** (do obsługi webhooków) oraz API **Serper.dev** (dane z Google) i **OpenAI**.

Użytkownik wypełnia w arkuszu dane:

- Opis Persony (Buyer Persona)
- Branża
- Główna oferta

Po zmianie statusu na "Generuj", uruchamia się wieloetapowy proces:

### Krok 1: Wstępna analiza i generowanie hipotez (AI Research)

System, działając jako doświadczony strateg, analizuje dane wejściowe. Wyodrębnia:

- 3 główne bóle klienta.
- 3 główne obiekcje.
- Listę 10-20 hipotez: "co taki klient może wpisywać w Google?".

### Krok 2: Weryfikacja danych (Real SEO Research)

Najlepsze hipotezy (pytania) z kroku pierwszego trafiają do API **Serper.dev**. System sprawdza:

- Jakie są realne wyniki wyszukiwania (Organic Results).
- Sekcję "People Also Ask" (Ludzie pytali również) – to kopalnia gotowych tematów.
- Powiązane zapytania.

To kluczowy moment – nie bazujemy na "halucynacjach" AI, ale na twardych danych o tym, co interesuje ludzi.

### Krok 3: Tworzenie siatki tematów (Strategia)

Mając dane o personie i wyniki researchu, system generuje finalną listę tematów. Tworzy siatkę **15 pomysłów** dla każdego wiersza wejściowego, podzieloną według matrycy:

**3 Typy treści:**

1.  Edukacyjne (Wartość)
2.  Viralowe (Zasięg)
3.  Sprzedażowe (Konwersja)

**5 Poziomów świadomości:**

1.  Nieświadomy (Unaware)
2.  Świadomy problemu (Problem Aware)
3.  Świadomy rozwiązania (Solution Aware)
4.  Świadomy produktu (Product Aware)
5.  Najbardziej świadomy (Most Aware)

## Wyzwania i rozwiązania

### Problem z triggerem w Google Sheets

Standardowy moduł "Watch Rows" w n8n uruchamiał się zbyt wcześnie – zanim użytkownik zdążył wpisać wszystkie dane w wierszu.
**Rozwiązanie:** Napisanie niestandardowego skryptu w Google Apps Script, który wysyła webhooka do n8n dopiero w momencie, gdy użytkownik świadomie zmieni status w kolumnie na "Generuj".

### Ograniczenia lokalizacji w API

Mieliśmy problem z uzyskaniem sekcji "People Also Ask" dla lokalizacji ustawionej na Polskę w API Serper.dev.
**Rozwiązanie:** Testy wykazały, że ustawienie lokalizacji na "US" przy zachowaniu języka polskiego pozwala skutecznie pobrać te cenne dane, zachowując trafność zapytań.

## Wynik

Po kilku minutach pracy systemu, użytkownik otrzymuje w arkuszu "Gotowe Tematy" listę 15 strategicznie dobranych pomysłów. Każdy rekord zawiera:

- Tytuł tematu.
- Typ (np. Edukacja).
- Poziom świadomości.
- Krótkie wyjaśnienie "dlaczego ten temat".
- Przepisane dane o personie (potrzebne do kolejnego etapu – generowania skryptów).

## Podsumowanie

Ta automatyzacja eliminuje zgadywanie w marketingu. Zamiast zastanawiać się "co by tu nagrać", otrzymujemy gotowy plan treści, który jest zakorzeniony w realnych potrzebach rynku (SEO) i dopasowany do psychologii sprzedaży (poziomy świadomości). To solidny fundament pod dalszą pracę – czyli generowanie konkretnych scenariuszy.
