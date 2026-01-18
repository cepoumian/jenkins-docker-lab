// test.js
const assert = require("assert");
const sum = require("./sum");

assert.strictEqual(sum(1, 2), 3);
assert.strictEqual(sum(-1, 1), 0);
assert.strictEqual(sum(10, -5), 5);

console.log("All tests passed");
