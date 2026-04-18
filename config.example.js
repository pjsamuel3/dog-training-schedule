const CONFIG = {

  // ─── Dog ────────────────────────────────────────────────────────────────────

  dog: {
    name:   "Your Dog's Name",
    breed:  "Breed",
    age:    "Age",
    photo:  null   // drop a filename here e.g. "buddy.jpg" to show in the hero
  },

  // ─── Family ─────────────────────────────────────────────────────────────────

  family: [
    { name: "Parent One", role: "parent" },
    { name: "Parent Two", role: "parent" },
    { name: "Child One",  role: "child",  age: 14 },
    { name: "Child Two",  role: "child",  age: 9  }
  ],

  // ─── Training sessions ──────────────────────────────────────────────────────

  session: {
    day:              "Saturday",        // day of the week sessions run
    time:             "10:00",           // session start time
    programStartDate: "2024-01-01",      // when training began (YYYY-MM-DD)
    phaseStartDate:   "2024-01-01",      // first session of the current phase
    sessionsComplete: 0                  // sessions completed in this phase
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
    "sit-and-wait",
    "chill-out-settle"
  ],

  // ─── Sync ───────────────────────────────────────────────────────────────────
  // Fine-grained GitHub token — scope: contents:write on this repo only.
  // Keeps state.json in sync across all family devices via GitHub.

  github: {
    owner: "github-username",
    repo:  "repo-name",
    token: null   // paste token here — never commit a real value to a public repo
  }

};
