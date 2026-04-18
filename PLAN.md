# Build Plan

Follows the phases in [RECIPE.md](RECIPE.md). Each phase must be complete before the next starts.

---

## Phase 0 — Brief ✅
- [x] README written — audience, goals, architecture decisions
- [x] `config.js` — dog, family, session, feeding
- [x] `objectives.js` — objective library with stages and rep targets
- [x] `plan/schedule.js` — weekly trainer schedule in source control

## Phase 1 — GitHub setup ✅
- [x] Enable GitHub Pages (main branch, / root)
- [x] Live URL: https://pjsamuel3.github.io/dog-training-schedule/

## Phase 2 — Design system ✅
- [x] Agreed aesthetic — Kinfolk/Scandi, warm linen, sage green, dusty rose, pastels
- [x] `SPEC.md` written — audience, sections, palette, fonts, type scale
- [x] CSS tokens locked in `:root`

## Phase 3 — Build `index.html` ✅
- [x] This week's goal + today's practice tasks (primary view)
- [x] Food log — feeding times, check-off per family member (localStorage)
- [x] Progress widgets — rep counter per objective, stage indicator
- [x] Milestone calendar — full programme timeline
- [x] Role-based family views — parent / child / young child (age-aware)
- [x] Ambient / kitchen screen mode (`?mode=display`)

## Phase 4 — Copilot instructions ✅
- [x] Write `.github/copilot-instructions.md` with design system and component patterns

## Phase 5 — Ongoing ✅
- [x] GitHub API sync — read/write `state.json` for cross-device rep counts
  - Reads `state.json` via raw GitHub URL on load (no auth required for public repo)
  - Writes back via GitHub API PUT after rep/done/fed actions (debounced 3s)
  - Merge strategy: max reps, union of done/feeding entries
  - Token stored in `localStorage('nova-github-token')` — never in source
  - Sync status pill in desktop nav (syncing / synced / error)
- [x] Feedback reader — surface `feedback/*.md` entries against objectives
  - Trainer pastes WhatsApp notes into `feedback/YYYY-MM-DD.md`
  - Sections headed `## objective-id` are matched to progress cards
  - Most recent matching note shown inline in each progress card
- [x] `state.json` — initial empty sync file committed
- [x] `feedback/2026-04-12.md` — example trainer feedback file

## Phase 6 — Sync + Feedback UX ✅
- [x] Token setup UI — settings drawer to paste GitHub PAT without opening console (PR #10)

## Phase 7 — Overview Dashboard ✅
- [x] Gamified training Overview tab replaces Progress tab (PR #11)
  - Hero strip with tier labels and animated progress bar
  - Category mini-bars (Reactivity / Impulse Control / Tricks / Play)
  - Objective cards with status badges, stage breakdown, inline rep counter
  - Completion reward: confetti + discount code from `CONFIG.completionReward`
  - `state.celebrated` tracks first-completion across devices

## Phase 8 — Ongoing ✅
- [x] Family observation notes — per-objective notes from family members, synced via state.json (PR #12)
- [x] Journey expandable schedule — tap any week to see planned task instructions; past weeks muted, current auto-expanded, future previewed (PR #13)
- [x] Update `.github/copilot-instructions.md` with Overview, family notes, and Journey patterns

## Phase 9 — Three view modes
- [ ] Simple view — default for all users: one task card, "Done it!" button, week label, "See everything →" link
- [ ] Advanced view — full tabbed app (existing build), activated by "See everything →", preference in localStorage
- [ ] "Simple view ←" return link in Advanced header
- [ ] Trainer view — ⚙ Settings toggle, builds on Advanced: read-only, rep summary, templates, feedback form (PR #14 to be revised)
