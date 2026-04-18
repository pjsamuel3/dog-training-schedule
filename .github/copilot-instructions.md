# Copilot Instructions — Nova's Training Schedule

## What this is

A family training-schedule app for Nova, an 18-month-old Norsk Buhund. The Samuel family (2 parents + 3 children aged 9–14) use it daily to log training reps, check feeding times, and track Nova's progress through a structured programme set by their dog trainer.

Hosted on GitHub Pages at https://pjsamuel3.github.io/dog-training-schedule/

**Audience:** Families on their phones in the kitchen or garden. Short bursts — tap a rep, check a feeding, see today's task. Not read like a document.

---

## Stack — keep it simple

- **Single file:** everything in `index.html` — CSS in `<style>`, JS in `<script>`
- **Data files loaded as plain `<script src="">` tags** — `config.js`, `objectives.js`, `plan/schedule.js`
- **No build tools, no frameworks, no npm** (npm is dev-only for Playwright tests)
- **Google Fonts only** as external dependency
- **GitHub Pages** compatible — no server-side code, relative paths only
- **localStorage** for all runtime state — key `nova-state`
- **GitHub API** for cross-device sync — writes to `state.json` in the repo

---

## Architecture

```
index.html           ← single-file app (CSS + HTML + JS)
config.js            ← dog, family, session, feeding, active goals (committed, no secrets)
objectives.js        ← objective library with stages and rep targets
plan/schedule.js     ← weekly tasks maintained by the trainer
feedback/            ← WhatsApp notes pasted as YYYY-MM-DD.md files
state.json           ← cross-device sync target (written via GitHub API)
```

### Data flow

1. `config.js`, `objectives.js`, `plan/schedule.js` load as `<script>` tags
2. App reads `localStorage.getItem('nova-state')` on load
3. State is merged with remote `state.json` via GitHub API on load
4. All user actions (reps, done, fed) write back to `localStorage` and queue a sync

### State shape (`nova-state`)

```js
{
  user:     "Pete",
  reps:     { "less-barking": 14 },          // cumulative, no timestamps (KISS)
  tasks:    { "2026-04-18": { "less-barking": true } },  // done flags keyed by date
  feeding:  { "2026-04-18": { "08:00": { fed: true, by: "Pete", at: "08:32" } } },
  celebrated: { "fetch-ball": true },        // confetti fired once per objective
  observations: { "less-barking": { text: "Good session", date: "2026-04-18", by: "Marianne" } },
  lastSync: "2026-04-18T08:32:00.000Z"
}
```

Merge strategy (cross-device via GitHub API): reps = max, tasks/feeding = union, celebrated = OR, observations = newest date wins per objective.

---

## Design system

### Colour tokens (all colours from these tokens — no raw hex in components)

```css
--bg:          #F4F1EC;   /* warm linen — page background */
--ink:         #2B2D28;   /* deep forest — primary text */
--accent:      #7B9E87;   /* sage green — primary action / highlight */
--accent-dark: #5C8268;   /* darker sage — hover states */
--accent-bg:   #EBF0EC;   /* light sage tint — active states, badges */
--blush:       #C9A99A;   /* dusty rose — secondary accent, celebrations */
--blush-bg:    #F5EBE8;   /* light blush tint — secondary badges */
--card-bg:     #FDFAF6;   /* warm white — card surfaces */
--card-border: #E5DDD3;   /* warm stone — card borders */
--muted:       #9A948C;   /* warm grey — metadata, labels, tips */
--white:       #FFFFFF;
```

### Typography

| Token | Family | Use |
|-------|--------|-----|
| `--f-display` | `Playfair Display`, Georgia, serif | Dog name, section headings, card titles |
| `--f-body` | `DM Sans`, system-ui, sans-serif | All body copy, labels, UI, buttons |

### Type scale

| Token | Size | Use |
|-------|------|-----|
| `--text-xs`   | 0.75rem  | Metadata, timestamps, badges |
| `--text-sm`   | 0.875rem | Labels, tips, secondary text |
| `--text-base` | 1rem     | Body copy |
| `--text-lg`   | 1.125rem | Card headings |
| `--text-xl`   | 1.375rem | Section headings |
| `--text-2xl`  | 1.75rem  | Hero / week goal |
| `--text-3xl`  | 2.25rem  | Dog name / display mode |

### Shadows & radii

```css
--shadow-sm: 0 1px 4px rgba(43,45,40,.06);
--shadow-md: 0 4px 18px rgba(43,45,40,.10);
--r-sm:   8px;
--r-md:   16px;
--r-pill: 999px;
```

### Aesthetic direction

Kinfolk magazine meets Scandi dog brand. Calm, warm, minimal. Outdoors and forest undertones. Feminine without being fussy. Suitable for a kitchen shelf next to a linen apron.

---

## Sections

| ID | Nav label | Purpose |
|----|-----------|---------|
| `#today` | Today 🐾 | This week's goal, today's tasks, rep counting |
| `#overview` | Overview ◎ | Gamified training dashboard — progress, objective cards, rewards |
| `#feeding` | Feeding 🥣 | Twice-daily food log, check-off per family member |
| `#calendar` | Journey 🗓 | Full programme timeline, expandable weekly task cards |

`#progress` has been replaced by `#overview`. Rep-logging (+/−) lives inside Overview objective cards only.

Ambient/display mode: `?mode=display` — full-screen cycling slides, kitchen screen.

---

## Component patterns

### Task card (`.task-card`)

```html
<article class="task-card fade-up" data-id="sit-and-wait">
  <div class="task-header-row">
    <span class="task-category">🧠 impulse-control</span>
    <span class="task-reps-target">5 reps</span>
  </div>
  <h3 class="task-title">Sit and wait</h3>
  <p class="task-instruction">Hold a treat above Nova's nose…</p>
  <p class="task-tip">If she jumps up, turn away and reset.</p>
  <div class="task-actions">
    <button class="btn-rep" onclick="logRep('sit-and-wait')">
      <span class="rep-count">0</span>
      <span class="rep-label">reps</span>
    </button>
    <button class="btn-done" onclick="toggleDone('sit-and-wait')">Done today</button>
  </div>
</article>
```

- Add `.done-today` to card when task is complete
- Add `.active` to `.btn-done` when complete
- Young child view (`.view-young-child` on body): hide `.task-tip`, larger font, full-width buttons

### Overview dashboard

Replaces the old `#progress` tab. Built by `renderOverview()`.

**Hero strip** — tier label + rep sub + animated bar:
```html
<div class="overview-hero">
  <h2 class="overview-hero-tier" id="overviewTier">Building momentum</h2>
  <p class="overview-hero-sub" id="overviewRepSub">147 of 450 reps — keep going!</p>
  <div class="overview-hero-bar-track">
    <div class="overview-hero-bar-fill" id="overviewHeroBar" style="width:33%"></div>
  </div>
</div>
```

Tier labels (% of total reps): Just getting started · Building momentum · Good progress · Almost there! · One last push! · Programme complete!

**Category mini-bars** — one row per category (Reactivity · Impulse Control · Tricks · Play):
```html
<div class="category-bar-row">
  <div class="category-bar-header">
    <span class="category-bar-label">Reactivity</span>
    <span class="category-bar-pct">33%</span>
  </div>
  <div class="category-bar-track"><div class="category-bar-fill" style="width:33%"></div></div>
</div>
```

**Objective cards** — one per active `CONFIG.goals` entry:
```html
<article class="overview-obj-card" data-id="less-barking">
  <div class="overview-obj-header">
    <h3 class="overview-obj-title">Less barking</h3>
    <span class="obj-cat-chip">⚡ reactivity</span>
    <span class="obj-status-badge in-progress">In progress</span>
  </div>
  <p class="overview-obj-stage">Stage 1 of 3 — Mark and reward quiet moments</p>
  <button class="stage-breakdown-btn" aria-expanded="false" onclick="toggleStageBreakdown(this)">
    ▶ Stages
  </button>
  <div class="stage-breakdown-panel"><!-- stage list --></div>
  <div class="overview-rep-bar-track">
    <div class="overview-rep-bar-fill" style="width:23%"></div>
  </div>
  <p class="overview-rep-meta">14 / 60 reps · 23%</p>
  <div class="overview-rep-counter">
    <button onclick="decrementRep('less-barking')">−</button>
    <span>14</span>
    <button onclick="logRep('less-barking')">+</button>
  </div>
  <!-- trainer note snippet (blush tint) when feedbackCache has a match -->
  <div class="overview-trainer-note">...</div>
  <!-- family note block + inline form -->
  <div class="overview-family-note">...</div>
  <!-- completion reward block — shown when reps >= targetReps -->
  <div class="overview-reward-block">
    Show this code to your trainer: <strong>NOVA5OFF</strong>
  </div>
</article>
```

Status badge values: `just-started` · `in-progress` · `almost-there` · `last-push` · `complete`

**Family observation notes** — per-objective, inline form in each objective card:
- Stored in `state.observations[id] = { text, date, by }` — synced via state.json
- Newest date wins on merge (cross-device)
- `showNoteForm(id)` / `cancelNote(id)` / `saveNote(id)` manage the inline textarea

**Completion reward + confetti:**
- `state.celebrated[id]` tracks first-fire per objective (persisted to state.json)
- `fireConfetti()` — 110 vanilla canvas particles, 3.5s, no library
- Reward code from `CONFIG.completionReward.code`

### Feeding card (`.feeding-card`)

```html
<article class="feeding-card" data-time="08:00">
  <!-- add .fed / .overdue / .due-now as appropriate -->
  <span class="feeding-icon">🥣</span>
  <div class="feeding-body">
    <div class="feeding-row1">
      <span class="feeding-label">Morning</span>
      <span class="feeding-time">08:00</span>
    </div>
    <p class="feeding-amount">1.5 cups</p>
    <!-- when fed: -->
    <p class="feeding-done">Fed by Marianne at 08:12</p>
    <!-- when overdue: -->
    <p class="feeding-overdue">Overdue</p>
    <button class="btn-feed" onclick="markFed('08:00')">Mark as fed</button>
  </div>
</article>
```

### Timeline week (`.timeline-week`) — expandable

```html
<div class="timeline-week current" <!-- past | current | future -->>
  <div class="week-dot current"></div>  <!-- done | current -->
  <div class="week-content">
    <span class="week-num">Week 6 <span class="week-current-badge">Now</span></span>
    <h4 class="week-title">Confidence and real world</h4>
    <p class="week-focus">Less reactivity · Fetch</p>
    <!-- expand toggle (generated by renderCalendar) -->
    <button class="week-expand-btn" aria-expanded="true" onclick="toggleWeekExpand(this)">
      <span class="expand-chevron">▶</span> This week's tasks
    </button>
    <!-- expandable panel — open class added by toggleWeekExpand() -->
    <div class="week-tasks open">
      <span class="journey-state-label">Completed</span>  <!-- past weeks only -->
      <p class="week-task-trainer-note">"Push further from home…"</p>
      <article class="journey-task-card">
        <!-- task-header-row, task-title, task-instruction, task-tip (same as task-card but no buttons) -->
      </article>
    </div>
  </div>
</div>
```

- Current week: `aria-expanded="true"`, panel open on load
- Past weeks: panel at 55% opacity (`.timeline-week.past .week-tasks { opacity: .55 }`)
- `toggleWeekExpand(btn)` rotates the `▶` chevron and toggles `.open` on the sibling panel

### Trainer note (`.trainer-note`)

```html
<div class="trainer-note" id="trainerNote">
  <span class="note-icon">📝</span>
  Trainer note text here.
</div>
```

Hidden (`display:none`) for young-child role. Always visible for parent.

---

## Role-based views

Body gets one of these classes after user selection:

| Class | Who | Differences |
|-------|-----|-------------|
| `view-parent` | Marianne, Pete | Sees all tasks, trainer note, tips |
| `view-child` | Ella (14), Matteo (12) | All tasks, tips visible, no trainer note (same as parent in practice) |
| `view-young-child` | Oliver (9) | One task at a time, no tips, larger text, full-width buttons |

---

## Key JS functions

```js
getState()               // → parsed nova-state from localStorage
saveState(updates)       // deep-merge updates into nova-state
getCurrentWeek()         // → 1–6, computed from phaseStartDate
getWeekData()            // → SCHEDULE['week' + n]
getCurrentUser()         // → CONFIG.family entry for current user
getUserRole()            // → 'parent' | 'child' | 'young-child' | 'guest'
logRep(objectiveId)      // increments reps[id], re-renders Today + Overview, triggers sync
decrementRep(objectiveId)// decrements reps[id], re-renders, triggers sync
toggleDone(objectiveId)  // toggles tasks[today][id], re-renders card
markFed(time)            // records feeding[today][time] with user + timestamp
showPicker()             // shows picker overlay
selectUser(name)         // saves user to state, hides picker, re-renders
renderOverview()         // builds Overview dashboard (hero, category bars, obj cards)
renderCalendar()         // builds Journey timeline with expandable week panels
toggleWeekExpand(btn)    // expand/collapse a week's task panel in Journey
toggleStageBreakdown(btn)// expand/collapse stage list on an Overview objective card
fireConfetti()           // 110-particle canvas burst, no library
showNoteForm(id)         // show inline observation note textarea on objective card
saveNote(id)             // persist note to state.observations + sync
cancelNote(id)           // hide note form without saving
copyRewardCode(btn)      // clipboard copy of CONFIG.completionReward.code
scheduleSyncPush()       // debounced 3s GitHub API PUT of state.json
```

---

## Config files

### `config.js` (committed — no secrets)

```js
const CONFIG = {
  dog:     { name, breed, age, photo },
  family:  [{ name, role, age? }],   // role: 'parent' | 'child', age required for children
  session: { day, time, programStartDate, phaseStartDate, sessionsComplete },
  feeding: [{ time, amount, label }],
  goals:   ["objective-id", ...],    // active objectives in display order
  github:  { owner, repo },          // public — token NEVER goes here
  completionReward: { code: "NOVA5OFF", message: "5% off your next training package" }
};
```

### Token storage (NEVER in source files)

```js
// In browser console / family setup:
localStorage.setItem('nova-github-token', 'github_pat_...');
```

---

## Trainer workflow

The trainer maintains `objectives.js` and `plan/schedule.js` by committing changes via PR. The family does not edit these files. Rep counts live in localStorage + `state.json` only.

### Adding a week to the schedule

Add a new `weekN` entry to `SCHEDULE` in `plan/schedule.js`. Each daily task:

```js
{
  objective:   "less-barking",        // key from OBJECTIVES / CONFIG.goals
  stage:       0,                     // 0-indexed stage from OBJECTIVES[id].stages
  instruction: "When Nova is quiet…", // shown to family member
  reps:        5,                     // target reps for this session
  tip:         "Keep treats in your pocket.", // hidden for young child
  assignedTo:  "Pete"                 // optional — omit to show to all
}
```

---

## Conventions

- **Mobile-first:** 375px base, `@media (min-width: 640px)` for larger screens
- **Animations:** `.fade-up` class + `IntersectionObserver` adds `.in` on scroll into view
- **Accessibility:** sections use `aria-labelledby`; interactive elements have `aria-label`
- **No inline hex values** — all colours from CSS tokens
- **No JS libraries** — vanilla only
- **Safe-area padding:** `env(safe-area-inset-bottom)` on body and bottom nav for notched phones

---

## PR workflow

- Branch: `feature/`, `fix/`, `content/`, `trainer/`
- One logical change per PR — squash merge to main
- Merge to `main` → GitHub Pages auto-deploys (~60 seconds)
- Trainer uses `trainer/` prefix for schedule and objective updates
