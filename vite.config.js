import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: {
      app: path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "./src/app",
      ),
      pages: path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "./src/pages",
      ),
      widgets: path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "./src/widgets",
      ),
      features: path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "./src/features",
      ),
      entities: path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "./src/entities",
      ),
      shared: path.resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "./src/shared",
      ),
    },
  },
});
