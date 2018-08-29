// @flow
import { By } from 'selenium-webdriver'
import basepage from './basepage'

const lnkDownloads = By.css('.nav.navbar-nav > li:nth-child(2) > a')
const eltCaption = By.css('#hero-content div.caption>h1')
const btnSubscribe = By.css('#about button.btn.btn-primary');
const navlnkTeam = By.css('.nav.navbar-nav li:nth-child(3) > a');
const eltDownloadSectionHdng = By.css('#downloads h1');
const eltModalSubscribe = By.css('#modal-notification01');
const txtName_SubscriptionModal = By.css('#exampleInputName');
const txtEmail_SubscriptionModal = By.css('#exampleInputEmail');
const btnSubscribe_SubscriptionModal = By.css('#subscribeBtn');
const eltSubscriptionSuccessModal = By.css('#modal-notification02');

export default class dbKodaHome extends basepage {

  async isLoaded() {
    let captiontext = await this.getText(eltCaption)
    return (captiontext === 'BRING PERFORMANCE INTO FOCUS WITH DBKODA!');
  }

  async isSubscribeVisible() {
    await this.click(navlnkTeam)
    await this.waitForDisplayed(btnSubscribe)
    let isVisible = await this.isVisible(btnSubscribe)
    return isVisible;
  }

  async isDownloadSectionVisible() {
    await this.waitForDisplayed(eltDownloadSectionHdng)
    let isVisible = await this.isVisible(eltDownloadSectionHdng)
    return isVisible;
  }

  async navToDownloadsSection() {
    await this.click(eltDownloadSectionHdng)
    await this.waitForDisplayed(eltDownloadSectionHdng)
  }
  async navToSubscribe() {
    await this.click(navlnkTeam)
    await this.waitForDisplayed(btnSubscribe)
    await this.click(btnSubscribe)
  }

  async setSubscriptionDetailsAs(name,email) {
    await this.sendKeys(txtName_SubscriptionModal,name)
    await this.sendKeys(txtEmail_SubscriptionModal,email)
    await this.click(btnSubscribe_SubscriptionModal)
  }

  async isSubscribeModalDisplayed() {
    await this.waitForDisplayed(eltModalSubscribe)
    let isSubsModalVisible = await this.getDisplayCSSValue(eltModalSubscribe)
    return (isSubsModalVisible==='block');
  }

  async isSubscriptionSuccessModalDisplayed() {
    await this.waitForDisplayed(eltSubscriptionSuccessModal)
    let isSubsSuccessModalVisible = await this.getDisplayCSSValue(eltSubscriptionSuccessModal)
    return (isSubsSuccessModalVisible==='block');
  }
}
