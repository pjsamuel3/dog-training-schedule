const CONFIG = {

  // ─── Dog ────────────────────────────────────────────────────────────────────

  dog: {
    name:   "Nova",
    breed:  "Norsk Buhund",
    age:    "18 months",
    photo:  null   // drop a filename here e.g. "nova.jpg" to show in the hero
  },

  // ─── Family ─────────────────────────────────────────────────────────────────

  family: [
    { name: "Marianne", role: "parent" },
    { name: "Pete",     role: "parent" },
    { name: "Ella",     role: "child",  age: 14 },
    { name: "Matteo",   role: "child",  age: 12 },
    { name: "Oliver",   role: "child",  age: 9  }
  ],

  // ─── Training sessions ──────────────────────────────────────────────────────

  session: {
    day:              "Saturday",
    time:             "10:00",
    programStartDate: "2024-11-01",   // when Nova's training programme began
    phaseStartDate:   "2026-03-14",   // first Saturday of the current 6-session phase
    sessionsComplete: 6               // sessions completed so far in this phase
  },

  // ─── Feeding schedule ───────────────────────────────────────────────────────

  feeding: [
    { time: "08:00", amount: "1.5 cups", label: "Morning" },
    { time: "16:00", amount: "1 cup",    label: "Afternoon" }
  ],

  // ─── Active goals ───────────────────────────────────────────────────────────
  // Reference keys from the objective library (objectives.js).
  // The trainer controls which objectives are active and in what order.

  goals: [
    "less-barking",
    "less-reactivity-dogs",
    "less-reactivity-people",
    "less-reactivity-cats-horses",
    "sit-and-wait",
    "fetch-ball",
    "chill-out-settle",
    "trick-paw",
    "trick-circle-tree"
  ],

  // ─── Sync ───────────────────────────────────────────────────────────────────
  // owner + repo are public. The GitHub token is NEVER stored here.
  // Store it in localStorage only:
  //   localStorage.setItem('nova-github-token', 'your-token-here')
  // Or create config.private.js (gitignored) with:
  //   window.GITHUB_TOKEN = 'your-token-here';

  github: {
    owner: "pjsamuel3",
    repo:  "dog-training-schedule"
  },

  // ─── Completion reward ──────────────────────────────────────────────────────
  // Shown when the family completes an objective. Trainer sets the code.

  completionReward: {
    code:    "NOVA5OFF",
    message: "5% off your next training package"
  }

};
