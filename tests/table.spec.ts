import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000");
});

test("test table rendering properly", async ({ page }) => {
  const table = page.getByRole("table");
  await expect(table).toBeVisible();

  await expect(table.getByRole("cell", { name: "name" })).toBeVisible();

  await expect
    .poll(async () => await table.getByRole("row").count())
    .toBeGreaterThan(1);
});

test("test row selection", async ({ page }) => {
  const row = page.getByRole("row", { name: "smss.exe" });
  await expect(row).toBeVisible();

  const checkbox = row.getByRole("checkbox");
  await expect(checkbox).toBeVisible();

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  await checkbox.uncheck();
  await expect(checkbox).not.toBeChecked();
});

test("test select all", async ({ page }) => {
  const table = page.getByRole("table");
  const rows = table.locator("tbody tr");

  const selectAllCheckbox = page.locator("input[type='checkbox'][name='all']");
  await expect(selectAllCheckbox).toBeVisible();

  await expect(selectAllCheckbox).not.toBeChecked();

  await rows.first().waitFor({ state: "visible" });

  const checkboxes = rows.locator('input[type="checkbox"]');
  const count = await checkboxes.count();

  // select all rows to see if selectAll also gets selected
  for (let i = 0; i < count; i++) {
    const cb = checkboxes.nth(i);
    await cb.waitFor({ state: "attached" });
    await cb.setChecked(true);
    await expect(cb).toBeChecked();
  }

  await expect(selectAllCheckbox).toBeChecked();

  // only select some to test if selectAll is 'indeterminate'
  for (let i = 0; i < count; i++) {
    if (i > 2) break;
    const cb = checkboxes.nth(i);
    await cb.waitFor({ state: "attached" });
    await cb.setChecked(false);
    await expect(cb).not.toBeChecked();
  }

  await expect(selectAllCheckbox).toHaveJSProperty("indeterminate", true);

  // test selectAll
  await selectAllCheckbox.check();
  await expect(selectAllCheckbox).toBeChecked();

  for (let i = 0; i < count; i++) {
    const cb = checkboxes.nth(i);
    await expect(cb).toBeVisible();
    await expect(cb).toBeChecked();
  }

  await selectAllCheckbox.uncheck();
  await expect(selectAllCheckbox).not.toBeChecked();

  for (let i = 0; i < count; i++) {
    const cb = checkboxes.nth(i);
    await expect(cb).toBeVisible();
    await expect(cb).not.toBeChecked();
  }
});

test("test download selected", async ({ page }) => {
  const openBtn = page.getByRole("button", { name: /Download Selected/i });
  const table = page.getByRole("table");
  const rows = table.locator("tbody tr");

  const dialog = page.locator("dialog");

  await rows.first().waitFor({ state: "visible" });

  // Grab the row checkboxes and set the first three
  const checkboxes = rows.locator('input[type="checkbox"]');
  const n = Math.min(await checkboxes.count(), 3);

  for (let i = 0; i < n; i++) {
    const cb = checkboxes.nth(i);
    await cb.waitFor({ state: "attached" });
    await cb.setChecked(true);
    await expect(cb).toBeChecked();
  }

  await expect(openBtn).toBeVisible();
  await openBtn.click();

  await expect(dialog).toBeVisible();

  await page.getByRole("button", { name: /close/i }).click();
  await expect(dialog).toBeHidden();
});

test("test check counts", async ({ page }) => {
  const checkCountEl = page.locator("#checkCount");
  const table = page.getByRole("table");
  const rows = table.locator("tbody tr");

  await rows.first().waitFor({ state: "visible" });

  const checkboxes = rows.locator('input[type="checkbox"]');
  const n = Math.min(await checkboxes.count(), 3);

  for (let i = 0; i < n; i++) {
    const cb = checkboxes.nth(i);
    await cb.waitFor({ state: "attached" });
    await cb.setChecked(true);
    await expect(cb).toBeChecked();
  }

  await expect(checkCountEl).toHaveAttribute("data-count", "3");
});
