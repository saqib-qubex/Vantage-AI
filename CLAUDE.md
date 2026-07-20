# CLAUDE.md — VantageAI marketing site (getvantage.tech)

Project memory for the **Velocity** initiative. Read this first when working in this repo.

## What this is
- Marketing website for **VantageAI**, an AI revenue-operations platform for clinical practices
  (answers patient calls 24/7, books appointments, re-engages dormant patients, HIPAA-aware).
- Company: **QubeX, Inc.** · support@getvantage.tech · product personas are named **"Healix."**
- Repo: `saqib-qubex/Vantage-AI` → deployed at **https://getvantage.tech**.
- Sibling repo (separate app, not this site): `qubex-tech/VantageAI-CRM`.

## Stack & deploy
- **Static site**: plain HTML + `styles.css` + `script.js`. No build step, no framework.
- Hosted on **GitHub Pages**, custom domain via `CNAME` (getvantage.tech).
- **Production branch = `main`.** Pages auto-deploys on push to `main`.
- Dev branch: `claude/getvantage-code-review-ywh3en`. Deploy = fast-forward `main` to the
  dev branch and push (`git checkout main && git merge --ff-only <branch> && git push origin main`).
- External deps loaded via CDN: Google Fonts (**Inter**), **Font Awesome** (cdnjs), Typeform
  embed (`data-tf-popup="bVPcDjHL"`), Stripe pricing table (`checkout.html`).

## Design system (owner.com-inspired, light theme)
Tokens live in `styles.css` `:root`. Core palette:
- Background `#ffffff`; alt surfaces cream `#f6f4f0`; borders `#e7e4de`.
- Text: charcoal `#191919` / gray `#57534e`.
- **Brand green** `--color-primary: #14532d`; **accent** `--color-accent: #15803d`;
  **ink pill** `--color-ink: #1c1c1c` (used for the nav CTA).
- Bold Inter headings (weight 800, tight tracking); large radii (lg 18px / xl 28px).

Reusable components/classes:
- Buttons: `.btn-primary` (green pill; charcoal in `.nav-actions`), `.btn-secondary`.
- Hero: `.hero` / `.hero-shell` (2-col, stacks ≤768px), `.hero-title` + `.hero-title-accent` (green).
- `.outcome-card--green|indigo|amber` — vivid gradient highlight cards (homepage "outcomes").
- `.agent-*` (agent detail pages): `.agent-portrait`, `.agent-grid`, `.agent-card`,
  `.agent-split`, `.agent-cap`, `.agent-benefits`, `.agent-benefit`.
- `.revops-loop` — gradient Capture→Convert→Retain card in the RevOps hero.
- `.testimonials-carousel` / `.testimonial-card`, `.proof-band`, `.cta-section`, `.faq-section`.
- Shared nav + footer markup (dark `assets/logo.png` on the light navbar; agent pages use an
  "AI Agents" dropdown). **Use `logo.png` (dark) on light backgrounds — never `logowhite.png`.**

## Motion system
- `initializeAutoMotion()` in `script.js` auto-tags common sections/cards with `[data-animate]`
  and reveals them (fade+slide, staggered for grid children) via IntersectionObserver.
- Skips the hero (uses legacy `.reveal`) and zero-box/hidden elements. Hero has a slow
  `auroraDrift` background animation.
- **Honors `prefers-reduced-motion`** (disables animation, forces content visible). Any new
  animated element must degrade the same way.

## Pages
`index.html` (home) · `revops.html` (platform) · `pricing.html` · `ai-receptionist.html` ·
`ai-scribe.html` · `medical-assistant.html` (all three agent pages rebuilt on this design
system — **Bootstrap fully removed**) · `privacy.html` · `terms.html` · `sms-consent.html`
(legal, recolored to green) · `checkout.html` (Stripe) · `pricing_old.html` (legacy, robots-disallowed).

## Verifying changes locally (offline screenshots)
Chromium is preinstalled; drive it with the global Playwright:
```js
import pkg from '/opt/node22/lib/node_modules/playwright/index.js';
const { chromium } = pkg;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
```
Scroll through the page, then assert no `[data-animate]` element is stuck at `opacity:0`.
**Note:** Font Awesome and Stripe/Bootstrap CDNs are BLOCKED in this environment, so icon
glyphs render as empty boxes in local screenshots but appear fine in production. Don't
"fix" missing glyphs.

## Outstanding items & cautions
- ⚠️ **Testimonial quotes are DRAFT wording** for real, named people — Dr. Nilanjana Bose
  (Lonestar Rheumatology) and Amir Thobani (Owner, Advanced Family Dental of Naperville).
  Replace with their real approved words before relying on them. Never invent quotes for
  real named individuals (legal/trust risk, esp. in healthcare).
- ⚠️ **Stripe is in TEST mode**: `checkout.html` and `pricing_old.html` use a `pk_test_…`
  publishable key. Swap to the live key before taking real payments.
- ~28MB of **unreferenced assets** (`assets/product-demo.MP4`, `assets/video-placeholder.jpeg`).
- Orphaned placeholder `app/*.tsx` (privacy/terms/sms-consent) — real content is the `.html` files.
- Email capture (`initializeEmailForm` in `script.js`) only `alert()`s; no backend wired.

## Reference: owner.com (design north star)
The look-and-feel target is **owner.com**: light background, deep-green brand + black pill CTA,
huge bold headlines, large rounded cards, vivid gradient feature cards, big stat callouts,
named customer social proof. Keep new work consistent with that language.
