import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  mkdirSync(dist, { recursive: true });
}

// SPA fallback for static hosts
copyFileSync(join(dist, "index.html"), join(dist, "404.html"));

const includePhp =
  process.env.STANKI_COPY_PHP === "1" || process.env.STANKI_COPY_PHP === "true";

if (includePhp) {
  copyFileSync(join(root, "send-mail.php"), join(dist, "send-mail.php"));
  console.log("postbuild: copied send-mail.php + 404.html (production PHP target)");
} else {
  console.log(
    "postbuild: copied 404.html only (static/GitHub Pages — PHP not included)",
  );
}
