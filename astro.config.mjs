import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  integrations: [react()],

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Outfit",
      cssVariable: "--font-outfit",
      weights: ["100 900"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      weights: ["100 800"],
    },
  ],

  vite: {
    plugins: [tailwind()],
    optimizeDeps: {
      // Both are reached through dynamic import() (CV generation / lazy PDF viewer), so
      // pre-bundle them up front: otherwise Vite discovers them late and re-optimizes
      // mid-session, which 504s the URLs the running page already has.
      include: ["jspdf", "pdfjs-dist/legacy/build/pdf.mjs"],
    },
    build: {
      // pdfjs-dist is a single ~500 kB module loaded on demand by the lazy CV viewer.
      chunkSizeWarningLimit: 600,
    },
  },

  server: {
    port: 4321,
    host: true,
    allowedHosts: ["zenon.lan"],
  },

  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
