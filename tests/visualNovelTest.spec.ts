import { test, expect } from '@playwright/test';

// Playwright check the tests parallelly
// So we can't run it in a serial way
// In this case, I categorized the tests with different pre-functions
test.describe('visual novel create project and block', () => {
  const pageUrl: string = 'https://kirilllive.github.io/tuesday-js/translate/en_tuesday_visual.html';
  const title: string = 'Tuesday JS web visual editor';

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
    // choose a touch pad mode
    await page.getByRole('cell', { name: 'TouchPad recommended for' }).locator('div').click();
  });

  test('shouldHaveCorrectTitle', async ({ page }) => {
    await expect(page).toHaveTitle(title);
  })

  test('shouldCreateProjectNamedGundam', async ({ page }) => {
    await page.getByRole('cell', { name: 'New project' }).click();
    await page.getByRole('cell', { name: 'delet' }).first().click();
    await page.getByPlaceholder('translated title').click();
    await page.getByPlaceholder('translated title').fill('Gundam');
    await page.getByRole('cell', { name: 'Create project' }).click();
    await expect(page.getByText('New project created')).toBeVisible();
  });

  test('shouldShowBlockNameTooShortMessage', async ({ page }) => {
    await page.getByText('Add story block').click();
    await page.locator('#block_id').click();
    await page.locator('#block_id').fill('1234');
    await page.getByRole('cell', { name: 'Create block' }).click();
    await expect(page.getByText('Name at least 5 characters')).toBeVisible();
  })

  test('shouldCreateBlock', async ({ page }) => {
    await page.getByText('Add story block').click();
    await page.locator('#block_id').click();
    await page.locator('#block_id').fill('block1');
    // Testing color setting function will be done when I'm available
    await page.locator('td:nth-child(10) > .checkbox_b').check();
    await page.getByRole('cell', { name: 'Create block' }).click();
    await expect(page.getByText('New block created')).toBeVisible();
    await expect(page.locator("#block1")).toBeVisible();
  })
});

test.describe('visual novel picture, dialogue and play', () => {
  const pageUrl: string = 'https://kirilllive.github.io/tuesday-js/translate/en_tuesday_visual.html';
  const title: string = 'Tuesday JS web visual editor';

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
    await page.getByRole('cell', { name: 'TouchPad recommended for' }).locator('div').click();
    await page.getByText('Add story block').click();
    await page.locator('#block_id').click();
    await page.locator('#block_id').fill('block1');
    await page.getByRole('cell', { name: 'Create block' }).click();
  });

  test('shouldAddScene', async ({ page }) => {
    // await page.getByRole('row', { name: 'block1' }).getByRole('cell').first().click();
    // await page.getByTitle('Add element to block').click();
    // await page.getByRole('cell', { name: 'Scene' }).first().click();
    // await page.locator('#files_img').click();
    // await page.getByRole('cell', { name: 'delet' }).click();
    // await page.getByText('EN Add story block block1').setInputFiles(['Pic1.png', 'Pic3.png', 'Pic2.png']);
    // await page.locator('#files_img').click();
    // await page.getByTitle('images/Pic1.png').click();
    // await page.getByRole('cell', { name: 'Apply' }).click();
    // await expect(page.locator('#block1')).toHaveClass(/scene_bg/);

    // because of the problem like the picture in ../problems/
    // This test case won't cover add scene picture
    await page.getByRole('row', { name: 'block1' }).getByRole('cell').first().click();
    await page.getByTitle('Add element to block').click();
    await page.getByText('Scene', { exact: true }).click();
    await page.getByRole('cell', { name: 'Apply' }).click();

    await page.getByTitle('Add element to dialog').click();
    await page.getByRole('cell', { name: 'Text' }).nth(1).click();
    await page.locator('#dialogtext').click();
    await page.locator('#dialogtext').fill('Get ready to fight!');
    await page.getByRole('cell', { name: 'Apply' }).click();

    await expect(page.getByText('Get ready to fight!')).toBeVisible();
  })

  test('shouldAddConnectionAndPlay', async ({ page }) => {
    // add scene 1
    await page.getByRole('row', { name: 'block1' }).getByRole('cell').first().click();
    // await page.getByTitle('Add element to block').click();
    await page.locator('#add_b_block1').click();
    // await page.getByRole('cell', { name: 'Scene' }).first().click();
    // await page.locator('#files_img').click();
    // await page.getByRole('cell', { name: 'delet' }).click();
    // await page.getByText('EN Add story block block1').setInputFiles(['Pic1.png', 'Pic3.png', 'Pic2.png']);
    // await page.locator('#files_img').click();
    // await page.getByTitle('images/Pic1.png').click();
    await page.getByText('Scene', { exact: true }).click();
    await page.getByRole('cell', { name: 'Apply' }).click();
    await page.getByTitle('Add element to dialog').click();
    await page.getByRole('cell', { name: 'Text' }).nth(1).click();
    await page.locator('#dialogtext').click();
    await page.locator('#dialogtext').fill('Get ready to fight!');
    await page.getByRole('cell', { name: 'Apply' }).click();

    // create scene 2
    await page.getByText('Add story block').click();
    await page.locator('#block_id').click();
    await page.locator('#block_id').fill('block2');
    await page.getByRole('cell', { name: 'Create block' }).click();

    // add scene 2
    await page.getByRole('row', { name: 'block2' }).getByRole('cell').first().click();
    await page.locator('#add_b_block2').click();
    // await page.getByText('Scene', { exact: true }).click();
    // await page.locator('#files_img').click();
    // await page.getByTitle('images/Pic2.png').click();
    await page.getByText('Scene', { exact: true }).click();
    await page.getByRole('cell', { name: 'Apply' }).click();
    await page.locator('#add_d_block2_0_0').click();
    await page.getByRole('cell', { name: 'Text' }).nth(1).click();
    await page.locator('#dialogtext').click();
    await page.locator('#dialogtext').fill('Let the game begin!');
    await page.getByRole('cell', { name: 'Apply' }).click();
    

    // add connection
    // When an element can't be seen, it can't be toggled even if it exsits
    // And I can't find a way to let playright simulate drag elements
    // So we have to settle a dumper way
    // await page.locator('#add_d_block1_0_0').click();
    // await page.getByRole('cell', { name: 'Go to' }).first().click();
    // await page.locator('#d_block1_0_0').getByRole('combobox').selectOption('block2');
    // const page12Promise = page.waitForEvent('popup');
    // await page.getByRole('row', { name: 'block1' }).getByRole('cell').nth(3).click();
    // const page12 = await page12Promise;
    // await expect(page.getByText('>')).toBeVisible();
    // await page12.getByText('>').click();
    // await page12.locator('#tue_text_view').click();
    // await expect(page.getByText('#tue_text_view')).toBeVisible();

    await page.locator('#add_d_block2_0_0').click();
    await page.getByRole('cell', { name: 'Go to' }).first().click();

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('row', { name: 'block2' }).getByRole('cell').nth(3).click();
    const page1 = await page1Promise;
    await expect(page1.getByText('>')).toBeVisible();
    await page1.getByText('>').click();
  })
});