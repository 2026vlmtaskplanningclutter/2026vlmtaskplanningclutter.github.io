import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import webfontDownload from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [tailwindcss(), webfontDownload()],
  assetsInclude: ["@fortawesome/fontawesome-free/css/all.min.css"],
  build: {
    manifest: true,
  },
});
