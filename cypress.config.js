const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'chromium') {
          // Esto elimina el rastro de que es un robot
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          return launchOptions;
        }
      });
    },
    baseUrl: 'https://tiend-app.vercel.app',
    experimentalMemoryManagement: true,
  },
});
