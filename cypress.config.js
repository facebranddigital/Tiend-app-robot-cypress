const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://tiend-app-wogt.vercel.app',
    defaultCommandTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Implementar listeners aquí si es necesario
    },
  },
});
