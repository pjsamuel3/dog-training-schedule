# Prompt History — Nova Training App

A chronological record of every prompt used to build this app, from first idea to shipping.
Useful for recreating the process, showing a client the progression, or starting a fresh version for another dog.

---

## Phase 0 — First idea

**Prompt 1 — The concept**
> I am working with a partner who is building a dog training school. It is actually more for training the humans who have dogs so is centred around behavioural improvements by repetition and positive reinforcement.
>
> He has asked me to create a prototype of what I would like to work from as a customer of his school.
>
> I would like to work with this repository, using the skills available, to work together to iterate on a schedule that can be loaded into a mobile app and followed along daily/weekly by family members.
>
> Let us create a new readme for the project and I can add more details next.

*Result: Initial README and project scaffold.*

---

**Prompt 2 — Feature list**
> Update the readme specs before we start building.
>
> What I want as an end user (dog trainer):
> - I want to progress towards a goal. Each dog is different, and it should be able to personalise the page for the dog
> - I would clone the entire repo per dog/owner
> - I want to name the dog and use this as input variables
> - I want to add family members and the expectations for each user type (parent, child — age specific targets)
> - Setting a start date should then automatically select where we are in the weekly plan. We run training sessions weekly. Currently on Saturdays at 10:00
> - I want to set targets for dogs/owners. E.g. less barking, less reactivity, fetch ball, don't bark at cats/horses. Sit and wait, don't beg for food, chillout, tricks like paw, circle tree.
> - Nice to have: Would be good if it could automatically load onto a smart screen in the kitchen or an old laptop/iPad.
> - Display this week's goal
> - Display upcoming food timers, check off if someone has fed the dog that day (can use local storage in browser)
> - An overview calendar page with various milestone achievements would be good to set expectations for dog and owner

*Result: README updated with full spec. PR #1.*

---

**Prompt 3 — Architecture decisions**
> Should reps sync across family devices, or stay local per device? (LocalStorage vs. a lightweight sync backend)
> - Is there a way to push updates back to GitHub using an access token so the changes can be updated and synced to GitHub Pages? I want as simple an architecture as possible. Maybe a peer-to-peer storage system per browser? KISS principle.
>
> How does the trainer push plan updates to a deployed instance?
> - The trainer will own all the repos in their GitHub account and share individual sub-pages with customers. Ensure we save no personal data other than first names/dog names.
>
> WhatsApp feedback: manual copy-paste into repo, or automate via WhatsApp Business API?
> - Manual copy and paste into VSCode, linked to the GitHub repo. I will train the dog trainer to use it efficiently.

*Result: Architecture locked in — single index.html, GitHub API for sync, manual feedback files.*

---

**Prompt 4 — Start building**
> Let's commit a PR, merge, and then get building.

---

**Prompt 5 — Config setup**
> Let's start on config.js — what do you need from me?

---

**Prompt 6 — Dog and family details**
> The dog: Nova, Norsk Buhund, 18 months
>
> The family:
> - Mum: Marianne
> - Dad: Pete
> - Child 14: Ella
> - Child 12: Matteo
> - Child 9: Oliver
>
> Training start date: We started back in November 2024 and have been making progress already from puppy to "teenage" dog. We had a session today. We have had 6 sessions in Q2 2026.
>
> Goals (1 = yes, 0 = no):
> - 1 Less barking
> - 1 Less reactivity (dogs, people, cats, horses)
> - 1 Sit and wait
> - 0 Don't beg for food
> - 1 Fetch ball
> - 1 Don't bark at cats / horses
> - 1 Chill out / settle
> - 1 Tricks: paw, circle tree
>
> Feeding schedule: Every day 08:00 and 16:00. 1.5 cups morning, 1 cup afternoon.

*Result: config.js, objectives.js committed. PR #2.*

---

**Prompt 7 — Project tracking**
> I think you should start by making and maintaining a project tracker to build out tasks that need to be completed. You are after all working as an engineer, from the skills, right?

*Result: PLAN.md created aligned to RECIPE.md phases. PR #4.*

---

**Prompt 8 — Schedule in source control**
> Can you keep the schedule in source control?

*Result: plan/schedule.js added with 6 weeks of daily tasks. PR #3.*

---

**Prompt 9 — Process check**
> Are you using this recipe? And please commit the todos as part of the plan.

*Result: Phase tracking added to PLAN.md.*

---

## Phase 2 — Design system

**Prompt 10 — Visual direction**
> Mood — one word or a reference. Suitable in a modern kitchen, minimal fuss, outdoors and forest.
> Primary device — mostly phones in the kitchen/garden, or also the kitchen tablet?
> Colour feel — pastels. Feminine but classy.

*Result: SPEC.md written — Kinfolk/Scandi aesthetic, sage green, dusty rose, Playfair Display + DM Sans. PR #5.*

---

## Phase 3 — Building the app

**Prompt 11 — Go**
> OK, let's go!

*Result: Full single-file app built — Today, Progress, Feeding, Journey sections, role-based family views, ambient kitchen screen mode. PR #6.*

---

**Prompt 12 — Testing**
> Can you add a skill to the recipe? I want a Technical UI/UX tester who can use tools like Playwright to ensure we are working towards a spec using things like BDD. The demo I see is missing quite a lot (looks blank).

*Result: Playwright BDD test suite added, blank demo fixed. PR #7.*

---

**Prompt 13 — Claude Code permissions**
> How do I add the Claude Code settings for this repo?

*Result: .claude/settings.json added with project-level tool permissions. PR #8.*

---

## Phase 5 — Sync and feedback

**Prompt 14 — Autonomous build**
> Now, keep building the plan independently and working from the recipe skills. When I get back I would like to see good progress.

*Result: GitHub API sync (state.json across devices), feedback reader (trainer notes from feedback/*.md surfaced on progress cards). PR #9.*

---

**Prompt 15 — Understanding sync**
> How does the persistence work?

*Result: Explanation of the two-layer architecture — localStorage for instant local state, GitHub API for cross-device sync.*

---

**Prompt 16 — Token troubleshooting**
> I can't see network traffic or state.json being updated. Do I need to configure a Fine Grained Token?

*Result: Confirmed: reads work without a token (public repo), writes need a GitHub Fine-Grained PAT with Contents: Read and write scope.*

---

**Prompt 17 — Token UI for the family**
> Can you add a GUI for adding the token to the app so I can share the instructions and token separately (for my 9 year old).

*Result: Settings overlay added — ⚙ button in nav, paste-token form, connect/disconnect UI. No DevTools needed. PR #10.*

---

## Phase 7 — Overview dashboard

**Prompt 18 — New feature request**
> I would like to structure some new feature requests. The trainer would like another page (via a menu) to give a training overview dashboard.
>
> The user story is a dashboard gives a fast overview of the completed training activities for trainer and owner. Think executive management overview, but targeted at dog owners not the board.
>
> Ideas of data to show:
> - Activities completed to activities planned
> - Progress towards target behaviour, planned vs actual from feedback notes

*Result: Spec drafted for Overview dashboard, five clarifying questions asked.*

---

**Prompt 19 — Spec answers**
> 1. Navigation — Swap progress with the new item and hide progress as a drill-down to the overview
> 2. Primary audience — Focus on the owner, inspire them to do it (gamification)
> 3. Rep timestamps — KISS.
> 4. "Planned" definition — A (total target reps from OBJECTIVES)
> 5. Completion state — Yes, both. Give the owner a code for a 5% discount from the trainer.

*Result: SPEC.md updated with full Overview Dashboard section.*

---

**Prompt 20 — Build it**
> Fine for now.

*Result: Overview dashboard built — hero strip with tier labels, category bars, objective cards with stage breakdown and inline rep counter, confetti + discount code on completion. PR #11.*

---

## Phase 8 — Family notes and fixes

**Prompt 21 — Merge conflict**
> Fix the merge conflict (rest state if needed) and continue building.

*Result: Merge conflict resolved (family's real data preserved), family observation notes feature built — per-objective notes from family members, synced via state.json. PR #12.*

---

**Prompt 22 — Demo**
> Where can I demo the changes?

*Result: Live at https://pjsamuel3.github.io/dog-training-schedule/*

---

**Prompt 23 — Ship it**
> Yes. *(merge PR #12)*

---

**Prompt 24 — This file**
> Can you list out all my prompts into a history file so that I could recreate the process and progression of the app to show the process to the trainer? New markdown file for this please, like prompt history.

---

## How to recreate this for a new dog/owner

1. Fork or clone `pjsamuel3/dog-training-schedule` into a new repo under the trainer's GitHub account
2. Edit `config.js` — update dog name, family members, session dates, active goals, feeding schedule, and `completionReward.code`
3. Edit `objectives.js` if the goal set differs
4. Edit `plan/schedule.js` with the trainer's weekly plan for that dog
5. Enable GitHub Pages (Settings → Pages → main branch, / root)
6. Share the live URL with the family
7. Trainer shares a GitHub Fine-Grained PAT (Contents: Read and write) so the family can paste it into ⚙ Settings and enable cross-device sync
8. Trainer adds `feedback/YYYY-MM-DD.md` files after each session — sections headed `## objective-id` appear automatically on the family's Overview cards
