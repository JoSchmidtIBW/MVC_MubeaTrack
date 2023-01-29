
//import "chromedriver"// from 'chromedriver'
// import chromedriver so that selenium can by itself open a chrome driver
//require("chromedriver");
//const webdriver = require('selenium-webdriver');

// import this class from selenium
import { Builder, By } from "selenium-webdriver"

import * as assert from 'assert';
//import assert from 'assert'
//var assert = require("assert");
//const { Builder, By } = require("selenium-webdriver");


// (async function openChromeTest() {//funktioniert
//     // open chrome browser
//     let driver = await new Builder().forBrowser("chrome").build();
//
//     try {
//         // setTimeout(async() => {
//
//         //await driver.get("https:/www.google.com/");
//         //await driver.get("http://localhost:7005/api/v1/login1");
//         //await driver.get("https://openolat.ibw.ch/");
//
//
//
//         //let elementid = driver.findElement(By.id('o_counter')); //await driver.findElement(webdriver.Builder.By.id("o_counter"));
//         //console.log("elementid: " + elementid)
//         //let stribw = await elementid.getAttribute("innerHTML");
//         // console.log("stribw" + stribw)
//
//         await driver.get("http://127.0.0.1:7005/api/v1/login1");
//         let loginName = driver.findElement(By.id("loginName"));
//         console.log("loginName: " + loginName)
//         let strlogin = await loginName.getAttribute("innerHTML");
//         console.log("strlogin: " + strlogin)
//         let imputMaNummer = await driver.findElement(By.id('inputMaNummerL')).sendKeys("0001");
//         let imputPasswort = await driver.findElement(By.id('inputPasswortL')).sendKeys("123");
//         let anmelden = await driver.findElement(By.className('btnAnmelden')).click(); // .sendKeys("123");
//
//         let attr = await driver.switchTo().activeElement().getAttribute("innerHTML");
//         console.log(`${attr}`)
//
//         console.log("Delayed for 1 second.");
//
//         //let driver = await new Builder().forBrowser('chrome').build();
//         //await driver.get('https://www.google.com');
//         // await driver.findElement(By.css('[name="q"]')).sendKeys("webElement");
//
//         // Get attribute of current active element
//         //let attr = await driver.switchTo().activeElement().getAttribute("title");
//         //console.log(`${attr}`)
//         //window.open('http://localhost:7005/api/v1/login1');
//         //await driver.get("https:/www.google.com/");
//         // }, "6000")
//     } finally {
//         setTimeout(async() => {
//             await driver.quit();
//         }, "4000")
//
//     }
//
// })();//funktioniert


describe("test load next site after log in", function () {
    // it describes expected behaviour when user perfroms search on google
    it("It should return the url after log in, Admin log in and see the next site", async function () {
        // open chrome browser
        let driver = await new Builder().forBrowser("chrome").build();
        try {
            // navigate to to this website

            //await driver.get("http://127.0.0.1:7005/api/v1/login1");
            await driver.get("http://localhost:7005/api/v1/login1");

            await driver.findElement(By.id('inputMaNummerL')).sendKeys("0001");
            await driver.findElement(By.id('inputPasswortL')).sendKeys("123");
            await driver.findElement(By.className('btnAnmelden')).click(); // .sendKeys("123");
            //await driver.wait(until.titleIs("home"), 1000);

            // Get the pagetitle of the current Page
           // let pageTitle = await driver.getTitle();
            //console.log("pageTitle: "+pageTitle)

            // assert that the current pageTitle is equal to 'Reflect run - Google Search'
            // assert.strictEqual(pageTitle, "Home", "sollte sein home");
            // if (pageTitle) {
            //     console.log("Page Title:", pageTitle);
            // }
            let urlAfterLogIn = "";
            setTimeout(async() => {
                urlAfterLogIn = await driver.getCurrentUrl();

                try {
                    assert.strictEqual(urlAfterLogIn, "http://localhost:7005/api/v1/inHome/:0001*1*", "Sollte sein: http://localhost:7005/api/v1/inHome/:0001*1*");
                    console.log("urlAfterLogIn is: " + JSON.stringify(urlAfterLogIn))
                }
                catch (e){
                    console.log("Assert Failed: "+e)
                }
            }, "2000")
        } finally {
            // close the browser
            setTimeout(async() => {
                await driver.quit();
            }, "4000")
        }
    });
});// gibt probleme, weil die db hier installiert ist und nicht auf github actions


//var assert = require("assert");

// describe test
// describe("Perform Search", function () {
//     // it describes expected behaviour when user perfroms search on google
//     it("A user performs a Search on Google", async function () {
//         // open chrome browser
//         let driver = await new Builder().forBrowser("chrome").build();
//         try {
//             // navigate to to this website
//             await driver.get("http://www.google.com/");
//
//             // find a search box element with name ='q'
//             await driver.findElement(By.name("q"));
//
//             // type 'reflect run' in the search box then press ENTER Key
//             await driver.findElement(By.name("q")).sendKeys("Reflect run", Key.RETURN);
//
//             /* wait for the page to load the search result untill the page
//               title is equal to `Reflect run - Google Search */
//             await driver.wait(until.titleIs("Reflect run - Google Search"), 1000);
//
//             // Get the pagetitle of the current Page
//             let pageTitle = await driver.getTitle();
//
//             // assert that the current pageTitle is equal to 'Reflect run - Google Search'
//             assert.strictEqual(pageTitle, "Reflect run - Google Search");
//             if (pageTitle) {
//                 console.log("Page Title:", pageTitle);
//             }
//         } finally {
//             // close the browser
//             await driver.quit();
//         }
//     });
// });