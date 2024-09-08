import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "Feathers",
        short_name: "Feathers",
        description: "Feathers Visualization as a Progressive Web App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/feathers/featherIcon600.png",
            type: "image/png",
            sizes: "600x600",
          },
        ],
      },
    }),
  ],
  base: "/feathers/",
});
