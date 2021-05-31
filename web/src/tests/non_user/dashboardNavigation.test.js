import puppeteer from "puppeteer";

// Test constants
import TEST from "../testConstants";

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
  });
  page = await browser.newPage();
  await page.goto(TEST.LOCATION + "/logout");
  await page.goto(TEST.LOCATION + "/");
}, TEST.TIME_VERY_SHORT);

test(
  "check all inputs/buttons on landing page",
  async () => {
    await page.waitForSelector(".landingTest");

    const join = await page.$eval(".landingTest .joinTest", (e) => e.href);
    expect(join).toBe(TEST.LOCATION + "/signup");

    const login = await page.$eval(".landingTest .loginTest", (e) => e.href);
    expect(login).toBe(TEST.LOCATION + "/login");

    const support = await page.$eval(
      ".landingTest .supportTest",
      (e) => e.href
    );
    expect(support).toBe(TEST.LOCATION + "/support");
  },
  TEST.TIME_VERY_SHORT
);

test(
  "check all inputs/buttons on login page",
  async () => {
    await page.goto(TEST.LOCATION + "/login");
    await page.waitForSelector(".loginTest");

    const signup = await page.$eval(".loginTest .signupTest", (e) => e.href);
    expect(signup).toBe(TEST.LOCATION + "/signup");

    const email = await page.$eval(".loginTest .emailTest", (e) => {
      return {
        type: e.type,
        required: e.required,
        placeholder: e.placeholder,
      };
    });
    expect(email.type).toBe("email");
    expect(email.required).toBe(true);
    expect(email.placeholder).toMatch(/mail/g);

    const pass = await page.$eval(".loginTest .passTest", (e) => {
      return {
        type: e.type,
        required: e.required,
        placeholder: e.placeholder,
      };
    });
    expect(pass.type).toBe("password");
    expect(pass.required).toBe(true);
    expect(pass.placeholder).toMatch(/[p,P]ass/g);
  },
  TEST.TIME_VERY_SHORT
);

test(
  "check all inputs/buttons on signup page",
  async () => {
    await page.goto(TEST.LOCATION + "/signup");
    await page.waitForSelector(".signupTest");

    const login = await page.$eval(".signupTest .loginTest", (e) => e.href);
    expect(login).toBe(TEST.LOCATION + "/login");

    const email = await page.$eval(".signupTest .emailTest", (e) => {
      return {
        type: e.type,
        required: e.required,
        placeholder: e.placeholder,
      };
    });
    expect(email.type).toBe("email");
    expect(email.required).toBe(true);
    expect(email.placeholder).toMatch(/mail/g);

    const name = await page.$eval(".signupTest .nameTest", (e) => {
      return {
        type: e.type,
        required: e.required,
        placeholder: e.placeholder,
      };
    });
    expect(name.type).toBe("text");
    expect(name.required).toBe(true);
    expect(name.placeholder).toMatch(/[n,N]ame/g);

    const pass = await page.$eval(".signupTest .passTest", (e) => {
      return {
        type: e.type,
        required: e.required,
        placeholder: e.placeholder,
      };
    });
    expect(pass.type).toBe("password");
    expect(pass.required).toBe(true);
    expect(pass.placeholder).toMatch(/[p,P]ass/g);

    const passConfirm = await page.$eval(
      ".signupTest .passConfirmTest",
      (e) => {
        return {
          type: e.type,
          required: e.required,
          placeholder: e.placeholder,
        };
      }
    );
    expect(passConfirm.type).toBe("password");
    expect(passConfirm.required).toBe(true);
    expect(passConfirm.placeholder).toMatch(/[p,P]ass/g);
  },
  TEST.TIME_VERY_SHORT
);

afterAll(() => {
  browser.close();
});
