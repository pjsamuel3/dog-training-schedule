# Build Plan

Follows the phases in [RECIPE.md](RECIPE.md). Each phase must be complete before the next starts.

---

## Phase 0 — Brief ✅
- [x] README written — audience, goals, architecture decisions
- [x] `config.js` — dog, family, session, feeding
- [x] `objectives.js` — objective library with stages and rep targets
- [x] `plan/schedule.js` — weekly trainer schedule in source control

## Phase 1 — GitHub setup
- [ ] Enable GitHub Pages (main branch, / root)
- [ ] Confirm live URL works

## Phase 2 — Design system
- [ ] Agree aesthetic direction — palette, fonts, mood
- [ ] Write `SPEC.md` (audience, sections, aesthetic)
- [ ] Lock CSS tokens in `:root` before any component code

## Phase 3 — Build `index.html`
- [ ] This week's goal + today's practice tasks (primary view)
- [ ] Food log — feeding times, check-off per family member (localStorage)
- [ ] Progress widgets — rep counter per objective, stage indicator
- [ ] Milestone calendar — full programme timeline
- [ ] Role-based family views — parent vs child (age-aware content)
- [ ] Ambient / kitchen screen mode (`?mode=display`)

## Phase 4 — Copilot instructions
- [ ] Write `.github/copilot-instructions.md` with design system and component patterns

## Phase 5 — Ongoing
- [ ] GitHub API sync — read/write `state.json` for cross-device rep counts
- [ ] Feedback reader — surface `feedback/*.md` entries against objectives
- [ ] PR workflow for trainer to add weekly plan updates
