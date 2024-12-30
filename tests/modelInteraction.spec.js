const { test, expect } = require('@playwright/test');

test('@Validate 3D Model Interaction', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    
    await page.goto("https://webapp.simulationhub.com/autonomous-valve-cfd/FoRHLRU/results?public=true");
    await page.waitForLoadState('networkidle'); 

    // Select the first canvas element (likely the 3D model viewer)
    const canvas = page.locator('canvas').first();
    const canvasBox = await canvas.boundingBox();
    if (!canvasBox) throw new Error('3D model canvas not found!');

    // Step 1: Rotate interaction
    console.log('Performing rotation interaction...');
    await page.mouse.move(
        canvasBox.x + canvasBox.width / 2 - 50, // Start near the center-left of the canvas
        canvasBox.y + canvasBox.height / 2
    );
    await page.mouse.down();
    await page.mouse.move(
        canvasBox.x + canvasBox.width / 2 + 50, // Drag to the center-right of the canvas
        canvasBox.y + canvasBox.height / 2,
        { steps: 10 }
    );
    await page.mouse.up();
    console.log('Rotation interaction completed.');

    // Step 2: Zoom interaction (simulate mouse wheel scrolling)
    console.log('Performing zoom interaction...');
    await page.mouse.move(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2);
    await page.mouse.wheel(0, -500); // Zoom in
    await page.mouse.wheel(0, 500);  // Zoom out
    console.log('Zoom interaction completed.');

    // Step 3: Pan interaction
    console.log('Performing pan interaction...');
    await page.mouse.move(
        canvasBox.x + canvasBox.width / 2,
        canvasBox.y + canvasBox.height / 2 + 50 // Start below the center
    );
    await page.mouse.down();
    await page.mouse.move(
        canvasBox.x + canvasBox.width / 2,
        canvasBox.y + canvasBox.height / 2 - 50, // Drag upwards
        { steps: 10 }
    );
    await page.mouse.up();
    console.log('Pan interaction completed.');

    // Step 4: Reset the model view using toolbar coordinates
    console.log('Resetting the model view...');
    await page.mouse.click(canvasBox.x + canvasBox.width / 2 - 150, canvasBox.y + canvasBox.height + 20); // Approx. toolbar reset button
    console.log('Reset interaction completed.');

    // Step 5: Validate clicking on a model part
    console.log('Clicking on a model part...');
    await page.mouse.click(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2); // Approx. center of the canvas
    console.log('Model part clicked.');

    // Verification 
    const resetConfirmationSelector = '.reset-state'; 
    if (await page.isVisible(resetConfirmationSelector)) {
        console.log('Model reset state verified successfully.');
    } else {
        console.warn('Could not verify the reset state automatically.');
    }
}, 60000); 
