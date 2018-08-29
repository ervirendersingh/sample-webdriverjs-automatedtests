var assert = require('assert');
const {Builder, By, until} = require('selenium-webdriver');
import dbKodaHomePage from './../src/pages/dbKodaHome'
const config = require('./../config/appConfig');

describe('Part2 Web Tests', function() {
  let driver
  let dbKodaHP
  beforeEach(async function () {
    driver = await new Builder().forBrowser(config.browser).build();
    await driver.get(config.baseURL);
  })

  afterEach(async function () {
    await driver.quit();
  })


    it('The website http://www.dbkoda.com  is reachable', async function(){
        const dbKodaHP = new dbKodaHomePage(driver)
        await dbKodaHP.isLoaded()
        var title = await driver.getTitle();
        assert.equal('dbKoda | dbKoda is the open-source, next generation IDE for MongoDB. Take your database to the next level with our Rich Code Editor, Multiple Connection Management and Topology Tree Explorer.',title)
    })

    it('The Download link at the top of the page navigates to the downloads section', async function(){
        const dbKodaHP = new dbKodaHomePage(driver)
        await dbKodaHP.isLoaded()
        await dbKodaHP.navToDownloadsSection()
        const isDownloadSectionVisible = await dbKodaHP.isDownloadSectionVisible()
        assert.equal(isDownloadSectionVisible, true)
    })

    it('The “Subscribe” button is visible', async function(){
        const dbKodaHP = new dbKodaHomePage(driver)
        await dbKodaHP.isLoaded()
        const isSubscribeVisible = await dbKodaHP.isSubscribeVisible()
        assert.equal(isSubscribeVisible, true)
    })

    it('Clicking subscribe brings up the username/email dialogue', async function(){
        const dbKodaHP = new dbKodaHomePage(driver)
        await dbKodaHP.isLoaded()
        await dbKodaHP.navToSubscribe()
        const isSubscribePopUpDisplayed = await dbKodaHP.isSubscribeModalDisplayed()
        assert.equal(isSubscribePopUpDisplayed, true)
    })

    it('The email field rejects obviously incorrect emails (ones not containing an “@” symbol for instance', async function(){
        const dbKodaHP = new dbKodaHomePage(driver)
        await dbKodaHP.isLoaded()
        await dbKodaHP.navToSubscribe()
        await dbKodaHP.setSubscriptionDetailsAs('test','testemail')
        const isSubscribePopUpDisplayed = await dbKodaHP.isSubscribeModalDisplayed()
        assert.equal(isSubscribePopUpDisplayed, true)
    })

    it('Subscription Success test', async function(){
        const dbKodaHP = new dbKodaHomePage(driver)
        await dbKodaHP.isLoaded()
        await dbKodaHP.navToSubscribe()
        await dbKodaHP.setSubscriptionDetailsAs('test','test@test.com')
        const isSubscribeSuccessPopUpDisplayed = await dbKodaHP.isSubscriptionSuccessModalDisplayed()
        assert.equal(isSubscribeSuccessPopUpDisplayed, true)
    })


});
