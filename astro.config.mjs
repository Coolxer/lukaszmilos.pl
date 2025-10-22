// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import favicons from "astro-favicons";
import icon from "astro-icon";
import playformCompress from "@playform/compress";
import partytown from "@astrojs/partytown";

import config from "./src/data/consts.json";

import opengraphImages, { presets } from "astro-opengraph-images";
import * as fs from "fs"; // The fs module is required to load fonts
import { CustomOGTemplate } from "./src/components/core/custom-og-template.tsx";

export default defineConfig({
  site: config.site.domain,
  base: "",
  trailingSlash: config.site.trailingSlash,
  output: "static",
  compressHTML: true,
  scopedStyleStrategy: "class",

  build: {
    format: "directory",
    assets: "_astro",
    inlineStylesheets: "auto",
    assetsPrefix: "",
  },

  redirects: {},

  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        page !== `${config.site.domain}/stylebook/` &&
        page !== `${config.site.domain}/polityka-prywatnosci/`,
    }),
    icon({
      iconDir: "src/assets/icons",
      include: {
        tabler: ["*"],
      },
    }),
    playformCompress(),
    favicons({
      name: "Łukasz Miłoś - oficjalna strona",
      short_name: "Łukasz Miłoś",
    }), // partytown(),
    opengraphImages({
      options: {
        fonts: [
          // Waga 400 (normal) - jeden plik ze wszystkimi znakami
          {
            name: "Roboto",
            weight: 400,
            style: "normal",
            data: fs.readFileSync("./src/assets/fonts/Roboto-Regular.ttf"),
          },
          // Waga 700 (bold) - jeden plik ze wszystkimi znakami
          {
            name: "Roboto",
            weight: 700,
            style: "normal",
            data: fs.readFileSync("./src/assets/fonts/Roboto-Bold.ttf"),
          },
        ],
      },
      render: CustomOGTemplate,
    }),
  ],

  experimental: {
    fonts: [
      {
        name: "Poppins",
        cssVariable: "--font-poppins",
        provider: fontProviders.fontsource(),
        weights: [400, 600],
        styles: ["normal"],
        subsets: ["latin", "latin-ext"],
      },
    ],
  },

  server: {
    port: 4321,
    host: false,
    headers: {
      "Strict-Transport-Security":
        "max-age=63072000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "X-XSS-Protection": "0",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy": "upgrade-insecure-requests",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: true,
  },
});
