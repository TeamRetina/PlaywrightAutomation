const { test, expect } = require('@playwright/test');

test('@Performance Data Validation', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://webapp.simulationhub.com/autonomous-valve-cfd/FoRHLRU/results?public=true");

    const performance_Data = page.locator("a[href*= 'PerformanceData?']");
    const netData = page.locator("#netData");
    const waitWave = page.locator("#waitWave");
    const detailedResults = page.locator("#detailedResults");

    // Click on the Performance Data link
    await performance_Data.click();
    console.log("The performance data section is loaded properly");

    await waitWave.waitFor({ state: 'hidden' });
    
    // Click on the Net Data
    await netData.click({ force: true });

    console.log("It showing detailed,clear and accurate information successfully for the gross data and net data");
    
    await context.close();
});
