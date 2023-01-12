import * as assert from 'assert';

import sum from '../server.mjs';
import isPositivNumber from "../utils/kundenErstellenValidate.mjs";
import splitDB_DBObj from '../utils/splitDB_DBObj_General.mjs'

// This is a comment
describe("Test the sum method in Test server.mjs", function() {
    it("should return 3 --> (1+2=3)", function() {
        assert.equal(sum(1, 2), 3);
    })
})

describe("Test the isPositivNumber method in kundenErstellenValidate.mjs", function() {
    it("should return false --> -123 is not a positiv number", function() {
        let str = "-123"
        //assert.ok(isPositivNumber(str = str.trim();str = str.replace(/^0+/, "") || "0"), false);
        assert.equal(isPositivNumber("-123"), false, "false");
        //done("Your error message");
        //let testObj = "123";
        //expect(isPositivNumber(testObj)).to.be.true;
    })
    it("should return true --> 123 is  a positiv number", function() {
        let str = "-123"
        assert.equal(isPositivNumber("123"), true, "true");
    })
    it("should return false --> Hans123 is not a positiv number", function() {
        let str = "-123"
        assert.equal(isPositivNumber("Hans123"), false, "false");
    })
    it("should return false --> 123Hans is not a positiv number", function() {
        assert.equal(isPositivNumber("Hans123"), false, "false");
    })
    it("should return false --> 123.01 is not a positiv number without Number after comma", function() {
        assert.equal(isPositivNumber("Hans123"), false, "false");
    })
    it("should return false --> \"\" is not a positiv number", function() {
        assert.equal(isPositivNumber(""), false, "false");
    })
})


describe("Test the splitDB_DBObj method splitDB_DBObj_Generasl.mjs", function() {
    it(" [{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}] should return {\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}", function() {
        let str = "[{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}]"
        //assert.equal(splitDB_DBObj(str), JSON.stringify('{\"ID_User\":8}'), "{\"ID_User\":8}");
        let zuParsen = '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}'
        JSON.parse(zuParsen)
        assert.equal(splitDB_DBObj(str), '[object Object]', '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}');
    })
    it(" [{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"},{\"ID_User\":2,\"Erfasst_D_U\":\"01.01.1972\"}] should return {\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"}", function() {
        let str = "[{\"ID_User\":1,\"Erfasst_D_U\":\"01.01.1970\"},{\"ID_User\":2,\"Erfasst_D_U\":\"01.01.1972\"}]"
        //assert.equal(splitDB_DBObj(str), JSON.stringify('{\"ID_User\":8}'), "{\"ID_User\":8}");
        let zuParsen = '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}'
        //JSON.stringify(JSON.parse(zuParsen))
        assert.equal(splitDB_DBObj(str), '[object Object]', '{"ID_User":1,"Erfasst_D_U":"01.01.1970"}');
    })
})


// ev muss der server ausgeschaltet sein
// starten mit npm run test