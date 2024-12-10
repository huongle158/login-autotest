// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 15000,
  requestTimeout: 8000,
  video: false,
  experimentalModifyObstructiveThirdPartyCode: true,
  watchForFileChanges: false,

  projectId: 'g3axih',
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: 'cypress/report/mochawesome-report',
    mochaFile: 'cypress/results/results-[hash].xml',
  },

  env: {
    apiBase: 'https://stg.revreply.com',
    emailValid: 'lucifer02032005@gmail.com',
    passwordValid: 'Giaphu02032005@',
    emailValid01: 'duykhanhrc2@gmail.com',
    passwordValid01: 'Eatteam123!',
    emailSmartleadValid: 'khanh.pham@automationtestpro.com',
    passwordSmartleadValid: 'Eatteam123!',
    emailInvalid: 'muho@example.com',
    passwordInvalid: '123456!',
    emailValid03: 'IhealthLab2024@gmail.com',
    passwordValid03: 'Test123!',
    emailValid04: 'lehuongvt15@gmail.com',
    passwordValid04: 'Test123!',
  },

  retries: {
    // Configure retry attempts for `cypress run`
    // Default is 0
    runMode: 1,
    // Configure retry attempts for `cypress open`
    // Default is 0
    openMode: 0,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://stg.revreply.com',
  },
})
