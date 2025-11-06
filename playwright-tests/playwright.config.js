const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    
    baseURL: 'http://localhost:4200',
  },
});
