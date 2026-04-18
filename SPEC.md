# Nova — Site Spec

## Audience
Families on their phones in the kitchen or garden, and on a tablet mounted or propped in the kitchen. Parents and children (ages 9–14). Used in short bursts — checking today's task, logging a feeding, tapping a rep count. Not read like a document.

## The one job of this page
Give every family member one clear thing to do with Nova today — and make it easy to log that they did it.

---

## View modes

The app has three modes. **Simple is the default** — everyone lands here. Modes are not roles; any family member can switch to Advanced whenever they want.

| Mode | Who | How to activate | What it shows |
|------|-----|-----------------|---------------|
| **Simple** | Everyone — default | — | Today's #1 task, one "Done it!" button, week label |
| **Advanced** | Engaged family members | Toggle on the Simple view | Full tabbed app: Today, Overview, Feeding, Journey |
| **Trainer** | Trainer only | Toggle in ⚙ Settings | Read-only Advanced + rep summary + WhatsApp templates + feedback form |

### Simple view (default)

The first thing anyone sees when they open the app. Deliberately minimal — no tabs, no nav bar, no counters.

**Layout (top to bottom):**
- Dog name + week label (`Week 6 — Consolidation`)
- This week's goal (one line)
- The **first daily task** for the current week — large card:
  - Objective name (display font, large)
  - Task instruction (readable body text)
  - A single prominent **"Done it! ✓"** button — marks the task done for today
- A small quiet link: **"See everything →"** — switches to Advanced view

**What it does NOT show:**
- Rep counters, progress bars, feeding log, journey timeline
- Multiple tasks — just one, the primary task for this week
- The bottom nav tab bar

**Done state:** When the task is marked done, the card shows a warm confirmation ("Nova would be proud 🐾") and the button becomes inactive for the rest of the day.

**Persistence:** Simple/Advanced preference stored in `localStorage('nova-view-mode')` — values `'simple'` (default) or `'advanced'`.

### Advanced view

The full tabbed app as currently built. Activated by tapping "See everything →" on the Simple view. A quiet **"Simple view ←"** link in the header returns to Simple.

Sections unchanged:

| Anchor | Label | Purpose |
|--------|-------|---------|
| `#today` | Today | This week's goal, today's tasks, who's done what |
| `#overview` | Overview | Gamified training dashboard — programme progress, objective cards, rewards |
| `#feeding` | Feeding | Food log — times, amounts, check-off by name |
| `#calendar` | Journey | Milestone timeline, full programme overview |

### Trainer view

Activated from ⚙ Settings → "Trainer view" toggle. Builds on Advanced view with read-only UI and trainer-specific tools. Stored in `localStorage('nova-trainer-mode')`.

Changes from Advanced:
- Rep +/− buttons, done toggles, feed buttons, family note forms hidden
- Feeding tab hidden
- Overview loads first
- "This week's progress" rep summary card at top of Overview
- Templates card at bottom of Overview (WhatsApp plan + feedback request + in-app feedback form)

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

## Trainer Mode

### Purpose
An overlay on top of Advanced view, designed for a less technical trainer to review progress at a glance or demo the app to prospective clients. The trainer should never feel lost or overwhelmed — data visible, actions hidden, templates ready to copy.

### Toggle
- A **Trainer mode** toggle in the settings drawer (same drawer as the GitHub PAT UI)
- Preference stored in `localStorage('nova-trainer-mode')` — persists across page loads
- Toggle label: "Trainer view" with a brief description: "Simplified layout for trainers"
- When active, body gets class `view-trainer`; all trainer-mode overrides use this class

### What changes in trainer mode

**Navigation:**
- Bottom nav reordered: Overview · Journey · Today (Feeding hidden — not relevant to trainer)
- Overview scrolls into view on load (not Today)

**Visual style — "old person mobile phone" principles:**
- All body text bumped up one step in the type scale
- Cards get extra vertical padding and larger touch targets
- Muted colour palette — less decoration, more data
- No fade-up animations (distracting on a demo)

**Content removed:**
- Family observation note forms (`.overview-family-note` textarea and save/cancel buttons) — trainer reads notes but does not write them
- Rep +/− buttons — trainer views counts, does not log
- Done toggles on Today task cards — read-only
- Mark-as-fed buttons on Feeding cards — read-only

**Content added (trainer-only):**
- A prominent **"This week's rep totals"** summary row at the top of Overview: each objective's reps logged vs target, in plain text (e.g. "Settle · 6 / 20 reps")
- A **Templates** card at the bottom of the Overview section (see Templates section below)

### What does NOT change
- All data is live — same `state.json`, same rep counts, same feedback files
- Journey expandable schedule works identically
- Settings drawer remains accessible so the trainer can toggle back

---

## Templates

### Purpose
Reduce friction in the trainer's weekly communication cycle. Two ready-to-send WhatsApp blocks generated from the current week's schedule — one to tell the family what to practise, one to ask how it went. A third flow lets the trainer (or family) fill in answers in-app and commit the result as a `feedback/YYYY-MM-DD.md` file via the GitHub API.

### Location
A **Templates card** rendered at the bottom of Overview in trainer mode (and accessible via a "Templates" button in the settings drawer in normal mode for the parent role).

---

### Template 1 — This week's plan (Trainer → Family)

A pre-formatted WhatsApp message summarising this week's top 3 tasks.

**Generated from:** `SCHEDULE[weekN].dailyTasks[0..2]` (first 3 tasks only)

**Format (copy-on-tap, monospace preview):**
```
🐾 Nova's training this week — Week N

1. [Objective label]
   [Task instruction]
   🎯 [reps] reps

2. [Objective label]
   [Task instruction]
   🎯 [reps] reps

3. [Objective label]
   [Task instruction]
   🎯 [reps] reps

Any questions, just message me!
```

**UI:** A card with a "Copy to clipboard" button (same pattern as `copyRewardCode`). Shows "Copied!" for 2s on tap.

---

### Template 2 — Feedback request (Trainer → Family)

A pre-formatted WhatsApp questionnaire to send to the family after the week. One question per top-3 task, phrased for a non-technical owner.

**Generated from:** `SCHEDULE[weekN].dailyTasks[0..2]`

**Format (copy-on-tap):**
```
Hi! Quick check-in on Nova's training this week 🐾

1. [Objective label] — how many times did you manage to practise, and how did Nova do?

2. [Objective label] — same question — any moments that stood out?

3. [Objective label] — any difficulties, or anything you'd like me to cover in Saturday's session?

Thanks so much!
```

**UI:** Same card with "Copy to clipboard" button.

---

### Template 3 — In-app feedback form (Trainer fills in owner's answers)

After the family reply on WhatsApp, the trainer reads the answers and logs them in-app. This saves the trainer from opening a code editor.

**UI flow:**
1. A "Log feedback" button in the Templates card opens a simple form overlay (same style as the PAT settings drawer)
2. The form shows the date (pre-filled: today, editable), then one labelled textarea per top-3 task:
   - Label: objective name
   - Placeholder: "Paste or type the family's response here…"
3. A **Save to GitHub** button commits a new `feedback/YYYY-MM-DD.md` file via the GitHub API PUT (same mechanism as `state.json` sync)
4. If a file already exists for that date, the new content is appended (not overwritten)

**Output file format** (`feedback/2026-04-25.md`):
```markdown
## [objective-id-1]
[answer text]

## [objective-id-2]
[answer text]

## [objective-id-3]
[answer text]
```

This matches the existing `feedbackCache` format that the app already parses — no new parsing logic needed.

**Token requirement:** Same GitHub PAT already stored for state.json sync. No additional setup.

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
