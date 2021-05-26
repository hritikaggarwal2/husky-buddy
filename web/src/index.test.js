import puppeteer from "puppeteer";

// User info
const welcomeMessage = "Welcome, Tuesday User";
const user = "tuesdayuser@uw.edu";
const pass = "password";

// New group info
const gN = "Puppeteer Test";
const prefix = "PUP";
const num = "101";
const section = "A";
const topics = "Testing, Puppeteer, Homework";
const gS = "10";
const meet = true;
const message = "Puppeteer Test message";

describe.only("End-to-End Test", () => {
  it("Landing-to-Login", async () => {
    let retVal;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/");

    // Click on Sign In button and check if we are on login screen
    await page.waitForXPath("//*[@class='landingPg']");
    await page.click(".primaryText");
    retVal = await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]",
      { timeout: 2000 }
    );
    expect(retVal).not.toBe(null);

    browser.close();
  }, 20000);

  it("Login-to-Dashboard", async () => {
    let retVal;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/login");

    // Sign in and check if we're at dashboard
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    await page.type('input[placeholder="Enter Email"', user);
    await page.type('input[placeholder="Enter Password"', pass);
    const [button] = await page.$x("//button[contains(., 'Sign In')]");
    await button.click();
    retVal = await page.waitForXPath(
      "//*[@class='btnPrimaryFill' and contains(., 'Create Group')]"
    );
    expect(retVal).not.toBe(null);
    retVal = await page.waitForXPath(
      "//*[@class='btnPrimaryFill' and contains(., 'Search Group')]"
    );
    expect(retVal).not.toBe(null);

    browser.close();
  }, 20000);

  // TODO: FIGURE OUT WHY I GET DIFFERENT RESULTS IF I REMOVE SLOWmO
  // DATA IS NO LONGER STORED IN FIREBASE WHEN I REMOVE IT
  it("Create Group", async () => {
    let retVal;
    let button;
    const browser = await puppeteer.launch({ headless: true, slowMo: 25 });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/login");

    // Sign in
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    await page.type('input[placeholder="Enter Email"', user);
    await page.type('input[placeholder="Enter Password"', pass);
    [button] = await page.$x("//button[contains(., 'Sign In')]");
    await button.click();

    // Create a group
    await page.waitForXPath(
      "//*[@class='btnPrimaryFill' and contains(., 'Create Group')]"
    );
    [button] = await page.$x("//button[contains(., 'Create Group')]");
    await button.click();
    retVal = await page.$x("//input[contains(., 'Create Group')]");
    expect(retVal).not.toBe(null);

    await page.waitForXPath("//*[@class='inputComponent']");
    await page.waitForXPath(
      "//*[@class='btnPrimaryFill' and contains(., 'Create')]"
    );
    await page.type('input[placeholder="Group Name"', gN);
    await page.type('input[placeholder="Class Prefix"', prefix);
    await page.type('input[placeholder="Class Number"', num);
    await page.type('input[placeholder="Class Section (Optional)"', section);
    await page.type(
      'input[placeholder="Topics of Interest (Optional)"',
      topics
    );
    await page.type('input[placeholder="Max Group Size"', gS);
    await page.click('input[type="checkbox"');
    [button] = await page.$x("//button[contains(., 'Create')]");
    await button.click();

    // Check if group was created
    retVal = await page.$x("//div[contains(., '" + gN + "')]");
    expect(retVal).not.toBe(null);

    browser.close();
  }, 20000);

  // Test Expects a user to have joined some group already
  it("Enter Chat", async () => {
    let retVal;
    let button;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/login");

    // Sign in
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    await page.type('input[placeholder="Enter Email"', user);
    await page.type('input[placeholder="Enter Password"', pass);
    [button] = await page.$x("//button[contains(., 'Sign In')]");
    await button.click();

    // Click on group
    await page.waitForXPath(
      "//*[@class='groupBox' and contains(., '" + gN + "')]"
    );
    [button] = await page.$x(
      "//div[@class='groupBox' and descendant::h3[contains(., '" + gN + "')]]"
    );
    await button.click();

    // Check if navigated to chat screen
    [button] = await page.$x(
      "//*[@class='sendButton' and contains(., 'Send Message')]"
    );
    expect(button).not.toBe(undefined);

    browser.close();
  }, 20000);

  // Test Expects a user to have joined some group already
  // TODO: SAME AS CREATE GROUP, INCLUDING SLOWmO WILL ACTUALLY STORE THE MESSAGE
  // IF IT'S NOT INCLUDED, WILL NOT RECORD MESSAGE TO FIREBASE
  it("Send Chat", async () => {
    let retVal;
    let button;
    const browser = await puppeteer.launch({ headless: true, slowMo: 25 });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/login");

    // Sign in
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    await page.type('input[placeholder="Enter Email"', user);
    await page.type('input[placeholder="Enter Password"', pass);
    [button] = await page.$x("//button[contains(., 'Sign In')]");
    await button.click();

    // Click on group
    await page.waitForXPath(
      "//*[@class='groupBox' and contains(., '" + gN + "')]"
    );
    [button] = await page.$x(
      "//div[@class='groupBox' and descendant::h3[contains(., '" + gN + "')]]"
    );
    await button.click();

    // Check if navigated to chat screen
    [button] = await page.$x(
      "//*[@class='sendButton' and contains(., 'Send Message')]"
    );
    expect(button).not.toBe(undefined);

    // Type and send a message
    await page.type('input[class="messageInputer"', message);
    button.click();
    await page.waitForXPath(
      "//*[@class='messageContents' and contains(., '" + message + "')]"
    );

    browser.close();
  }, 20000);

  // Tests if search functionality works
  it("Search Groups", async () => {
    let retVal;
    let button;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/login");

    // Sign in
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    await page.type('input[placeholder="Enter Email"', user);
    await page.type('input[placeholder="Enter Password"', pass);
    [button] = await page.$x("//button[contains(., 'Sign In')]");
    await button.click();

    // Make sure search button is present
    await page.waitForXPath(
      "//*[@class='btnPrimaryFill' and contains(., 'Search Groups')]"
    );
    [button] = await page.$x("//button[contains(., 'Search Groups')]");
    await button.click();
    [button] = await page.$x("//button[contains(., 'Search')]");
    expect(button).not.toBe(undefined);
    expect(button).not.toBe(null);

    browser.close();
  }, 20000);

  // Tests if a user can delete a group
  it("Leave Group", async () => {
    let retVal;
    let button;
    const browser = await puppeteer.launch({ headless: true, slowMo: 120 });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/login");

    // Sign in
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    await page.type('input[placeholder="Enter Email"', user);
    await page.type('input[placeholder="Enter Password"', pass);
    [button] = await page.$x("//button[contains(., 'Sign In')]");
    await button.click();

    // Click on group
    await page.waitForXPath(
      "//*[@class='groupBox' and contains(., '" + gN + "')]"
    );
    [button] = await page.$x(
      "//div[@class='groupBox' and descendant::h3[contains(., '" + gN + "')]]"
    );
    await button.click();

    // Check if navigated to chat screen
    [button] = await page.$x(
      "//*[@class='sendButton' and contains(., 'Send Message')]"
    );
    expect(button).not.toBe(undefined);

    // Delete Group
    await page.waitForXPath("//*[@class='dropdown']");
    [button] = await page.$x("//*[@class='dropdown']");
    expect(button).not.toBe(undefined);
    button.click();
    await page.waitForSelector(".sidenavBtn");
    await page.click(".sidenavBtn");

    /*await page.waitForXPath("//*[@class='sidenavBtn']");
        [button] = await page.$x("//*[@class='sidenavBtn' and contains(., 'Delete Group')]");
        expect(button).not.toBe(undefined);
        button.click();*/

    // Check if deleted group is no longer viewable
    retVal = await page.$x("//div[contains(., '" + gN + "')]");
    expect(retVal).toEqual([]);

    browser.close();
  }, 20000);

  // Tests if logout works
  it("Logout", async () => {
    let retVal;
    let button;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://study-buddy-uw.web.app/login");

    // Sign in and check if we're at dashboard
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    await page.type('input[placeholder="Enter Email"', user);
    await page.type('input[placeholder="Enter Password"', pass);
    [button] = await page.$x("//button[contains(., 'Sign In')]");
    await button.click();
    retVal = await page.waitForXPath(
      "//*[@class='btnPrimaryFill' and contains(., 'Create Group')]"
    );
    expect(retVal).not.toBe(null);
    retVal = await page.waitForXPath(
      "//*[@class='btnPrimaryFill' and contains(., 'Search Group')]"
    );
    expect(retVal).not.toBe(null);

    // Logout
    [button] = await page.$x("//button[contains(., 'Logout')]");
    await button.click();

    // Check if we're back at sign in page
    await page.waitForXPath(
      "//*[@class='title' and contains(., 'Husky Buddy.')]"
    );
    browser.close();
  }, 20000);
});
