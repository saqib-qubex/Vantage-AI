# VantageAI Website Structure

## 🗺️ Site Map

```
VantageAI.com
│
├── 🏠 Homepage (index.html)
│   ├── Hero: "Revenue Operations for Clinical Practices"
│   ├── Social Proof
│   ├── Feature Tabs:
│   │   ├── Revenue Capture
│   │   ├── Revenue Conversion
│   │   ├── Revenue Retention
│   │   └── Revenue Intelligence
│   ├── Numbered Features (01-04):
│   │   ├── 01: The operational layer
│   │   ├── 02: AI agents that execute
│   │   ├── 03: Capture, convert, retain
│   │   └── 04: Revenue Control & Trust
│   ├── Customer Logos
│   ├── Testimonials
│   └── CTA: "Stop losing revenue through the cracks"
│
├── 🎯 RevOps Platform (revops.html) ← NEW
│   ├── Hero: "AI-Native Revenue Operations"
│   ├── Section 01: Revenue Capture (#capture)
│   │   └── Voice AI, SMS, Email endpoints
│   ├── Section 02: Revenue Conversion (#conversion)
│   │   └── Scheduling, reminders, lifecycle
│   ├── Section 03: Revenue Retention (#retention)
│   │   └── Campaigns, recall, patient portal
│   ├── Section 04: Revenue Intelligence (#intelligence)
│   │   └── Healix AI, agents, automation
│   ├── Section 05: Revenue Control (#control)
│   │   └── Audit, compliance, PHI redaction
│   ├── Key Differentiator Section
│   └── CTA: "Run a Revenue Assessment"
│
├── 💰 Pricing (pricing.html)
│   └── [Ready for RevOps tier structure]
│
├── 🤖 AI Agents (detail pages - maintained)
│   ├── AI Receptionist (ai-receptionist.html)
│   ├── AI Scribe (ai-scribe.html)
│   └── Medical Assistant (medical-assistant.html)
│
└── 📄 Legal & Compliance
    ├── Privacy Policy (privacy.html)
    ├── Terms of Service (terms.html)
    └── SMS Consent (sms-consent.html)
```

---

## 🧭 Navigation Structure

### Desktop Navigation
```
┌─────────────────────────────────────────────────────────┐
│  [Logo]  Revenue Ops ▼  Resources ▼  Customers  Pricing │
│                                    [Sign in] [Start Free]│
└─────────────────────────────────────────────────────────┘
```

### Revenue Operations Dropdown
```
Revenue Operations ▼
├── Revenue Capture
│   └── "Never miss a patient"
├── Revenue Conversion
│   └── "Intent to booked—automatically"
├── Revenue Retention
│   └── "Maximize lifetime value"
├── Revenue Intelligence
│   └── "AI agents that execute"
└── Revenue Control
    └── "Enterprise-grade safety"

[Each links to revops.html#section]
```

### Resources Dropdown
```
Resources ▼
├── Documentation
│   └── "Setup guides & tutorials"
├── Blog
│   └── "Healthcare AI insights"
└── Security & Compliance
    └── "HIPAA, SOC 2, GDPR"
```

---

## 🎯 User Journey Paths

### Path 1: Discovery → Deep Dive
```
Homepage → See "Revenue Operations"
         → Click dropdown → Select pillar
         → Land on revops.html#section
         → Read full pillar details
         → CTA: "Run Revenue Assessment"
```

### Path 2: Quick Overview
```
Homepage → Scroll to Feature Tabs
         → Click through 4 tabs
         → See quick overviews
         → CTA: "See Where You're Losing Revenue"
```

### Path 3: Social Proof → Action
```
Homepage → Read testimonial
         → Scroll to numbered features
         → See operational outcomes
         → CTA: "Run Revenue Assessment"
```

### Path 4: Mobile Navigation
```
Mobile menu → Revenue Operations
            → Select pillar
            → revops.html#section
            → Read details
            → CTA in footer
```

---

## 🔗 Internal Linking Strategy

### Homepage Links to RevOps Page
```
Navigation Dropdown (5 pillars)
  ↓
revops.html#capture
revops.html#conversion
revops.html#retention
revops.html#intelligence
revops.html#control

Footer Links (5 pillars)
  ↓
Same as navigation

Feature Section Links
  ↓
"Explore Revenue Ops" → revops.html
"See Revenue Intelligence" → revops.html#intelligence
"View security & compliance" → revops.html#control
```

**Total:** 19 links from homepage to RevOps page

---

## 📱 Mobile Menu Structure

```
☰ Mobile Menu
├── Revenue Operations
│   ├── Revenue Capture
│   ├── Revenue Conversion
│   ├── Revenue Retention
│   ├── Revenue Intelligence
│   └── Revenue Control
├── Resources
│   ├── Documentation
│   ├── Blog
│   └── Security & Compliance
├── Customers
├── Pricing
└── Actions
    ├── Sign in
    └── Start for free
```

---

## 🎨 Page Templates

### Template A: Homepage
**Used by:** index.html
**Sections:**
- Hero with CTA
- Testimonial bar
- Feature tabs
- Numbered features (01-04)
- Customer logos
- Testimonial cards
- Final CTA
- Footer

### Template B: Deep Dive Platform
**Used by:** revops.html
**Sections:**
- Hero
- 5 pillar sections (scrollable with anchors)
- Key differentiator callout
- Final CTA
- Footer

### Template C: Product Detail
**Used by:** ai-receptionist.html, ai-scribe.html, medical-assistant.html
**Note:** Bootstrap-based, maintained for legacy/detail views

---

## 🎯 CTA Distribution

### Primary CTAs (Homepage)
1. Hero: "See Where You're Losing Revenue"
2. Hero: "Run a Revenue Ops Assessment"
3. Email form: "Get started"
4. Final CTA: "Run a Revenue Assessment"
5. Final CTA: "See the platform"

### Primary CTAs (RevOps Page)
1. Hero: "Run a Revenue Assessment"
2. Hero: "Talk to sales"
3. Final CTA: "Run a Revenue Assessment"
4. Final CTA: "Talk to sales"

**Action-oriented:** All CTAs focus on assessment, outcomes, not generic "free trial"

---

## 🔍 SEO & Anchor Structure

### Homepage Anchors
```
#customers
#features (implied by tabs)
```

### RevOps Page Anchors
```
#capture
#conversion
#retention
#intelligence
#control
```

**Usage:** Direct links in navigation, footer, and internal CTAs

---

## 🎨 Visual Hierarchy

### Homepage Flow
```
1. Hero (Revenue Operations for Clinical Practices)
   ↓
2. Testimonial (Social proof)
   ↓
3. Feature Tabs (Quick overviews of 4 pillars)
   ↓
4. Numbered Features (Deep dive 01-04)
   ↓
5. Customer Logos (Trust signals)
   ↓
6. Testimonials (Use cases)
   ↓
7. Final CTA (Action)
```

### RevOps Page Flow
```
1. Hero (AI-Native RevOps)
   ↓
2. Revenue Capture (Pillar 01)
   ↓
3. Revenue Conversion (Pillar 02)
   ↓
4. Revenue Retention (Pillar 03)
   ↓
5. Revenue Intelligence (Pillar 04)
   ↓
6. Revenue Control (Pillar 05)
   ↓
7. Differentiator Section (Systems, Execution, Agents)
   ↓
8. Final CTA (Action)
```

---

## 📊 Content Density

### Homepage
- **Word count:** ~2,500 words
- **Sections:** 8 major sections
- **CTAs:** 5 primary, multiple secondary
- **Images:** Dashboard mockups, workflow visuals, charts

### RevOps Page
- **Word count:** ~3,000 words
- **Sections:** 5 pillar sections + hero + CTA
- **CTAs:** 4 primary
- **Images:** Dashboard mockups, workflow visuals, charts, compliance badges

---

## 🎯 Conversion Funnel

```
┌─────────────────────────┐
│   Land on Homepage      │
│   (SEO, Ads, Referral)  │
└───────────┬─────────────┘
            ↓
┌─────────────────────────┐
│   Engage with Content   │
│   (Tabs, Features)      │
└───────────┬─────────────┘
            ↓
┌─────────────────────────┐
│   Explore RevOps Page   │
│   (Deep dive pillars)   │
└───────────┬─────────────┘
            ↓
┌─────────────────────────┐
│   Click CTA             │
│   (Revenue Assessment)  │
└───────────┬─────────────┘
            ↓
┌─────────────────────────┐
│   Cal.com Booking       │
│   (Discovery Call)      │
└─────────────────────────┘
```

**Key Insight:** Two-page core experience (Homepage + RevOps) drives to single action: Revenue Assessment

---

## 🎨 Component Consistency

### Used Across Both Pages
- ✅ Navigation (same structure)
- ✅ Feature tabs (same style)
- ✅ Dashboard mockups (same design)
- ✅ Numbered sections (same layout)
- ✅ CTA buttons (same styling)
- ✅ Footer (same structure)
- ✅ Mobile menu (same behavior)

**Result:** Seamless, consistent experience

---

## 📱 Responsive Breakpoints

```
Desktop:   > 1024px   (Full nav, tabs side-by-side)
Tablet:    768-1024px (Stacked tabs, collapsible nav)
Mobile:    < 768px    (Hamburger menu, vertical tabs)
```

All RevOps content responsive across breakpoints.

---

## 🚀 Performance

### Page Load Priority
1. **Above fold:** Hero, Navigation
2. **Lazy load:** Images, mockups
3. **Deferred:** Analytics, Cal.com embed

### Asset Loading
- Fonts: Google Fonts (Inter)
- Icons: Font Awesome CDN
- Scripts: Local script.js, Cal.com embed
- Styles: Local styles.css

---

This structure ensures clear information architecture, intuitive navigation, and consistent brand experience across the entire site.
