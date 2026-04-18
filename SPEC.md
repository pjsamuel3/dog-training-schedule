# Nova — Site Spec

## Audience
Families on their phones in the kitchen or garden, and on a tablet mounted or propped in the kitchen. Parents and children (ages 9–14). Used in short bursts — checking today's task, logging a feeding, tapping a rep count. Not read like a document.

## The one job of this page
Give every family member one clear thing to do with Nova today — and make it easy to log that they did it.

## Sections

| Anchor | Label | Purpose |
|--------|-------|---------|
| `#today` | Today | This week's goal, today's tasks, who's done what |
| `#overview` | Overview | Gamified training dashboard — programme progress, objective cards, rewards |
| `#feeding` | Feeding | Food log — times, amounts, check-off by name |
| `#calendar` | Journey | Milestone timeline, full programme overview |

`#overview` replaces the former `#progress` tab. Rep-logging (+/−) is now inline within each objective card in Overview — Progress is no longer a separate nav destination.

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

- **Mobile/tablet:** fixed bottom tab bar — thumb-reachable, 4 tabs (Today · Overview · Feeding · Journey)
- **Desktop / kitchen screen:** sticky top bar, frosted glass
- Active state via `IntersectionObserver`
- "Progress" tab removed; rep-logging lives inside Overview objective cards

---

## Overview Dashboard

### Purpose
Inspires the owner to keep training. Progress feels visible and rewarding rather than clinical. Gamified: every rep logged moves a bar, every objective completed earns a reward.

### Tone
Warm and encouraging. Phrases like "Building momentum" and "Almost there!" — not "33% complete". Language is for a dog owner in the kitchen, not a project manager.

### Layout (top to bottom)

**1. Hero progress strip**
- Big headline: progress tier label (see tiers below)
- Subtitle: total reps logged vs total target reps, written naturally ("147 of 450 reps — keep going!")
- Full-width animated progress bar in `--accent`

Progress tiers (based on total reps / total target reps):

| Range | Label |
|-------|-------|
| 0–15% | "Just getting started" |
| 16–40% | "Building momentum" |
| 41–70% | "Good progress" |
| 71–89% | "Almost there!" |
| 90–99% | "One last push!" |
| 100% | "Programme complete!" |

**2. Phase summary row**
- Sessions completed badge: `6 sessions · Phase started 14 Mar`
- Current week label from `SCHEDULE[weekN].label`
- Next Saturday session date (computed from today)

**3. Category mini-bars**
Four compact rows — one per category: Reactivity · Impulse Control · Tricks · Play
- Each: category label + slim progress bar (sum reps / sum targets for that category's active objectives)
- Lets the owner see at a glance which category needs attention

**4. Objective cards (the drill-down from old Progress)**
One card per active objective from `CONFIG.goals`, in order.

Each card contains:
- Header row: objective label + category chip + status badge
- Stage indicator: "Stage 2 of 3 — Loose-lead walking with dogs in view"
- Stage breakdown (expandable chevron): Stage 1 ✓ · Stage 2 ← current · Stage 3
- Rep progress bar: reps logged / targetReps, percentage
- Rep counter: `−` · count · `+` buttons (same action as old Progress)
- Trainer note (if present): blush-tinted snippet — date + first line

Status badge values:

| Condition | Badge | Colour |
|-----------|-------|--------|
| 0 reps | Just started | muted |
| 1 rep to 50% target | In progress | accent |
| 51–89% target | Almost there | blush |
| ≥ 90% target | One last push | blush, bold |
| = targetReps | Complete | accent, filled |

**5. Completion reward**
When `state.reps[id] >= OBJECTIVES[id].targetReps`:
- Card becomes "Complete" state: accent border, filled badge, stage breakdown all ticked
- On first completion detection: full-screen confetti burst (vanilla CSS + JS, no library)
- Inline reward block appears on the card:
  > "Objective complete! Show this code to your trainer:"
  > `[CONFIG.completionReward.code]` (large, copy-on-tap)
  > `[CONFIG.completionReward.message]`
- Confetti fires only once per objective — tracked via `state.celebrated: { objectiveId: true }` (small state addition)

### New config.js field

```js
completionReward: {
  code:    "NOVA5OFF",           // trainer sets this
  message: "5% off your next training package"
}
```

### Data sources (no new state shape beyond celebrated)

| Data | Source |
|------|--------|
| Rep counts | `state.reps[id]` |
| Rep targets | `OBJECTIVES[id].targetReps` and per-stage `targetReps` |
| Categories | `OBJECTIVES[id].category` |
| Phase/session info | `CONFIG.session` |
| Week label | `SCHEDULE[weekN].label` |
| Trainer notes | `feedbackCache` (same pipeline as Today) |
| Completion tracking | `state.celebrated[id]` (new, persisted to state.json) |

---

## Journey — Expandable Schedule

### Purpose
Let the family (and trainer) browse the full training plan — looking back at what was scheduled in past weeks and previewing what is coming up. Read-only: no rep logging here, that stays in Today and Overview.

### Behaviour

The existing timeline spine stays unchanged. Each week row gains an expand/collapse toggle.

**Default state:**
- Current week: expanded automatically
- All other weeks: collapsed (labels only, as today)

**On expand — any week shows:**
- Trainer note for that week (the same note shown in Today's header for the current week)
- The daily task cards planned for that week — read-only versions showing:
  - Objective label + category chip
  - Task instruction (full text)
  - Tip (parent view only; hidden for children as per role rules)
  - Rep target for the task (e.g. "5 reps · Stage 1")
  - No rep button, no done toggle — purely informational

**Past weeks** get a subtle visual treatment to signal they are history:
- Muted heading (already done)
- Task cards rendered at reduced opacity with a "Week N · completed" label
- No action buttons

**Future weeks** use forward-looking language:
- Task cards rendered normally (full colour)
- Label: "Coming up · Week N"

**Current week** is indistinguishable from Today's task list in content, but read-only here (tap Today to actually log).

### Data source
All task instructions come from `SCHEDULE[weekN].dailyTasks` — no new data needed. Rep targets are `task.reps`. Tip visibility follows the existing role rules (`getUserRole()`).

### What this does NOT show
- Per-week rep counts — reps are cumulative with no timestamps (KISS). The Overview section shows cumulative progress.
- Day-by-day done flags — `state.tasks` is keyed by date, not week; surfacing it here adds complexity for little gain.

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
