import { expect, test } from '@playwright/test';

test('the last menu link is reachable on a phone in landscape', async ({ page }) => {
  await page.setViewportSize({ width: 568, height: 320 });
  await page.goto('./');
  const toggle = page.getByRole('button', { name: 'Otevřít hlavní nabídku' });
  await toggle.focus();
  await page.keyboard.press('Enter');

  const menu = page.getByRole('navigation', { name: 'Hlavní navigace' });
  for (const link of await menu.getByRole('link').all()) {
    await page.keyboard.press('Tab');
    await expect(link).toBeFocused();
    await expect(link).toBeInViewport({ ratio: 0.95 });
  }
  await page.keyboard.press('Enter');
  await expect(menu).toBeHidden();
  await expect(page.locator('#kontakt')).toBeFocused();
});

test('a service enquiry validates locally and sends no data', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: /Příprava na STK/ }).click();
  const form = page.getByRole('form', { name: 'Objednat servis.' });
  await expect(form.getByLabel('Typ služby')).toHaveValue('stk');
  await form.getByLabel('Jméno a příjmení').fill('   ');
  await form.getByLabel('E-mail').fill('chyba');
  const submit = form.getByRole('button', { name: 'Odeslat poptávku' });
  await submit.click();
  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(3);
  await expect(form.getByLabel('Jméno a příjmení')).toBeFocused();

  await form.getByLabel('Jméno a příjmení').fill('Jana Nová');
  await form.getByLabel('E-mail').fill('demo@example.invalid');
  await form.getByLabel('Zpráva').fill('Prosím o kontrolu brzd.');
  const outgoing: string[] = [];
  page.on('request', request => {
    if (request.isNavigationRequest() || !['image', 'font', 'stylesheet'].includes(request.resourceType())) {
      outgoing.push(request.url());
    }
  });
  await submit.click();
  await expect(form.getByRole('status')).toHaveText('Toto je ukázkový formulář. Žádné údaje nebyly odeslány.');
  expect(outgoing).toEqual([]);
});

test('the gallery supports keyboard navigation and restores focus', async ({ page }) => {
  await page.goto('./');
  const firstPhoto = page.getByRole('link', { name: 'Zvětšit fotografii – Na zvedáku' });
  await firstPhoto.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toHaveAccessibleName('Na zvedáku');
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toHaveAccessibleName('Diagnostika motoru');
  await dialog.getByRole('img').evaluate((image: HTMLImageElement) => image.decode());
  await page.keyboard.press('Escape');
  await expect(firstPhoto).toBeFocused();
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  test('section links work and the demo form stays disabled', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('navigation', { name: 'Hlavní navigace' }).getByRole('link', { name: 'Kontakt' }).click();
    await expect(page).toHaveURL(/#kontakt$/);
    await expect(page.getByLabel('Jméno a příjmení')).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Odeslat poptávku' })).toBeDisabled();
    await expect(page.getByText('Pro vyzkoušení formuláře povolte JavaScript.')).toBeVisible();
  });
});
