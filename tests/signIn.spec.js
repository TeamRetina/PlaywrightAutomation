const { test, expect } = require('@playwright/test');

test('@Test Sign-In Button Functionality', async ({ browser }, testInfo) => {
    testInfo.setTimeout(60000); 

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://webapp.simulationhub.com/autonomous-valve-cfd/FoRHLRU/results?public=true");

    const signIn = page.locator("#wrapper > div.row > nav > ul > li:nth-child(6) > button");
    const email = page.locator("#l_email");
    const next = page.locator("#btn_get_user");
    const close = page.locator("#loginErrId > i");
    const password = page.locator("#l_password"); 

    // Click on SIGN IN button
    await signIn.click();
    console.log("Clicked on the SIGN IN button successfully");
    console.log("SIGN IN page opened successfully");

    await email.waitFor({ state: 'visible', timeout: 10000 });

    // Send invalid email
    await email.fill("prajyot.gujarkar@123");
    console.log("Invalid email sent successfully");

    await next.waitFor({ state: 'visible', timeout: 10000 });

    // Click on next button
    await next.click();
    console.log("Clicked on the next button successfully");

    await page.locator("#loginErrId").waitFor({ state: 'visible', timeout: 15000 });

    // Check if the error message text is visible
    const errorMessage = await page.locator("#loginErrId").textContent();
    console.log("Error message content:", errorMessage);

    if (!errorMessage || errorMessage.trim() === "") {
        throw new Error("Error message did not appear as expected.");
    }

    await close.waitFor({ state: 'visible', timeout: 10000 });

    // Click on close icon
    await close.click({ force: true });
    console.log("Clicked on close icon successfully");

    // Clear email text box
    await email.clear();
    console.log("Email text box cleaned up successfully");

    // Now send valid email
    await email.fill("prajyot.gujarkar@cctech.co.in");
    console.log("Valid email sent successfully");

    // Click on next button
    await next.click();
    console.log("Clicked on the next button successfully");

    await context.close();
});
