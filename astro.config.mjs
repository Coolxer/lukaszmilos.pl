import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "astro/config"
import data from "/src/data/site.json"
import tailwind from "@astrojs/tailwind"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon"
import devtoolBreakpoints from "astro-devtool-breakpoints"
import react from "@astrojs/react"
import partytown from "@astrojs/partytown"
import robotsTxt from "astro-robots-txt"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: data.site.domain,
  base: "",
  trailingSlash: data.site.trailingSlash,
  output: "static",
  compressHTML: true,
  scopedStyleStrategy: "class",
  build: {
    format: "directory",
    assets: "_astro",
    inlineStylesheets: "auto",
    assetsPrefix: "",
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      filter: (page) =>
        page !== `${data.site.domain}/stylebook/` &&
        page !== `${data.site.domain}/polityka-prywatnosci/`,
    }),
    icon({
      iconDir: "src/assets/icons",
      include: {
        tabler: ["*"],
      },
    }),
    devtoolBreakpoints(),
    react(),
    partytown({
      config: {
        debug: false,
      },
      forward: ["dataLayer.push"],
      ignoreUnused: true,
    }),
    robotsTxt(),
    (await import("@playform/compress")).default({
      CSS: false,
      //true
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      // true
      JavaScript: false,
      // true
      SVG: false,
      // true
      Logger: 1,
      Path: ["./dist"],
    })
  ],
  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
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
  redirects: {},
  devToolbar: {
    enabled: true,
  },
})
