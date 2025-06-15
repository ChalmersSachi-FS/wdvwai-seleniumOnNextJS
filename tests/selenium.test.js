const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

jest.setTimeout(30000);

describe("Selenium Testing Assignment", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(
        new chrome.Options().addArguments("--headless", "--disable-gpu")
      )
      .build();

    await driver.get("http://localhost:3000");
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test("should open homepage and check title is Home", async () => {
    await driver.get("http://localhost:3000/");
    await driver.wait(until.titleIs("Home"), 5000);
    const title = await driver.getTitle();
    expect(title).toBe("Home");
  });

  test("should open contact page and check title is Contact Us", async () => {
    await driver.get("http://localhost:3000/contact");
    await driver.wait(until.titleIs("Contact Us"), 5000);
    const title = await driver.getTitle();
    expect(title).toBe("Contact Us");
  });

  test("should sign up for more info via email and check confirmation message", async () => {
    await driver.get("http://localhost:3000/");
    const email = "test@example.com";

    const emailField = await driver.findElement(
      By.css('input[type="email"], input[name="email"], input[id*="email"]')
    );
    await emailField.sendKeys(email);

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.id("confirmation")), 5000);
    const text = await driver.findElement(By.id("confirmation")).getText();

    expect(text).toBe(`More info coming to ${email}`);
  });
});
