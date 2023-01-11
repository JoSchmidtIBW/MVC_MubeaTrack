import * as assert from 'assert';

import sum from '../server.mjs';
import isPositivNumber from "../utils/kundenErstellenValidate.mjs";

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
    it("should return false --> 123.01 is not a positiv number without Number after comma", function() {
        let str = "-123"
        assert.equal(isPositivNumber("Hans123"), false, "false");
    })
})



// ev muss der server ausgeschaltet sein
// starten mit npm run test