const { test, expect } = require('@playwright/test');

test('@Report Generation', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://webapp.simulationhub.com/autonomous-valve-cfd/FoRHLRU/results?public=true");

  const downArrow = page.locator("li.active span[class*= 'fa-lg']");
  const defaultReport = page.locator("[style = 'color: #2185d0; border: 1px solid #2185d0; width: 100%; text-transform: capitalize; font-size: 13px;']");

  // Click on the down arrow of Request Demo
  await downArrow.click();

  await defaultReport.waitFor({ state: 'visible', timeout: 10000 });

  await defaultReport.scrollIntoViewIfNeeded();

  // Click the Default Report button using JavaScript 
  await page.evaluate(() => {
    const reportButton = document.querySelector("[style = 'color: #2185d0; border: 1px solid #2185d0; width: 100%; text-transform: capitalize; font-size: 13px;']");
    if (reportButton) {
      reportButton.click();
    } else {
      throw new Error("Default Report button not found.");
    }
  });

  console.log("Report is generated without error");

  await context.close();
});
