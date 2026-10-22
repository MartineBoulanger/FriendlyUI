import { copyFileSync } from "node:fs";
for (const file of ["styles.css", "theme.css", "tailwind.css"]) {
  copyFileSync(new URL(`../packages/ui/src/${file}`, import.meta.url), new URL(`../packages/ui/dist/${file}`, import.meta.url));
}
