import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "Satis",
      fileName: "satis",
      formats: ["es", "cjs"],
    },
  },
});
