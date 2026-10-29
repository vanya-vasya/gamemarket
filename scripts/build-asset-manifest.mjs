// Scans public/images/** and writes lib/asset-manifest.json.
// Runs automatically before `next build` / `next dev` (see package.json scripts),
// so dropping a file into public/images is enough to make the site pick it up.
import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const publicDir = join(process.cwd(), "public");
const imagesDir = join(publicDir, "images");
const outFile = join(process.cwd(), "lib", "asset-manifest.json");
const IMAGE_RE = /\.(webp|jpe?g|png|avif)$/i;

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (IMAGE_RE.test(name)) {
      files.push("/" + relative(publicDir, full).split(sep).join("/"));
    }
  }
};

if (existsSync(imagesDir)) walk(imagesDir);
files.sort();
writeFileSync(outFile, JSON.stringify(files, null, 2) + "\n");
console.log(`asset manifest: ${files.length} image(s) under public/images`);
