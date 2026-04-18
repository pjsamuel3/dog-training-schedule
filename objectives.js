// Objective library — default set maintained by the trainer.
// Each entry maps to a key used in CONFIG.goals.
// The app reads only the objectives listed in CONFIG.goals, in that order.

const OBJECTIVES = {

  "less-barking": {
    label:           "Less barking",
    description:     "Nova learns that quiet is more rewarding than barking.",
    category:        "impulse-control",
    reactivityTriggers: ["doorbell", "passers-by", "other dogs", "excitement"],
    targetReps:      60,
    sessionReps:     5,
    expectedWeeks:   6,
    successCriteria: "Nova stays quiet for 10 seconds after trigger, 4 out of 5 attempts",
    stages: [
      { label: "Mark and reward quiet moments",         targetReps: 20 },
      { label: "Introduce 'quiet' cue on low triggers", targetReps: 20 },
      { label: "Generalise to real-world triggers",     targetReps: 20 }
    ]
  },

  "less-reactivity-dogs": {
    label:           "Calm around dogs",
    description:     "Nova can pass or observe other dogs without lunging or barking.",
    category:        "reactivity",
    reactivityTriggers: ["dogs on lead", "dogs off lead at distance"],
    targetReps:      80,
    sessionReps:     5,
    expectedWeeks:   8,
    successCriteria: "Nova walks past a stationary dog at 5m without reacting, 4 out of 5 passes",
    stages: [
      { label: "Focus on handler around dogs at distance", targetReps: 25 },
      { label: "Loose-lead walking with dogs in view",     targetReps: 30 },
      { label: "Pass dogs at close range",                 targetReps: 25 }
    ]
  },

  "less-reactivity-people": {
    label:           "Calm around strangers",
    description:     "Nova greets or ignores unfamiliar people without jumping or barking.",
    category:        "reactivity",
    reactivityTriggers: ["strangers approaching", "joggers", "cyclists"],
    targetReps:      60,
    sessionReps:     5,
    expectedWeeks:   6,
    successCriteria: "Nova keeps four paws on the floor when greeted by a stranger, 4 out of 5 attempts",
    stages: [
      { label: "Four-on-floor for family members",     targetReps: 15 },
      { label: "Four-on-floor for known visitors",     targetReps: 20 },
      { label: "Four-on-floor for unfamiliar people",  targetReps: 25 }
    ]
  },

  "less-reactivity-cats-horses": {
    label:           "Calm around cats & horses",
    description:     "Nova can observe cats and horses without barking or lunging.",
    category:        "reactivity",
    reactivityTriggers: ["cats", "horses"],
    targetReps:      50,
    sessionReps:     4,
    expectedWeeks:   8,
    successCriteria: "Nova holds a sit while a cat or horse passes at 10m, 3 out of 4 attempts",
    stages: [
      { label: "Look at that — mark calm glances",     targetReps: 20 },
      { label: "Sit and watch trigger at distance",    targetReps: 15 },
      { label: "Walk past trigger on loose lead",      targetReps: 15 }
    ]
  },

  "sit-and-wait": {
    label:           "Sit and wait",
    description:     "Nova sits on cue and holds position until released.",
    category:        "impulse-control",
    targetReps:      50,
    sessionReps:     5,
    expectedWeeks:   4,
    successCriteria: "Nova holds sit for 10 seconds with handler 2m away, 4 out of 5 attempts",
    stages: [
      { label: "Lure into sit",        targetReps: 15 },
      { label: "Hand signal only",     targetReps: 20 },
      { label: "Verbal cue, distance", targetReps: 15 }
    ]
  },

  "fetch-ball": {
    label:           "Fetch",
    description:     "Nova chases, picks up, and returns a ball reliably.",
    category:        "play",
    targetReps:      40,
    sessionReps:     4,
    expectedWeeks:   4,
    successCriteria: "Nova returns ball to hand and releases on 'drop it', 4 out of 4 throws",
    stages: [
      { label: "Chase and pick up",             targetReps: 10 },
      { label: "Return towards handler",         targetReps: 15 },
      { label: "Drop on cue at handler's feet",  targetReps: 15 }
    ]
  },

  "chill-out-settle": {
    label:           "Settle / chill out",
    description:     "Nova settles calmly on her mat or bed on cue.",
    category:        "impulse-control",
    targetReps:      50,
    sessionReps:     4,
    expectedWeeks:   5,
    successCriteria: "Nova goes to mat and stays for 5 minutes with household activity around her, 3 out of 4 attempts",
    stages: [
      { label: "Go to mat on lure",              targetReps: 15 },
      { label: "Stay on mat with distractions",  targetReps: 20 },
      { label: "Settle for extended periods",    targetReps: 15 }
    ]
  },

  "trick-paw": {
    label:           "Trick — Paw",
    description:     "Nova raises and places her paw in a handler's open hand on cue.",
    category:        "tricks",
    targetReps:      30,
    sessionReps:     5,
    expectedWeeks:   2,
    successCriteria: "Nova offers paw on verbal cue alone, 4 out of 5 attempts",
    stages: [
      { label: "Lure paw lift with treat",     targetReps: 10 },
      { label: "Open hand cue",                targetReps: 10 },
      { label: "Verbal cue only",              targetReps: 10 }
    ]
  },

  "trick-circle-tree": {
    label:           "Trick — Circle the tree",
    description:     "Nova walks a full circle around an object (post, person, tree) on cue.",
    category:        "tricks",
    targetReps:      30,
    sessionReps:     4,
    expectedWeeks:   3,
    successCriteria: "Nova completes a full circle around a stationary object on hand signal, 4 out of 4 attempts",
    stages: [
      { label: "Lure half circle",            targetReps: 10 },
      { label: "Lure full circle",            targetReps: 10 },
      { label: "Hand signal, no lure",        targetReps: 10 }
    ]
  }

};
