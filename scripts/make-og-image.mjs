/**
 * Generates public/assets/og-image.png — the link-preview card.
 *
 * Run with `npm run og`. The output is committed, so this only needs rerunning
 * when the copy or palette changes. Rendered via librsvg (through sharp), which
 * uses system fonts: Hanken Grotesk and JetBrains Mono aren't installed as
 * system fonts, so this uses Helvetica and Menlo as the closest stand-ins. The
 * result is baked into the PNG, so CI never needs the fonts.
 */
import sharp from "sharp";

const W = 1200;
const H = 630;

const paper = "#FBFBFD";
const ink = "#1E2233";
const body = "#4A5069";
const muted = "#8A90A6";
const accent = "#7C3AED";

const sans = "Helvetica Neue, Helvetica, Arial, sans-serif";
const mono = "Menlo, DejaVu Sans Mono, monospace";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${paper}"/>

  <!-- brand lockup, mirroring the site nav -->
  <rect x="80" y="74" width="46" height="46" rx="11" fill="${accent}"/>
  <text x="103" y="105" font-family="${sans}" font-size="21" font-weight="700"
        fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">TS</text>
  <text x="144" y="106" font-family="${sans}" font-size="30" font-weight="700"
        fill="${ink}">Sean Pertet</text>

  <!-- eyebrow -->
  <text x="80" y="243" font-family="${mono}" font-size="23" fill="${accent}">
    // senior full-stack software engineer &#183; nairobi
  </text>

  <!-- headline, carrying the hero's thesis -->
  <text x="80" y="345" font-family="${sans}" font-size="78" font-weight="700" fill="${ink}">I ship <tspan fill="${accent}">type-safe</tspan></text>
  <text x="80" y="435" font-family="${sans}" font-size="78" font-weight="700" fill="${ink}">products, end to end.</text>

  <!-- supporting line -->
  <text x="80" y="505" font-family="${sans}" font-size="27" fill="${body}">Six years building production systems in TypeScript.</text>

  <!-- footer rail -->
  <text x="80" y="566" font-family="${mono}" font-size="21" fill="${muted}">TypeScript &#183; React &#183; Next.js &#183; Node.js</text>
  <text x="${W - 80}" y="566" font-family="${mono}" font-size="21" fill="${muted}" text-anchor="end">seanleken.github.io</text>

  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${accent}"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("public/assets/og-image.png");

const meta = await sharp("public/assets/og-image.png").metadata();
console.log(`  wrote public/assets/og-image.png — ${meta.width}x${meta.height}, ${(meta.size / 1024).toFixed(1)} kB`);
