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

## Phase 4 — Copilot instructions
- [ ] Write `.github/copilot-instructions.md` with design system and component patterns

## Phase 5 — Ongoing
- [ ] GitHub API sync — read/write `state.json` for cross-device rep counts
- [ ] Feedback reader — surface `feedback/*.md` entries against objectives
- [ ] PR workflow for trainer to add weekly plan updates
