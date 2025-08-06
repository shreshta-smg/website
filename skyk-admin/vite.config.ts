import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "@emotion/react",
            "@emotion/styled",
            "@mui/icons-material",
            "@mui/lab",
            "@mui/material",
            "@mui/x-data-grid",
            "@refinedev/cli",
            "@refinedev/core",
            "@refinedev/devtools",
            "@refinedev/inferencer",
            "@refinedev/kbar",
            "@refinedev/mui",
            "@refinedev/react-hook-form",
            "@refinedev/react-router",
            "@refinedev/supabase",
            "@uiw/react-md-editor",
            "react",
            "react-dom",
            "react-hook-form",
            "react-router",
            "uuid",
          ]
        }
      }
    }
  }
});
