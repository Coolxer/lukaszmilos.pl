import cncImg from "@assets/images/pages/industry-cnc-v2.png";
import sharpeningImg from "@assets/images/pages/industry-sharpening-v2.png";
import furnitureImg from "@assets/images/pages/industry-furniture-v2.png";
import producerImg from "@assets/images/pages/industry-custom-v1.png";
import technicalImg from "@assets/images/pages/industry-technical-v1.png";
import otherImg from "@assets/images/pages/industry-b2b-v1.png";
import prototypingImg from "@assets/images/pages/industry-prototyping-v1.png";
import serviceImg from "@assets/images/pages/industry-service-v1.png";

export const industries = [
  {
    title: "CNC i obróbka",
    text: "Oferta oparta na procesach, możliwościach i danych potrzebnych do zapytania.",
    image: cncImg,
    link: "/oferta/cnc/",
    alt: "Ilustracja obrabiarki CNC i detalu",
    icon: "tabler:settings-2",
    menuDescription: "Procesy, pliki, zapytania",
  },
  {
    title: "Ostrzarnie i serwis narzędzi",
    text: "Jasny zakres usług, przyjęcie narzędzi i prostszy obieg informacji.",
    image: sharpeningImg,
    link: "/oferta/szlifiernie/",
    alt: "Ilustracja ostrzenia narzędzi",
    icon: "tabler:tool",
    menuDescription: "Usługi, przyjęcia, statusy",
  },
  {
    title: "Stolarnie i zakłady rzemieślnicze",
    text: "Realizacje, zapytania i ustalenia między projektem a wykonaniem.",
    image: furnitureImg,
    link: "/oferta/stolarnie/",
    alt: "Ilustracja pracy stolarskiej",
    icon: "tabler:armchair",
    menuDescription: "Realizacje, wymiary, warianty",
  },
  {
    title: "Mali producenci",
    text: "Oferta produktów, zapytania i proste narzędzia także dla producentów maszyn i przyrządów.",
    image: producerImg,
    link: "/oferta/mali-producenci/",
    alt: "Ilustracja małej produkcji",
    icon: "tabler:building-factory-2",
    menuDescription: "Produkty, maszyny, zamówienia",
  },
  {
    title: "Modelarnie i firmy prototypowe (druk 3D)",
    text: "Prezentacja możliwości, zapytania z plikiem lub szkicem i porządek w wersjach projektu.",
    image: prototypingImg,
    link: "/oferta/modelarnie-druk-3d/",
    alt: "Ilustracja drukarki 3D i prototypu",
    icon: "tabler:printer",
    menuDescription: "Modele, pliki, prototypy",
  },
  {
    title: "Firmy ogrodzeniowe",
    text: "Realizacje, zapytania z danymi o działce i ustalenia przed montażem.",
    image: serviceImg,
    link: "/oferta/ogrodzenia/",
    alt: "Ilustracja pracy firmy montażowej",
    icon: "tabler:fence",
    menuDescription: "Realizacje, zapytania, montaż",
  },
  {
    title: "Inne firmy techniczne",
    text: "Czytelny zakres usług, dane do zapytań i prostszy obieg informacji.",
    image: technicalImg,
    link: "/oferta/firmy-techniczne/",
    alt: "Ilustracja pracy firmy technicznej",
    icon: "tabler:tool",
    menuDescription: "Oferta, parametry, proces",
  },
  {
    title: "Inne pomysły i działalności",
    text: "Pomysły na stronę i proste usprawnienia, również poza wymienionymi branżami.",
    image: otherImg,
    link: "/oferta/inne/",
    alt: "Ilustracja rozmowy o pomyśle i narzędziach cyfrowych",
    icon: "tabler:bulb",
    menuDescription: "Strona, pomysł, zadanie",
  },
] as const;
