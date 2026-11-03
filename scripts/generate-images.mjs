// Generates the artwork listed in docs/image-generation-tasks.json through the
// OpenRouter Image API and writes WebP files to the slot paths under public/images.
//
//   OPENROUTER_API_KEY=... node scripts/generate-images.mjs [options]
//
// Options
//   --only a,b,c      only these task ids (e.g. games/genshin-impact,sellers/gamenews)
//   --priority 1      only this priority (1, 2 or 3)
//   --limit N         stop after N generations
//   --model <slug>    default google/gemini-3-pro-image-preview
//   --force           regenerate even when a file already exists at the slot
//   --dry-run         print what would run, call nothing
//   --preview-dir D   also save the untouched model output as PNG in D
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const MODEL = option("model") ?? "google/gemini-3-pro-image-preview";
const only = option("only")?.split(",").map((s) => s.trim());
const priority = option("priority") ? Number(option("priority")) : undefined;
const limit = option("limit") ? Number(option("limit")) : Infinity;
const previewDir = option("preview-dir");
const dryRun = flag("dry-run");
const force = flag("force");
const key = process.env.OPENROUTER_API_KEY;

if (!dryRun && !key) {
  console.error("OPENROUTER_API_KEY is not set.");
  process.exit(1);
}

const { tasks } = JSON.parse(readFileSync("docs/image-generation-tasks.json", "utf8"));
const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif"];
const slotExists = (path) =>
  EXTENSIONS.some((ext) => existsSync(path.replace(/\.\w+$/, `.${ext}`)));

const selected = tasks
  .filter((t) => !only || only.includes(t.id))
  .filter((t) => priority === undefined || t.priority === priority)
  .filter((t) => force || !slotExists(t.path))
  .slice(0, limit);

if (only) {
  const unknown = only.filter((id) => !tasks.some((t) => t.id === id));
  if (unknown.length) {
    console.error(`Unknown task id(s): ${unknown.join(", ")}`);
    process.exit(1);
  }
}

console.log(`${selected.length} task(s) to generate with ${MODEL}${dryRun ? " (dry run)" : ""}`);

// Avatars and merchant marks end up at 512px, so 1K output is enough and cheaper.
const resolutionFor = (task) => (task.aspect_ratio === "1:1" ? "1K" : "2K");

const FRAMING_RULE =
  " Full-bleed composition that fills the entire frame edge to edge: no black bars, no letterboxing, no empty or blurred borders, no inset frame, no vignette-to-black corners, and never draw color swatches, palette chips, hex codes or any text.";

const MAX_CANDIDATES = 3;

// The model sometimes returns a picture with solid black blocks or bars along the edges.
const blackFraction = async (buffer) => {
  const { data } = await sharp(buffer).resize(128, 96, { fit: "fill" }).greyscale().raw().toBuffer({ resolveWithObject: true });
  return data.filter((value) => value < 6).length / data.length;
};
const MAX_BLACK_FRACTION = 0.03;

const generate = async (task) => {
  const body = {
    model: MODEL,
    prompt: task.prompt + FRAMING_RULE,
    aspect_ratio: task.aspect_ratio,
    resolution: resolutionFor(task),
    n: 1,
  };
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/images", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "X-Title": "Game Sector artwork",
        },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 400)}`);
      const json = JSON.parse(text);
      const image = json.data?.[0]?.b64_json;
      if (!image) throw new Error(`No image in response: ${text.slice(0, 400)}`);
      return { buffer: Buffer.from(image, "base64"), cost: json.usage?.cost };
    } catch (error) {
      lastError = error;
      if (/HTTP 40[0134]/.test(String(error))) break;
      await new Promise((r) => setTimeout(r, attempt * 4000));
    }
  }
  throw lastError;
};

let spent = 0;
let done = 0;
const failed = [];

for (const [index, task] of selected.entries()) {
  const [width, height] = task.target_size.split("x").map(Number);
  console.log(`[${index + 1}/${selected.length}] ${task.id} (${task.aspect_ratio}, ${resolutionFor(task)})`);
  if (dryRun) continue;
  try {
    let best;
    let cost = 0;
    for (let candidate = 1; candidate <= MAX_CANDIDATES; candidate++) {
      const result = await generate(task);
      cost += result.cost ?? 0;
      const black = await blackFraction(result.buffer);
      if (!best || black < best.black) best = { buffer: result.buffer, black };
      if (black <= MAX_BLACK_FRACTION) break;
      console.log(`   candidate ${candidate}: ${(black * 100).toFixed(1)}% black, regenerating`);
    }
    const { buffer } = best;
    if (best.black > MAX_BLACK_FRACTION) console.warn(`   WARNING ${task.id}: still ${(best.black * 100).toFixed(1)}% black after ${MAX_CANDIDATES} candidates, check by eye`);
    const meta = await sharp(buffer).metadata();
    if (previewDir) {
      mkdirSync(previewDir, { recursive: true });
      writeFileSync(join(previewDir, `${task.id.replace("/", "__")}.png`), buffer);
    }
    mkdirSync(dirname(task.path), { recursive: true });
    const out = await sharp(buffer)
      .resize(width, height, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toBuffer();
    writeFileSync(task.path, out);
    spent += cost ?? 0;
    done++;
    console.log(`   saved ${task.path}  source ${meta.width}x${meta.height} -> ${width}x${height}, ${(out.length / 1024).toFixed(0)} KB${cost ? `, $${cost.toFixed(4)}` : ""}`);
  } catch (error) {
    failed.push(task.id);
    console.error(`   FAILED ${task.id}: ${String(error).slice(0, 500)}`);
  }
}

console.log(`\nDone: ${done} saved, ${failed.length} failed, cost $${spent.toFixed(3)}`);
if (failed.length) {
  console.log(`Retry with: node scripts/generate-images.mjs --only ${failed.join(",")}`);
  process.exit(1);
}
if (!dryRun && done) console.log("Next: npm run assets && npm run build");
