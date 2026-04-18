# Dog Training Schedule

A personalised daily/weekly training companion for dog-owning families — built as a mobile-friendly static site that any household member can follow along with, from phone, tablet, or kitchen screen.

---

## Philosophy

The dog isn't the one being trained — the humans are. Progress comes from every family member applying consistent repetition and positive reinforcement, every day, between weekly sessions with the trainer.

---

## Deployment model

Each dog gets its own instance. The trainer (or owner) forks/clones this repo, fills in `config.js`, and deploys to GitHub Pages. One repo = one dog = one family.

---

## Configuration (`config.js`)

All personalisation lives in a single config file. No code changes needed.

```js
const CONFIG = {
  dog: {
    name: "Biscuit",
    breed: "Labrador",
    age: "2 years",
    photo: "biscuit.jpg"   // optional, drops into hero
  },

  owner: {
    name: "The Samuel Family",
    sessionDay: "Saturday",
    sessionTime: "10:00",
    startDate: "2026-04-19"   // first session date — drives the weekly plan position
  },

  family: [
    { name: "Pete",   role: "parent" },
    { name: "Sarah",  role: "parent" },
    { name: "Oli",    role: "child",  age: 12 },
    { name: "Mia",    role: "child",  age: 8  }
  ],

  goals: [
    "less-barking",
    "less-reactivity",
    "sit-and-wait",
    "dont-beg-for-food",
    "fetch-ball",
    "no-bark-cats-horses",
    "chill-out",
    "trick-paw",
    "trick-circle-tree"
  ]
};
```

---

## Weekly plan logic

- `startDate` anchors week 1. The app calculates the current week automatically.
- Each week maps to a set of active objectives from the training plan.
- Sessions run Saturdays at 10:00 — the app highlights the next session and counts down to it.
- After a session date passes, the app advances to the next week's plan.

---

## Family members & role-based expectations

Each family member has a role that determines what they see and what's expected of them:

| Role | What they see |
|------|--------------|
| `parent` | Full plan, all objectives, food log, trainer notes |
| `child` (age 10+) | Simplified instructions, their assigned activities, reward tracking |
| `child` (age <10) | One task at a time, large text, emoji-friendly, "well done" feedback |

Role and age are set in `config.js`. The app adapts content complexity accordingly.

---

## Objectives

Every activity in the schedule is backed by a structured objective:

```js
{
  id: "sit-and-wait",
  label: "Sit and wait",
  description: "Dog sits on command and holds position until released.",
  category: "impulse-control",
  setBy: "trainer",           // "trainer" | "owner" | "family"
  targetRepetitions: 50,      // total reps before graduating to next stage
  sessionReps: 5,             // reps per practice session
  expectedWeeks: 4,
  successCriteria: "Holds sit for 10 seconds with handler 2m away, 4/5 attempts",
  stages: [
    { label: "Lure into sit",          targetReps: 15 },
    { label: "Hand signal only",       targetReps: 20 },
    { label: "Verbal cue only",        targetReps: 15 }
  ]
}
```

### Objective library

- **Default library** — maintained by the trainer, covers common goals (barking, reactivity, recall, impulse control, tricks).
- **Custom objectives** — added by the owner or family for household-specific needs.
- The trainer selects and sequences objectives per dog when setting up the repo.

---

## Progress widget

Each active objective shows a small inline widget:

```
[Sit and wait]  ████████░░  38 / 50 reps  ~1 week to go
```

- Repetition count is stored in `localStorage` (per browser/device).
- Family members log reps as they complete them.
- Widget updates in real time. Graduating an objective triggers a celebration state.

---

## Food & daily care log

- Configurable feeding times (e.g. 07:30, 17:00).
- Each feeding slot shows a checkbox: "Fed by [name]?"
- State stored in `localStorage` keyed to the calendar date.
- Prevents double-feeding — once checked, shows who logged it and when.
- Resets at midnight.

---

## Calendar & milestones view

A scrollable overview of the full training programme:

- Weeks laid out as a timeline.
- Milestone markers at key graduation points (e.g. "Week 4 — Sit and wait mastered").
- Past weeks show completion status.
- Current week highlighted.
- Upcoming weeks show what's coming but are locked/greyed until reached.

Sets expectations for the whole journey upfront — owner can see roughly when each goal should be achieved.

---

## Owner feedback loop

After each session or practice, owners can submit feedback. The intended flow:

1. Owner sends a WhatsApp message to the trainer (voice note or text).
2. Trainer (or owner) adds a structured entry to `feedback/YYYY-MM-DD.md` in the repo.
3. The app reads feedback files and surfaces relevant notes against the matching objective.
4. Over time, feedback informs plan adjustments — the trainer updates objective parameters or sequencing.

Feedback file format:

```markdown
---
date: 2026-04-22
dog: Biscuit
objective: sit-and-wait
reporter: Pete
sentiment: positive
---

Held the sit for about 8 seconds today with me standing 1.5m away. Broke it when the cat walked past but recovered quickly on second attempt.
```

---

## Kitchen / ambient screen mode

A dedicated display URL (`index.html?mode=display`) optimised for always-on screens:

- Large text, high contrast.
- Rotates through: today's objectives → food timer countdown → this week's goal → next session countdown.
- No interaction needed — auto-cycles every 30 seconds.
- Works on any browser: smart TV, old iPad, laptop left open in the kitchen.

---

## This week's goal

Prominently displayed at the top of the app:

```
Week 3 of 12 — Sit and wait
"This week: 5 reps per session, 3 sessions per day.
 Every family member. Every time."
```

Set by the trainer in the weekly plan. Plain language, short, actionable.

---

## Project files

| File | Purpose |
|------|---------|
| `index.html` | The app — HTML, CSS, JS in one file |
| `config.js` | All personalisation: dog, family, goals, start date |
| `plan/` | Weekly training plan files (one per week, set by trainer) |
| `objectives/` | Objective library — default + custom |
| `feedback/` | Owner feedback entries (one file per session/date) |
| `RECIPE.md` | How to build and iterate on this site type |
| `SPEC-TEMPLATE.md` | Blank spec template |

---

## Architecture decisions

### State & sync — GitHub as the backend

No external database. No backend server. State is synced by writing a `state.json` file directly to the repo via the GitHub API, using a fine-grained personal access token scoped to that single repo.

- The app reads `state.json` on load (fetched from GitHub Pages or the raw GitHub URL).
- When a family member logs a rep, feeds the dog, or checks off a task, the app writes the update back to `state.json` via the GitHub API.
- Every device that loads the page sees the same state within seconds (GitHub Pages cache is short).
- The access token lives in `config.js`. It is scoped to **one repo, contents write only** — minimal blast radius if exposed.
- No personal data is stored beyond first names and dog names. No emails, no accounts, no passwords.

This is the entire sync stack. No backend, no database, no auth system.

### Trainer workflow — trainer owns the repos

- The trainer maintains a **template repo** (this one) with the default objective library and plan structure.
- For each new client, the trainer creates a new repo under their own GitHub account (fork or clone of the template).
- The owner is given the **GitHub Pages URL only** — they never touch GitHub.
- When the trainer wants to update a plan, they commit directly to the owner's repo from VS Code.
- GitHub Pages auto-deploys within ~60 seconds of each push.

### Owner feedback — manual, structured, low-friction

- Owner messages trainer via WhatsApp (voice note or text) after sessions or practice.
- Trainer pastes the feedback into a new file in `feedback/YYYY-MM-DD.md` in VS Code and commits.
- Format is simple enough to type in under a minute (see feedback format above).
- The app surfaces feedback notes inline against the relevant objective.
- No automation needed — the trainer is trained to do this efficiently.

---

## Privacy

The only personal data stored anywhere in this system is:
- First names (family members, in `config.js`)
- Dog's name and breed (in `config.js`)

No surnames, no contact details, no location data, no accounts. `config.js` and `state.json` live in a private or public GitHub repo owned by the trainer — their standard data handling applies.

---

## Status

Spec phase. No code yet — working through requirements before building.
