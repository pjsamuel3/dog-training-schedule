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
  user:  "Pete",           // current family member name
  reps:  { "less-barking": 14, "sit-and-wait": 7 },  // cumulative rep counts
  done:  { "2026-04-18": ["less-barking"] },           // tasks completed today
  fed:   { "2026-04-18": { "08:00": { user: "Marianne", time: "08:32" } } },
  lastSync: "2026-04-18T08:32:00.000Z"
}
```

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
| `#progress` | Progress 📊 | Rep counters per objective, stage dots, progress bars |
| `#feeding` | Feeding 🥣 | Twice-daily food log, check-off per family member |
| `#calendar` | Journey 🗓 | Full programme timeline from `programStartDate` |

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

### Progress card (`.progress-card`)

```html
<article class="progress-card fade-up" data-id="less-barking">
  <div class="progress-header-row">
    <h3 class="progress-title">Less barking</h3>
    <span class="progress-stage-badge">Stage 1</span>
    <!-- or when complete: -->
    <span class="progress-badge-done">⭐ Complete</span>
  </div>
  <p class="progress-stage-name">Mark and reward quiet moments</p>
  <div class="progress-bar-track">
    <div class="progress-bar-fill" style="width:41%"></div>
    <!-- add .graduated when 100% complete -->
  </div>
  <div class="progress-meta-row">
    <span>14 / 60 reps</span>
    <span>46 to go</span>
  </div>
  <div class="stage-dots">
    <span class="stage-dot done"></span>
    <span class="stage-dot active"></span>
    <span class="stage-dot"></span>
  </div>
</article>
```

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

### Timeline week (`.timeline-week`)

```html
<div class="timeline-week current" <!-- past | current | future -->>
  <div class="week-dot current"></div>  <!-- done | current -->
  <span class="week-num">Week 6 <span class="week-current-badge">Now</span></span>
  <h3 class="week-title">Confidence and real world</h3>
  <p class="week-focus">Primary focus: less-reactivity-dogs</p>
  <p class="week-trainer-note">"Push further from home…"</p>
</div>
```

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
logRep(objectiveId)      // increments reps[id], triggers sync
toggleDone(objectiveId)  // toggles done[today][id], re-renders card
markFed(time)            // records fed[today][time] with user + timestamp
showPicker()             // shows picker overlay
selectUser(name)         // saves user to state, hides picker, re-renders
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
  github:  { owner, repo }           // public — token NEVER goes here
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
