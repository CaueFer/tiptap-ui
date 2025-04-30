import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJs from "vite-plugin-css-injected-by-js";
import path from "node:path";

export default defineConfig({
  plugins: [react(), cssInjectedByJs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "tiptap-ui",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@tiptap/react": "TiptapReact",
          "@tiptap/core": "TiptapCore",
          "@tiptap/starter-kit": "TiptapStarterKit",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
