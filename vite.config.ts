import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      strict: false,
    },
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  // Base path configuration:
  // - Development: "/" (root)
  // - Vercel: "/" (root - Vercel serves from root domain)
  // - GitHub Pages: "/unfriendly-accessibility-test-web/" (subdirectory)
  // Vercel automatically sets VERCEL=1, so we check for that
  base: process.env.VERCEL === '1' || mode === 'development' 
    ? "/" 
    : "/unfriendly-accessibility-test-web/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
