import { test, expect } from '@playwright/test';

test('flow mono-flacon huile Brut 10% Hemp jusqu’à merci', async ({
  page,
}) => {
  await page.goto('/configurateur');

  // Étape 1 : choisir Brut
  await page.getByRole('button', { name: /Brut/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();

  // Étape 2 : choisir 10%
  await page.getByRole('button', { name: /10%/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();

  // Étape 3 : choisir huile
  await page.getByRole('button', { name: /Huile sublinguale/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();

  // Étape 4 : choisir base Hemp
  await page.getByRole('button', { name: /Chanvre vierge/ }).click();
  await page.getByRole('button', { name: /Valider ce flacon/ }).click();

  // Bridge : skip
  await page.getByRole('button', { name: /Non — passer/ }).click();

  // Recap : remplir form + submit
  await page.getByLabel(/Nom/).fill('Test User');
  await page.getByLabel(/Email/).fill('test@example.com');
  await page.getByLabel(/j'ai plus de 18/i).check();
  await page.getByLabel(/j'accepte que WEECL traite/i).check();
  await page
    .getByRole('button', { name: /Envoyer ma demande de devis/ })
    .click();

  // Merci
  await expect(page).toHaveURL(/\/merci$/);
  await expect(page.getByText(/Merci pour votre demande/)).toBeVisible();
});

test('flow duo huile Soir 10% Hemp + vape auto-same', async ({ page }) => {
  await page.goto('/configurateur');

  // Flacon 1 : Soir 10% huile Hemp
  await page.getByRole('button', { name: /Soir/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /10%/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /Huile sublinguale/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /Chanvre vierge/ }).click();
  await page.getByRole('button', { name: /Valider ce flacon/ }).click();

  // Bridge : auto same
  await page.getByRole('button', { name: /profil auto-adapté/ }).click();

  // Récap : les 2 flacons visibles
  await expect(page.getByText(/Flacon 1/)).toBeVisible();
  await expect(page.getByText(/Flacon 2/)).toBeVisible();
});

test('vape grisé pour starter Confort musculaire', async ({ page }) => {
  await page.goto('/configurateur');

  await page
    .getByRole('button', { name: /Confort musculaire/ })
    .click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /10%/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();

  const vapeBtn = page.getByRole('button', {
    name: /Vape 30ml/,
  });
  await expect(vapeBtn).toBeDisabled();
  await expect(page.getByText(/Non disponible/)).toBeVisible();
});

test('Step 4 heading renders proper apostrophes (no HTML entities)', async ({
  page,
}) => {
  await page.goto('/configurateur');
  await page.getByRole('button', { name: /Brut/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /10%/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /Huile sublinguale/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();

  // Étape 4 : the heading should read "Votre base d'huile", not "Votre base d&apos;huile"
  await expect(
    page.getByRole('heading', { name: /Votre base d'huile/ })
  ).toBeVisible();
  await expect(page.getByText('d&apos;huile')).toHaveCount(0);
});

test('Confort musculaire + auto-same bridge does not crash', async ({
  page,
}) => {
  await page.goto('/configurateur');
  await page.getByRole('button', { name: /Confort musculaire/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /10%/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /Huile sublinguale/ }).click();
  await page.getByRole('button', { name: /Étape suivante/ }).click();
  await page.getByRole('button', { name: /MCT neutre/ }).click();
  await page.getByRole('button', { name: /Valider ce flacon/ }).click();

  // Bridge: the auto-same button should NOT be a clickable option — should render as disabled/replaced block
  await expect(
    page.getByText(/non disponible pour ce starter|Format vape non disponible/)
  ).toBeVisible();

  // Continue via skip and verify recap loads without crash
  await page.getByRole('button', { name: /Non — passer/ }).click();
  await expect(page.getByRole('heading', { name: /Récapitulatif/ })).toBeVisible();
});
