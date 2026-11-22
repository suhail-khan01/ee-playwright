
const { test, chromium, expect } = require('@playwright/test');

test('EasyEat Partner Login', async () => {

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: {
      width: 1366,
      height: 768
    }
  });

  const page = await context.newPage();

  // Open login page
  await page.goto('https://partner.easyeat.ai/login');

  // Locate email and password
  const email = page.locator('input[type="email"]');
  const password = page.locator('input[type="password"]');

  // Enter credentials
  await email.fill('gabbi@easyeat.ai');
  await password.fill('gabbi@A438');

  // Click Login Now button
  const loginButton = page.getByRole('button', {
    name: 'Login Now'
  });

  await loginButton.click();

  // Wait for login processing
  await page.waitForTimeout(5000);

  // Print current URL
  console.log('Current URL:', page.url());

  const closeBtn = page.locator('button.downtime-modal__close--x');

  const appeared = await closeBtn
    .waitFor({ state: 'visible', timeout: 2000 })
    .then(() => true)
    .catch(() => false);

  if (appeared) {
    await closeBtn.click();
  }

  // Keep browser open
  await page.waitForTimeout(2000);

});
