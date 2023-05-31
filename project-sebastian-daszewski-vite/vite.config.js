import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsonServer from "json-server";

export default defineConfig({
  plugins: [react()],
  server: {
    middleware: [jsonServer.create()],
    port: 8000,
  },
});
