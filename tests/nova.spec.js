// BDD-style Playwright tests for Nova's training schedule app.
// Each describe block maps to a section in SPEC.md.
// Use `asUser()` to pre-set localStorage before page load.

import { test, expect } from '@playwright/test';

// ── Helpers ─────────────────────────────────────────────────────────────────

function asUser(name) {
  return async ({ page }, use) => {
    await page.addInitScript(
      n => localStorage.setItem('nova-state', JSON.stringify({ user: n })),
      name
    );
    await page.goto('/');
    await use(page);
  };
}

function withReps(reps) {
  return async ({ page }, use) => {
    const state = getState(page) || {};
    state.reps = reps;
    await page.addInitScript(
      s => localStorage.setItem('nova-state', JSON.stringify(s)),
      state
    );
    await page.goto('/');
    await use(page);
  };
}

// ── SPEC: User picker ────────────────────────────────────────────────────────

test.describe('User picker', () => {
  test('shows picker on first load with no user selected', async ({ page }) => {
    // Given: no user in localStorage
    await page.goto('/');
    // Then: picker overlay is visible
    await expect(page.locator('.picker-overlay')).toHaveClass(/visible/);
  });

  test('hides picker after selecting a family member', async ({ page }) => {
    await page.goto('/');
    // When: I tap "Pete"
    await page.locator('.picker-btn', { hasText: 'Pete' }).click();
    // Then: picker disappears
    await expect(page.locator('.picker-overlay')).not.toHaveClass(/visible/);
  });

  test('shows all five family members', async ({ page }) => {
    await page.goto('/');
    const names = ['Marianne', 'Pete', 'Ella', 'Matteo', 'Oliver'];
    for (const name of names) {
      await expect(page.locator('.picker-btn', { hasText: name })).toBeVisible();
    }
  });

  test('reopens picker from user chip', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    // When: I tap whichever user chip is visible (mobile header or desktop nav)
    const chip = page.locator('.header-user-chip, .user-chip').filter({ visible: true }).first();
    await chip.click();
    // Then: picker reappears
    await expect(page.locator('.picker-overlay')).toHaveClass(/visible/);
  });
});

// ── SPEC: App header ─────────────────────────────────────────────────────────

test.describe('App header', () => {
  test('shows dog name', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await expect(page.locator('#headerDogName')).toContainText('Nova');
  });

  test('shows breed and age', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await expect(page.locator('#headerDogMeta')).toContainText('Norsk Buhund');
  });

  test('shows week number in banner', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await expect(page.locator('#weekLabel')).toContainText('Week');
  });

  test('shows next session countdown', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await expect(page.locator('#sessionCountdown')).toContainText(/session/i);
  });
});

// ── SPEC: Today — parent view ────────────────────────────────────────────────

test.describe('Today — parent (Pete)', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('parent sees trainer note', async ({ page }) => {
    // Given: logged in as Pete (parent)
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    // Then: trainer note is visible
    await expect(page.locator('#trainerNote')).toBeVisible();
    await expect(page.locator('#trainerNote')).not.toHaveCSS('display', 'none');
  });

  test('shows multiple tasks', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    const cards = page.locator('.task-card');
    await expect(cards).toHaveCount(await cards.count()); // at least 1
    expect(await cards.count()).toBeGreaterThan(1);
  });

  test('shows task tips', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await expect(page.locator('.task-tip').first()).toBeVisible();
  });
});

// ── SPEC: Today — young child view (Oliver, age 9) ───────────────────────────

test.describe('Today — young child (Oliver, age 9)', () => {
  test('shows exactly one task at a time', async ({ page }) => {
    // Given: logged in as Oliver (age 9)
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Oliver' })));
    await page.goto('/');
    // Then: only one task card is shown
    await expect(page.locator('.task-card')).toHaveCount(1);
  });

  test('hides task tips for young child', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Oliver' })));
    await page.goto('/');
    // Tips should be hidden via CSS for young-child view
    const tips = page.locator('.task-tip');
    if (await tips.count() > 0) {
      await expect(tips.first()).toBeHidden();
    }
  });

  test('does not show trainer note', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Oliver' })));
    await page.goto('/');
    await expect(page.locator('#trainerNote')).toHaveCSS('display', 'none');
  });
});

// ── SPEC: Rep counting ───────────────────────────────────────────────────────

test.describe('Rep counting', () => {
  test('+ rep button increments the counter', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');

    const repBtn = page.locator('.btn-rep').first();
    const repCount = page.locator('.rep-count').first();

    const before = Number(await repCount.textContent());
    await repBtn.click();
    const after = Number(await repCount.textContent());

    expect(after).toBe(before + 1);
  });

  test('rep count persists in localStorage', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');

    await page.locator('.btn-rep').first().click();
    await page.locator('.btn-rep').first().click();

    const state = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('nova-state')));
    const reps = Object.values(state.reps || {});
    expect(Math.max(...reps)).toBeGreaterThanOrEqual(2);
  });

  test('done toggle changes card appearance', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');

    const doneBtn = page.locator('.btn-done').first();
    const card = page.locator('.task-card').first();

    await doneBtn.click();
    await expect(card).toHaveClass(/done-today/);
    await expect(doneBtn).toHaveClass(/active/);
  });

  test('done toggle is reversible', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');

    const doneBtn = page.locator('.btn-done').first();
    const card = page.locator('.task-card').first();

    await doneBtn.click();
    await expect(card).toHaveClass(/done-today/);
    await doneBtn.click();
    await expect(card).not.toHaveClass(/done-today/);
  });
});

// ── SPEC: Progress section ───────────────────────────────────────────────────

test.describe('Progress', () => {
  test('shows a progress card for every active goal', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await page.locator('#progress').scrollIntoViewIfNeeded();

    // CONFIG.goals has 9 entries
    const cards = page.locator('.progress-card');
    await expect(cards).toHaveCount(9);
  });

  test('progress bar width reflects rep percentage', async ({ page }) => {
    // Given: 25 reps logged for less-barking (target 60 = 41%)
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({
        user: 'Pete',
        reps: { 'less-barking': 25 }
      })));
    await page.goto('/');
    await page.locator('#progress').scrollIntoViewIfNeeded();

    const bar = page.locator('.progress-bar-fill').first();
    const style = await bar.getAttribute('style');
    expect(style).toContain('width:');
    const pct = parseInt(style.match(/width:(\d+)%/)?.[1] || '0');
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });

  test('completed objective shows celebration badge', async ({ page }) => {
    // Given: all 60 reps for less-barking done
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({
        user: 'Pete',
        reps: { 'less-barking': 60 }
      })));
    await page.goto('/');
    await page.locator('#progress').scrollIntoViewIfNeeded();
    await expect(page.locator('.progress-badge-done').first()).toBeVisible();
  });
});

// ── SPEC: Feeding log ────────────────────────────────────────────────────────

test.describe('Feeding log', () => {
  test('shows two feeding cards (morning and afternoon)', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await page.locator('#feeding').scrollIntoViewIfNeeded();
    await expect(page.locator('.feeding-card')).toHaveCount(2);
  });

  test('mark as fed records the logged-in user and time', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Marianne' })));
    await page.goto('/');
    await page.locator('#feeding').scrollIntoViewIfNeeded();

    await page.locator('.btn-feed').first().click();

    await expect(page.locator('.feeding-done').first()).toContainText('Marianne');
  });

  test('mark as fed button disappears after feeding', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await page.locator('#feeding').scrollIntoViewIfNeeded();

    await page.locator('.btn-feed').first().click();

    await expect(page.locator('.btn-feed')).toHaveCount(1); // only afternoon left
  });
});

// ── SPEC: Journey / calendar ─────────────────────────────────────────────────

test.describe('Journey timeline', () => {
  test('shows all 6 weeks from schedule', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await page.locator('#calendar').scrollIntoViewIfNeeded();
    // 6 schedule weeks + 1 "coming up" entry
    const weeks = page.locator('.timeline-week');
    expect(await weeks.count()).toBeGreaterThanOrEqual(6);
  });

  test('current week has "Now" badge', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await page.locator('#calendar').scrollIntoViewIfNeeded();
    await expect(page.locator('.week-current-badge')).toBeVisible();
  });

  test('shows programme start date', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/');
    await page.locator('#calendar').scrollIntoViewIfNeeded();
    await expect(page.locator('.programme-context')).toContainText('November 2024');
  });
});

// ── SPEC: Ambient / kitchen display mode ─────────────────────────────────────

test.describe('Ambient display mode (?mode=display)', () => {
  test('hides main navigation and content', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/?mode=display');
    await expect(page.locator('main')).toBeHidden();
    await expect(page.locator('.bottom-nav')).toBeHidden();
  });

  test('shows the display slide', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/?mode=display');
    await expect(page.locator('#displaySlide')).toBeVisible();
  });

  test('display slide contains dog name', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('nova-state', JSON.stringify({ user: 'Pete' })));
    await page.goto('/?mode=display');
    await expect(page.locator('.display-title')).toContainText('Nova');
  });
});
