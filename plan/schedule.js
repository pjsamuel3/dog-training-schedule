// Weekly training schedule — maintained by the trainer.
// Each week maps to a primary focus, active objectives, and daily tasks.
// Week numbers are relative to CONFIG.session.phaseStartDate.
//
// Daily tasks are shown to family members each day.
// Each task references an objective ID from objectives.js.
// `assignedTo` is optional — omit to show to all family members.

const SCHEDULE = {

  week1: {
    label:       "Building the foundation",
    trainerNote: "Nova is still in the 'teenage' phase — keep sessions short (3–5 min max), end on a win every time. Reward generously.",
    primaryFocus: "sit-and-wait",
    objectives:  ["sit-and-wait", "chill-out-settle"],
    dailyTasks: [
      {
        objective:   "sit-and-wait",
        stage:       0,
        instruction: "Hold a treat above Nova's nose and slowly move it back over her head. The moment her bottom touches the floor, say 'yes!' and give the treat. 5 repetitions.",
        reps:        5,
        tip:         "If she jumps up, turn away and reset. Only reward when four paws are on the floor."
      },
      {
        objective:   "chill-out-settle",
        stage:       0,
        instruction: "Drop treats slowly onto Nova's mat while she's standing near it. Let her figure out that the mat = good things. No cue yet — just build the association. 2 minutes.",
        reps:        4,
        tip:         "Don't point or lure. Let Nova make the choice herself."
      }
    ]
  },

  week2: {
    label:       "Adding the cue",
    trainerNote: "If sit is reliable on the lure (8/10 attempts), start fading the food from your hand. Nova should be responding to the hand shape, not just chasing the treat.",
    primaryFocus: "sit-and-wait",
    objectives:  ["sit-and-wait", "chill-out-settle", "less-barking"],
    dailyTasks: [
      {
        objective:   "sit-and-wait",
        stage:       1,
        instruction: "Hold an empty hand in the same shape as before. Say 'sit' once as you signal. Reward from your other hand. 5 repetitions.",
        reps:        5,
        tip:         "Say the cue once only. Repeating it teaches Nova she can ignore the first ask."
      },
      {
        objective:   "chill-out-settle",
        stage:       0,
        instruction: "Ask Nova to go to her mat (point and encourage). Once she steps on it, drop a treat. Build up to 30 seconds of standing/sitting on the mat before the treat. 3 repetitions.",
        reps:        3,
        tip:         "Calmness earns the reward. If Nova is wriggly, wait her out."
      },
      {
        objective:   "less-barking",
        stage:       0,
        instruction: "When Nova is quiet (even briefly), mark it with a calm 'yes' and give a treat. Do this 5 times at random calm moments throughout the day — not during a training session.",
        reps:        5,
        tip:         "Catching quiet is the whole game here. Keep treats in your pocket."
      }
    ]
  },

  week3: {
    label:       "Distance and duration",
    trainerNote: "This is the tricky week — we're asking Nova to hold position while you move away. Expect regression. That's normal. Drop back a step if she's failing more than 2 out of 5.",
    primaryFocus: "sit-and-wait",
    objectives:  ["sit-and-wait", "chill-out-settle", "less-barking"],
    dailyTasks: [
      {
        objective:   "sit-and-wait",
        stage:       2,
        instruction: "Ask Nova to sit. Take one step back, pause 2 seconds, step back in, reward. Gradually increase to 2 steps back over the week. 5 repetitions.",
        reps:        5,
        tip:         "Return to Nova to reward — don't call her to you yet. Reward the stay, not the recall."
      },
      {
        objective:   "chill-out-settle",
        stage:       1,
        instruction: "Send Nova to her mat, then move around the room doing normal things (making tea, folding washing). Reward every 30–60 seconds she stays settled. Build up to 5 minutes.",
        reps:        3,
        tip:         "Boring rewards (kibble) are fine here — you want calm, not excitement."
      },
      {
        objective:   "less-barking",
        stage:       1,
        instruction: "When the doorbell rings (or someone knocks), say 'quiet' once, wait for a 2-second pause in barking, then reward. Do not reward while Nova is still barking.",
        reps:        4,
        tip:         "You can set up practice runs — ask a family member to knock while you're ready with treats."
      }
    ]
  },

  week4: {
    label:       "Introducing reactivity work",
    trainerNote: "Nova is ready to start working around mild distractions. We're not going near other dogs yet — we're building the habit of checking in with the handler when something interesting appears.",
    primaryFocus: "less-reactivity-dogs",
    objectives:  ["less-reactivity-dogs", "less-reactivity-people", "sit-and-wait", "less-barking"],
    dailyTasks: [
      {
        objective:   "less-reactivity-dogs",
        stage:       0,
        instruction: "On your walk, every time Nova notices another dog at a distance (before she reacts), say 'yes!' and give a treat. You're rewarding the noticing, not waiting for a sit. 5 opportunities per walk.",
        reps:        5,
        tip:         "Watch Nova's ears and body — catch her the moment she spots the dog, before tension builds."
      },
      {
        objective:   "less-reactivity-people",
        stage:       0,
        instruction: "Ask a family member to approach calmly. The moment Nova keeps four paws on the floor (doesn't jump), the person crouches and gives attention. 4 repetitions.",
        reps:        4,
        tip:         "The person approaching is the reward. Jumping = person turns away immediately.",
        assignedTo:  ["Marianne", "Pete"]
      },
      {
        objective:   "sit-and-wait",
        stage:       2,
        instruction: "Practise sit-and-wait at the front door before walks. Nova must sit and wait while you open the door — release with 'ok' before she goes through. Every single walk.",
        reps:        2,
        tip:         "Make this a habit, not a training session. Same rule every time."
      }
    ]
  },

  week5: {
    label:       "Fetch and fun",
    trainerNote: "We're adding fetch this week as a reward and engagement tool. A dog that fetches reliably gives you a huge reinforcer to use in reactivity work later.",
    primaryFocus: "fetch-ball",
    objectives:  ["fetch-ball", "less-reactivity-dogs", "chill-out-settle"],
    dailyTasks: [
      {
        objective:   "fetch-ball",
        stage:       0,
        instruction: "Roll the ball slowly along the floor (don't throw). When Nova picks it up, run backwards, crouching and calling excitedly. The moment she moves toward you, reward. 4 repetitions.",
        reps:        4,
        tip:         "Make yourself more exciting than the ball. High energy, silly voice."
      },
      {
        objective:   "fetch-ball",
        stage:       1,
        instruction: "When Nova brings the ball close, hold out your hand and say 'drop it'. The moment the ball falls, reward immediately. Don't grab for the ball — let her offer it. 4 repetitions.",
        reps:        4,
        tip:         "If she won't drop, offer a treat swap — ball for treat. She'll learn dropping the ball pays off."
      },
      {
        objective:   "less-reactivity-dogs",
        stage:       0,
        instruction: "Continue 'spot the dog' game on walks. This week: 8 rewards per walk for noticing dogs calmly.",
        reps:        8,
        tip:         "You want Nova looking at you after spotting the dog. The dog = 'look at mum/dad for a treat'."
      }
    ]
  },

  week6: {
    label:       "This week — Consolidation",
    trainerNote: "Session 6 complete. Nova has solid foundations on sit/wait and settle. Reactivity work has started well — keep the distance on walks, don't rush proximity. This week is about consistency across all family members.",
    primaryFocus: "chill-out-settle",
    objectives:  ["chill-out-settle", "less-reactivity-dogs", "fetch-ball", "less-barking"],
    dailyTasks: [
      {
        objective:   "chill-out-settle",
        stage:       2,
        instruction: "After a walk or play session, ask Nova to go to her mat. Wait for her to settle (lie down, sigh, stop scanning). Reward the moment she truly relaxes. Aim for 10 minutes.",
        reps:        2,
        tip:         "Exercise first, then settle. A tired Nova settles faster.",
        assignedTo:  ["Marianne", "Pete"]
      },
      {
        objective:   "less-reactivity-dogs",
        stage:       1,
        instruction: "On your walk, practise loose-lead walking when another dog is visible at 20m+. Keep moving, keep treating for attention on you. Don't stop and stare.",
        reps:        6,
        tip:         "Forward momentum helps. Stopping tends to increase tension."
      },
      {
        objective:   "fetch-ball",
        stage:       1,
        instruction: "Fetch in the garden — 4 throws, full return and drop each time. End the game while Nova still wants more (don't play to exhaustion).",
        reps:        4,
        tip:         "Ending the game on Nova's terms (when she loses interest) reduces the value of the game.",
        assignedTo:  ["Ella", "Matteo", "Oliver"]
      },
      {
        objective:   "less-barking",
        stage:       1,
        instruction: "This week: every family member practises the 'quiet' cue. Consistency across all of you is the goal — one person allowing barking undoes the work of everyone else.",
        reps:        3,
        tip:         "Same cue ('quiet'), same timing (2-second pause before reward), same reward every time."
      }
    ]
  }

};
