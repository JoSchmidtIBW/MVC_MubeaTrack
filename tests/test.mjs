import * as assert from 'assert';

import sum from '../server.mjs';

// This is a comment
describe("Test server.mjs", function() {
    it("Test the sum method", function() {
        assert.equal(sum(1, 2), 4);
    })
})


// ev muss der server ausgeschaltet sein
// starten mit npm run test