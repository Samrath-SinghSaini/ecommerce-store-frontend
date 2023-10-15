import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
let baseURL = "https://ecommerce-store-backend-vop3.onrender.com";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,

    proxy: {
      "/api": baseURL,

      "/images": baseURL + "/images",
      "/api/products": baseURL + "/api/products",
      "/api/category": baseURL + "/api/category",
      "/api/home": baseURL + "/api/home",
    },
  },
  root: ".",
  build: {
    outDir: "public",
  },
  publicDir: "public",
});
