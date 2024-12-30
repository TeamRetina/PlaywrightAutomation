const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect : {
     timeout : 5000
  },
  
  reporter : 'html',
  use: {
    headless: false, 
    baseURL: 'https://webapp.simulationhub.com', 
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure',
  },
});
