import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Used only by the Ladle workshop (`npm run ladle:serve` / `ladle:build`) so
// `src/styles.css` gets processed live instead of requiring a separate
// `tailwindcss --watch` process. The shipped package build (`npm run build`)
// uses `@tailwindcss/cli` directly and never touches this file.
export default defineConfig({
  plugins: [tailwindcss()],
});
