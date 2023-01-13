
//import "chromedriver"// from 'chromedriver'
// import chromedriver so that selenium can by itself open a chrome driver
//require("chromedriver");
//const webdriver = require('selenium-webdriver');

// import this class from selenium
import { Builder, By } from "selenium-webdriver"
//const { Builder, By } = require("selenium-webdriver");


(async function openChromeTest() {
    // open chrome browser
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        // setTimeout(async() => {

        //await driver.get("https:/www.google.com/");
        //await driver.get("http://localhost:7005/api/v1/login1");
        //await driver.get("https://openolat.ibw.ch/");



        //let elementid = driver.findElement(By.id('o_counter')); //await driver.findElement(webdriver.Builder.By.id("o_counter"));
        //console.log("elementid: " + elementid)
        //let stribw = await elementid.getAttribute("innerHTML");
        // console.log("stribw" + stribw)

        await driver.get("http://127.0.0.1:7005/api/v1/login1");
        let loginName = driver.findElement(By.id("loginName"));
        console.log("loginName: " + loginName)
        let strlogin = await loginName.getAttribute("innerHTML");
        console.log("strlogin: " + strlogin)
        let imputMaNummer = await driver.findElement(By.id('inputMaNummerL')).sendKeys("0001");
        let imputPasswort = await driver.findElement(By.id('inputPasswortL')).sendKeys("123");
        let anmelden = await driver.findElement(By.className('btnAnmelden')).click(); // .sendKeys("123");

        let attr = await driver.switchTo().activeElement().getAttribute("innerHTML");
        console.log(`${attr}`)

        console.log("Delayed for 1 second.");

        //let driver = await new Builder().forBrowser('chrome').build();
        //await driver.get('https://www.google.com');
        // await driver.findElement(By.css('[name="q"]')).sendKeys("webElement");

        // Get attribute of current active element
        //let attr = await driver.switchTo().activeElement().getAttribute("title");
        //console.log(`${attr}`)
        //window.open('http://localhost:7005/api/v1/login1');
        //await driver.get("https:/www.google.com/");
        // }, "6000")
    } finally {
        setTimeout(async() => {
            await driver.quit();
        }, "4000")

    }





})();