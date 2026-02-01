---
slug: automatyzacja-tworzenia-skryptow-reels-tiktok
meta:
  title: Automatyzacja n8n tworzenia skryptów do rolek (Reels/TikTok)
  description: Jak zautomatyzować pisanie scenariuszy do social media? System generujący 3 warianty skryptów (Hook, Treść, CTA) z jednego tematu w Google Sheets.
title: Automatyczne tworzenie scenariuszy rolek (Reels/TikTok) – od surowego pomysłu do gotowego skryptu w kilka sekund
problem: Czasochłonny proces rozpisania ogólnych pomysłów na konkretne, gotowe do nagrania scenariusze wideo o odpowiedniej strukturze.
target: Stworzenie narzędzia, które na podstawie tematu i wybranego celu (np. sprzedaż, wiral) wygeneruje gotowe skrypty z podziałem na sceny.
result: System generujący 3 warianty kompletnego scenariusza (Tytuł, Hook, Treść, CTA) w mniej niż minutę, bezpośrednio w Google Sheets.
image:
  alt: Automatyzacja n8n tworzenia skryptów wideo do social media
  src: portfolio/automatyzacja-n8n-skrypty-reels.webp
category: automatyzacja
video: https://www.youtube.com/embed/_Sq7ep-rpxw?si=UvHq5po0PqeczqK1
date: 2026-02-01
draft: false
---

## Wstęp

W tym case-study omawiam drugą część większego systemu automatyzacji marketingu wideo. Podczas gdy pierwsza część zajmowała się generowaniem pomysłów, tutaj skupiamy się na "mięsie" – czyli zamianie ogólnego tematu w konkretny scenariusz nagrania (skrypt). Cały proces odbywa się w tle, a użytkownik zarządza nim z poziomu znanego arkusza kalkulacyjnego.

## Geneza

Projekt powstał jako odpowiedź na potrzebę usprawnienia procesu produkcji krótkich form wideo (TikTok, Instagram Reels, YouTube Shorts).

Celem nie była automatyczna publikacja, ale stworzenie **materiału koncepcyjnego**, który można zabrać prosto na plan nagraniowy. System miał dostarczać gotową strukturę: Haczyk (Hook), Rozwinięcie i Wezwanie do działania (CTA), uwzględniając różne cele marketingowe.

## Jak działa automatyzacja?

Sercem systemu jest integracja **Google Sheets** z **n8n** oraz modelami językowymi **OpenAI**.

### Logika działania

Użytkownik w arkuszu "Konfigurator" wybiera cel (np. Sprzedaż), format i zmienia status na "Generuj". W tym momencie uruchamia się skrypt (AppScript), który wysyła dane do n8n (webhook).

Automatyzacja w n8n wykonuje następujące kroki:

1.  Odbiera dane (Temat + Cel + Format).
2.  Przesyła je do AI wraz z rozbudowanym promptem systemowym.
3.  Generuje **3 unikalne warianty** scenariusza dla danego tematu.
4.  Zapisuje wyniki w zakładce "Scenariusze".
5.  Wraca do zakładki "Konfigurator" i zmienia status zadania na "Gotowe".

## Kluczowe elementy rozwiązania

### 1. Inżynieria Promptów (System Prompt)

To najważniejszy element układanki. Prompt systemowy definiuje precyzyjnie rolę AI. Musi ono:

- Trzymać się limitu czasu (np. skrypt na max 60 sekund).
- Zastosować strukturę: Mocny Hook -> Wartościowa treść -> CTA (w dwóch wariantach).
- Dostosować styl wypowiedzi do wybranego celu (inny język dla sprzedaży, inny dla wiralu).
- Zwrócić dane w formacie łatwym do sparsowania przez automatyzację.

### 2. Wybór formatu i celu

Zamiast generować losowe treści, użytkownik ma kontrolę. Może zdecydować, że dany temat ma sprzedawać produkt, a inny ma tylko budować zasięg. Automatyzacja dostosowuje treść skryptu do tego wyboru.

### 3. Struktura danych wyjściowych

Wygenerowany skrypt nie jest blokiem tekstu. Jest podzielony na kolumny:

- **Tytuł roboczy**
- **Hook** (pierwsze 3 sekundy)
- **Główne punkty do powiedzenia** (treść właściwa)
- **CTA Wariant 1** (np. zapisz na później)
- **CTA Wariant 2** (np. kup teraz)

Dzięki temu twórca wideo ma jasność co do struktury nagrania.

## Podsumowanie

Dzięki tej automatyzacji proces, który zajmował godziny (wymyślanie jak ugryźć temat, pisanie wstępu, zastanawianie się nad zakończeniem), trwa sekundy. Użytkownik klika przycisk i otrzymuje 3 gotowe propozycje, z których może od razu wybrać najlepszą i zacząć nagrywać. To idealny przykład współpracy człowieka (decyzja, nagranie) z AI (struktura, kreatywność, brudna robota pisarska).
