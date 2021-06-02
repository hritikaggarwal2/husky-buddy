module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js'],
    launch: {
      dumpio: true,
      headless: true,
      slowMo: 25
    },
    browser: 'chromium',
    browserContext: 'default',
    server: {
      command: `npm start`,
      port: 3000,
      launchTimeout: 30000,
      debug: true,
    },
  }
