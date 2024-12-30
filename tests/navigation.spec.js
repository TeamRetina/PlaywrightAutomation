const { test, expect } = require('@playwright/test');

test('@Validate Navigation Between Result Sections', async ({ browser }) => {

    test.setTimeout(90000); 

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://webapp.simulationhub.com/autonomous-valve-cfd/FoRHLRU/results?public=true");

    const flowAnimation = page.locator("a[href*='FlowLines?']");
    const surfacePressure = page.locator("a[href*='SurfacePressure?']");
    const closeStageButton = page.locator("#closeStage");

    await flowAnimation.waitFor({ state: 'visible', timeout: 60000 });

    await flowAnimation.click();
    console.log('Flow Animation section clicked.');

    // Validate navigation to flow animation
    await expect(page).toHaveURL("https://webapp.simulationhub.com/autonomous-valve-cfd/FoRHLRU/results/FlowLines?public=true&condition=10.51&colorby=Velocity&color=16&speed=30");

    await page.waitForLoadState('networkidle', { timeout: 60000 });

    await closeStageButton.waitFor({ state: 'visible', timeout: 60000 });

    await closeStageButton.click();
    console.log('#closeStage button clicked.');

    await surfacePressure.waitFor({ state: 'visible', timeout: 60000 });

    await surfacePressure.click();
    console.log('Surface Pressure section clicked.');

    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Validate navigation to Surface Pressure
    await expect(page).toHaveURL(/.*SurfacePressure.*/);

    await context.close();
});
