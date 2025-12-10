import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import webfontDownload from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [tailwindcss(), webfontDownload()],
  build: {
    manifest: true,
  },
});
