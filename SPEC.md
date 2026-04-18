# Nova — Site Spec

## Audience
Families on their phones in the kitchen or garden, and on a tablet mounted or propped in the kitchen. Parents and children (ages 9–14). Used in short bursts — checking today's task, logging a feeding, tapping a rep count. Not read like a document.

## The one job of this page
Give every family member one clear thing to do with Nova today — and make it easy to log that they did it.

## Sections

| Anchor | Label | Purpose |
|--------|-------|---------|
| `#today` | Today | This week's goal, today's tasks, who's done what |
| `#progress` | Progress | Rep counters per objective, stage indicator |
| `#feeding` | Feeding | Food log — times, amounts, check-off by name |
| `#calendar` | Journey | Milestone timeline, full programme overview |

Ambient/display mode is a separate URL param (`?mode=display`) — not a nav section.

---

## Aesthetic direction

**Reference:** Kinfolk magazine meets Scandi dog brand. The kind of thing that looks at home on a kitchen shelf next to a linen apron and a wooden pepper grinder.

**Mood:** Calm, warm, minimal. Outdoors and forest undertones. Feminine without being fussy.

**Palette:**

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#F4F1EC` | Warm linen — page background |
| `--ink` | `#2B2D28` | Deep forest — primary text |
| `--accent` | `#7B9E87` | Sage green — primary action / highlight |
| `--accent-bg` | `#EBF0EC` | Light sage tint — active states, badges |
| `--blush` | `#C9A99A` | Dusty rose — secondary accent, celebrations |
| `--blush-bg` | `#F5EBE8` | Light blush tint — secondary badges |
| `--card-bg` | `#FDFAF6` | Warm white — card surfaces |
| `--card-border` | `#E5DDD3` | Warm stone — card borders |
| `--muted` | `#9A948C` | Warm grey — metadata, labels, tips |

**Rule:** every colour in the site comes from these tokens. No hex codes in components.

**Fonts (Google Fonts, 2 families):**

| Token | Family | Use |
|-------|--------|-----|
| `--f-display` | `Playfair Display`, Georgia, serif | Section headings, dog name, hero |
| `--f-body` | `DM Sans`, system-ui, sans-serif | All body copy, labels, UI |

**Type scale:**

| Token | Size | Use |
|-------|------|-----|
| `--text-xs` | 0.75rem | Metadata, timestamps |
| `--text-sm` | 0.875rem | Labels, tips, secondary text |
| `--text-base` | 1rem | Body copy |
| `--text-lg` | 1.125rem | Card headings |
| `--text-xl` | 1.375rem | Section headings |
| `--text-2xl` | 1.75rem | Hero / week goal |
| `--text-3xl` | 2.25rem | Dog name / display mode |

**Shadows & radii:**

```css
--shadow-sm: 0 1px 4px rgba(43, 45, 40, .06);
--shadow-md: 0 4px 18px rgba(43, 45, 40, .10);
--r-sm:   8px;
--r-md:   16px;
--r-pill: 999px;
```

---

## Navigation

- **Mobile/tablet:** fixed bottom tab bar — thumb-reachable, 4 tabs (Today · Progress · Feeding · Journey)
- **Desktop / kitchen screen:** sticky top bar, frosted glass
- Active state via `IntersectionObserver`

---

## Technical requirements

- Single `index.html` — CSS in `<style>`, JS in `<script>`
- `config.js`, `objectives.js`, `plan/schedule.js` loaded as `<script src="">` tags
- Google Fonts as only external dependency
- No frameworks, no build tools
- Mobile-first, 375px baseline
- GitHub Pages compatible

---

## GitHub Pages

- Repo: `pjsamuel3/dog-training-schedule`
- Live URL: `https://pjsamuel3.github.io/dog-training-schedule/`
- Deploy from: `main` branch, `/` root
