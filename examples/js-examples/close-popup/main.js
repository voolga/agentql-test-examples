const { wrap, configure } = require('agentql');
const { chromium } = require('playwright');

// Set the URL to the desired website
const URL = 'https://kinfield.com/';

const CLOSE_POPUP_QUERY = `
{
    popup_form {
        close_btn
    }
}
`;

async function main() {
  // Configure the AgentQL API key
  configure({
    apiKey: process.env.AGENTQL_API_KEY, // This is the default and can be omitted.
  });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // Wrap the page to get access to the AgentQL's querying API
  const page = await wrap(await context.newPage());

  await page.goto(URL);

  // Extract data using AgentQL API's queryElements() method
  const response = await page.queryElements(CLOSE_POPUP_QUERY);
  await response.popup_form.close_btn.click();

  // Wait for 10 seconds to see the browser in action
  await page.waitForTimeout(10000);

  await browser.close();
}

main();
