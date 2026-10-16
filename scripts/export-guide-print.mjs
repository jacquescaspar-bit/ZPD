#!/usr/bin/env node
/**
 * Export the flagship parent guide as:
 *   - A4 PDF  (clickable links in Preview / Acrobat / a browser)
 *   - A4 PNG  (copy-paste into print newsletters / Word)
 *   - Newsletter PNG (copy-paste into digital newsletters)
 *
 * A PNG cannot hold a clickable link. The PDF can. The newsletter image
 * prints the URL as text; wrap it in HTML if the CMS will hyperlink it.
 *
 * Keep body copy in sync with content/blog/is-tutoring-the-right-fit.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "guides");
const GUIDE_URL = "https://zpdlearning.com/blog/is-tutoring-the-right-fit";
const SITE_URL = "https://zpdlearning.com";
const PHONE = "1300 990 443";
const PHONE_TEL = "1300990443";

const b64 = (rel, mime) => {
  const buf = fs.readFileSync(path.join(ROOT, rel));
  return `data:${mime};base64,${buf.toString("base64")}`;
};

const fontRegular = b64(
  "public/antipasto/Antipasto_regular.otf",
  "font/otf",
);
const fontBold = b64("public/antipasto/Antipasto_extrabold.otf", "font/otf");
const logo = b64("public/brand/email-logo@2x.png", "image/png");

const sharedCss = `
  @font-face {
    font-family: "Antipasto";
    src: url("${fontRegular}") format("opentype");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: "Antipasto";
    src: url("${fontBold}") format("opentype");
    font-weight: 800;
    font-style: normal;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #1c1917;
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  h1, h2, .brand {
    font-family: Antipasto, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
`;

const articleInner = `
  <header class="top">
    <a class="brand" href="${GUIDE_URL}">
      <img src="${logo}" alt="" width="36" height="36" />
      <span>ZPD Learning</span>
    </a>
    <p class="kicker">A parent page</p>
  </header>

  <h1>Is tutoring actually the right fit?</h1>
  <p class="deck">Before you sign up for a term — how to tell if the work is too hard, too easy, or just right, and what to ask any tutor on the phone.</p>

  <p>You've probably seen this kitchen table.</p>
  <p>Homework opens. Within ten minutes the mood has turned. By eight o'clock you're explaining the same concept for the third time and wondering if you're helping or doing it for them.</p>
  <p>Or the flip side: they whip through the sheet, say tutoring is a waste of money, and still walk out of the exam with a mark that doesn't match what you know they can do.</p>
  <p>Both patterns are common. Both are usually a <strong>fit</strong> problem — not a child who "isn't trying."</p>

  <h2>The one idea worth knowing</h2>
  <p>Children learn fastest on work they <em>almost</em> get — with a hint, a model, or someone asking the right question. Not with you doing it for them.</p>
  <p>Psychologists call that band the Zone of Proximal Development (ZPD). You don't need the theory. You need to spot which band your child is in this week.</p>

  <h2>Three bands — which sounds like your house?</h2>
  <div class="bands">
    <div class="band">
      <p class="band-label">Too easy</p>
      <p>"This is boring." Done in minutes. Careless mistakes when it counts. Tutoring feels pointless.</p>
    </div>
    <div class="band band-mid">
      <p class="band-label">Just right</p>
      <p>"I need a hint… oh, I see it." Frustration, then a click. They can repeat it tomorrow with less help.</p>
    </div>
    <div class="band">
      <p class="band-label">Too hard (for now)</p>
      <p>"I can't do this." Won't start. Meltdowns. You become the nightly tutor by default.</p>
    </div>
  </div>
  <p>Good tutoring stays in the middle. Bad tutoring does the homework for them, or throws harder content at a gap that isn't closed yet.</p>

  <div class="split">
    <div>
      <h2>Red flags</h2>
      <ul>
        <li>Sessions are mostly "let's get tonight's sheet done"</li>
        <li>Your child can't explain what they practised without the tutor there</li>
        <li>Nobody tells you what to do for five minutes between visits</li>
        <li>The tutor can't say what should be different after five sessions</li>
        <li>Week six and the plan still changes every Thursday</li>
      </ul>
    </div>
    <div>
      <h2>What good support looks like</h2>
      <ol>
        <li><strong>Show one move</strong> — "Watch how I'd start this."</li>
        <li><strong>Hand it back</strong> — "What's your first step?"</li>
        <li><strong>Step away</strong> — less help each week as the skill sticks.</li>
      </ol>
      <p>If the tutor always holds the pencil, you're buying dependency.</p>
    </div>
  </div>

  <h2>Five questions before you pay for a term</h2>
  <ol class="qs">
    <li>"How will you figure out my child's level?" — not just subject and year.</li>
    <li>"What should they do alone after session five that they can't do now?"</li>
    <li>"What do you want me practising at home — specifically, for how long?"</li>
    <li>"Are you still teaching in schools? What year levels?"</li>
    <li>"Can we do one session before committing to a term?"</li>
  </ol>

  <h2>Why classroom-active tutors matter</h2>
  <p>"Experienced tutor" on a flyer often means "has tutored for years" — not "knows what your child's teacher is doing this term."</p>

  <h2>Why a term beats book-when-stuck</h2>
  <p>One-off homework rescue keeps everyone in fire-drill mode. A term gives room to find the gap, build one skill, and loop you in between visits.</p>

  <footer class="cta">
    <p class="cta-lead"><strong>Want to try us?</strong> One $110 Diagnostic — test fit before any term.</p>
    <p class="cta-contact">
      <a href="tel:${PHONE_TEL}">${PHONE}</a>
      ·
      <a href="${SITE_URL}">zpdlearning.com</a>
    </p>
    <p class="cta-url"><a href="${GUIDE_URL}">${GUIDE_URL.replace("https://", "")}</a></p>
    <p class="legal">Squanch Systems trading as ZPD Learning · ABN 74 198 215 420 · Classroom teachers who tutor, online or in-home, Australia-wide.</p>
  </footer>
`;

const a4Html = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8" />
  <title>Is tutoring actually the right fit?</title>
  <style>
    ${sharedCss}
    @page { size: A4; margin: 0; }
    body { width: 210mm; min-height: 297mm; }
    .sheet {
      width: 210mm;
      min-height: 297mm;
      padding: 12mm 13mm 11mm;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 0.04em;
      color: #0f172a;
    }
    .brand img { display: block; width: 32px; height: 32px; }
    .kicker {
      margin: 0;
      font-size: 9px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #57534e;
      white-space: nowrap;
    }
    h1 {
      margin: 0 0 7px;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.01em;
      line-height: 1.15;
      color: #0f172a;
    }
    .deck {
      margin: 0 0 9px;
      font-size: 11.5px;
      line-height: 1.35;
      color: #44403c;
    }
    p { margin: 0 0 6px; font-size: 10.4px; line-height: 1.4; }
    h2 {
      margin: 9px 0 5px;
      font-size: 12.5px;
      font-weight: 800;
      color: #1d4ed8;
      letter-spacing: 0.01em;
    }
    .bands {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin: 4px 0 6px;
    }
    .band {
      border: 1px solid #e7e5e4;
      border-radius: 6px;
      padding: 7px 8px 6px;
      background: #fafaf9;
    }
    .band-mid {
      border-color: #93c5fd;
      background: #eff6ff;
    }
    .band p { margin: 0; font-size: 9.4px; line-height: 1.34; }
    .band-label {
      font-weight: 700;
      font-size: 10px !important;
      color: #0f172a;
      margin-bottom: 3px !important;
    }
    .split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    ul, ol { margin: 0 0 6px; padding-left: 16px; }
    li { font-size: 10.2px; line-height: 1.38; margin: 0 0 3px; }
    .qs { columns: 1; }
    .cta {
      margin-top: 8px;
      padding: 8px 10px 7px;
      background: #0f172a;
      color: #f8fafc;
      border-radius: 8px;
    }
    .cta p { color: #e2e8f0; margin: 0 0 3px; }
    .cta-lead { font-size: 11px !important; color: #fff !important; }
    .cta-contact { font-size: 12px !important; color: #fff !important; font-weight: 700; }
    .cta-url { font-size: 10px !important; color: #93c5fd !important; }
    .legal { margin: 4px 0 0 !important; font-size: 7.5px !important; color: #94a3b8 !important; }
  </style>
</head>
<body>
  <div class="sheet">${articleInner}</div>
</body>
</html>`;

const newsletterHtml = `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="utf-8" />
  <title>Is tutoring actually the right fit?</title>
  <style>
    ${sharedCss}
    body { width: 640px; background: #fff; }
    .sheet { width: 640px; padding: 28px 28px 24px; }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 18px;
      letter-spacing: 0.03em;
      color: #0f172a;
    }
    .brand img { width: 44px; height: 44px; display: block; }
    .kicker {
      margin: 0;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #57534e;
      text-align: right;
      white-space: nowrap;
    }
    h1 {
      margin: 0 0 10px;
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 0.01em;
      line-height: 1.15;
      color: #0f172a;
    }
    .deck {
      margin: 0 0 16px;
      font-size: 16px;
      line-height: 1.4;
      color: #44403c;
    }
    p { margin: 0 0 10px; font-size: 16px; line-height: 1.45; }
    h2 {
      margin: 18px 0 8px;
      font-size: 18px;
      font-weight: 800;
      color: #1d4ed8;
    }
    .bands { display: grid; gap: 8px; margin: 8px 0 12px; }
    .band {
      border: 1px solid #e7e5e4;
      border-radius: 8px;
      padding: 12px 14px;
      background: #fafaf9;
    }
    .band-mid { border-color: #93c5fd; background: #eff6ff; }
    .band p { margin: 0; font-size: 15px; }
    .band-label {
      font-weight: 700;
      font-size: 15px !important;
      color: #0f172a;
      margin-bottom: 4px !important;
    }
    .split { display: grid; gap: 4px; }
    ul, ol { margin: 0 0 10px; padding-left: 22px; }
    li { font-size: 16px; line-height: 1.4; margin: 0 0 6px; }
    .cta {
      margin-top: 16px;
      padding: 16px 16px 14px;
      background: #0f172a;
      color: #f8fafc;
      border-radius: 10px;
    }
    .cta p { color: #e2e8f0; margin: 0 0 6px; }
    .cta-lead { font-size: 16px !important; color: #fff !important; }
    .cta-contact { font-size: 18px !important; color: #fff !important; font-weight: 700; }
    .cta-url { font-size: 14px !important; color: #93c5fd !important; word-break: break-all; }
    .legal { margin: 8px 0 0 !important; font-size: 11px !important; color: #94a3b8 !important; }
  </style>
</head>
<body>
  <div class="sheet">${articleInner}</div>
</body>
</html>`;

const writeTmp = (name, html) => {
  const file = path.join(OUT_DIR, name);
  fs.writeFileSync(file, html);
  return file;
};

const main = async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const chrome =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chrome,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const a4Page = await browser.newPage();
    const a4Path = writeTmp("_guide-a4.html", a4Html);
    await a4Page.goto(`file://${a4Path}`, { waitUntil: "networkidle0" });
    const pdfPath = path.join(OUT_DIR, "is-tutoring-the-right-fit.pdf");
    await a4Page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    await a4Page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 2,
    });
    await a4Page.screenshot({
      path: path.join(OUT_DIR, "is-tutoring-the-right-fit-a4.png"),
      type: "png",
      clip: { x: 0, y: 0, width: 794, height: 1123 },
    });

    const nlPage = await browser.newPage();
    const nlPath = writeTmp("_guide-newsletter.html", newsletterHtml);
    await nlPage.goto(`file://${nlPath}`, { waitUntil: "networkidle0" });
    const nlHeight = await nlPage.evaluate(() => {
      const sheet = document.querySelector(".sheet");
      return Math.ceil(sheet.getBoundingClientRect().height);
    });
    await nlPage.setViewport({
      width: 640,
      height: nlHeight,
      deviceScaleFactor: 2,
    });
    await nlPage.screenshot({
      path: path.join(OUT_DIR, "is-tutoring-the-right-fit-newsletter.png"),
      type: "png",
      fullPage: true,
    });

    fs.unlinkSync(a4Path);
    fs.unlinkSync(nlPath);

    console.log(
      JSON.stringify(
        {
          pdf: path.relative(ROOT, pdfPath),
          a4: "public/guides/is-tutoring-the-right-fit-a4.png",
          newsletter: "public/guides/is-tutoring-the-right-fit-newsletter.png",
          newsletterHeight: nlHeight,
        },
        null,
        2,
      ),
    );
  } finally {
    await browser.close();
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
