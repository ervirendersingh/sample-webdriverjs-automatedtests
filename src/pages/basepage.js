import { until } from 'selenium-webdriver'

async function waitForLocated(driver, locator, retries) {
  try {
    await driver.wait(until.elementLocated(locator), 7000);
  } catch(err) {
    if (retries === 0) {
      throw new Error('Unable to locate element ' + locator.toString() + 'after maximum retries, Error message: ' + err.message.toString())
    }
    await driver.sleep(250);
    return waitForLocated(driver, locator, retries - 1);
  }
}

async function waitForVisible(driver, locator, retries) {
  try {
    const element = await driver.findElement(locator);
    await driver.wait(until.elementIsVisible(element), 7000);
  } catch(err) {
    if (retries === 0) {
          throw new Error('Element not visible ' + locator.toString() + ', Error message: ' + err.message.toString())
    }
    await driver.sleep(250);
    return waitForVisible(driver, locator, retries - 1);
  }
}



export default class basepage {
  constructor(webdriver) {
    this.driver = webdriver;
  }

  async waitForDisplayed(locator) {
    await waitForLocated(this.driver, locator, 3);
    await waitForVisible(this.driver, locator, 3);
    return this.driver.findElement(locator);
  }

  async sendKeys(locator, text){
    try {
      await this.driver.sleep(500);
      const element = await this.driver.findElement(locator);
      await element.click();
      await element.clear();
      await element.sendKeys(text);
      return;
    } catch(err) {
          throw new Error('Unable to send keys to element ' + locator.toString() + ' , Error message: ' + err.message.toString())
    }
  }

  async isVisible(locator){
    try {
      await this.driver.sleep(500);
      const element = await this.driver.findElement(locator);
      const isDispl = await element.isDisplayed();
      console.log(isDispl);
      return isDispl;
    } catch(err) {
          throw new Error('Unable to find out element is visible ' + locator.toString() + ', Error message: ' + err.message.toString())
    }
  }

  async getDisplayCSSValue(locator){
    try {
      await this.driver.sleep(500);
      const element = await this.driver.findElement(locator);
      const css = await element.getCssValue('display');
      console.log(css);
      return css;
    } catch(err) {
          throw new Error('Unable to find css value of element ' + locator.toString() + ', Error message: ' + err.message.toString())
    }
  }

  async getText(locator){
    try {
      await this.driver.sleep(500);
      const element = await this.driver.findElement(locator);
      const text = await element.getText();
      return text;
    } catch(err) {
          throw new Error('Unable to find text of element ' + locator.toString() + ' , Error message: ' + err.message.toString())
    }
  }

  async click(locator) {
    try {
      await this.driver.sleep(500);
      const element = await this.driver.findElement(locator);
      await element.click();
      return;
    } catch(err) {
          throw new Error('Unable to click on element ' + locator.toString() + ', Error message: ' + err.message.toString())
    }
  }

}
