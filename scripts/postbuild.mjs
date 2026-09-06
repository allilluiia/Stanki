import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  mkdirSync(dist, { recursive: true });
}

copyFileSync(join(root, "send-mail.php"), join(dist, "send-mail.php"));
copyFileSync(join(dist, "index.html"), join(dist, "404.html"));

console.log("postbuild: copied send-mail.php and 404.html into dist/");
