var assert = require('assert');
var calc = require('./index.js');

describe('Kaka', function () {
    "use strict";

    describe('Basic calculator', function () {
        testIt('empty string should return 0', 0, calc.calc(''));
        testIt('"1" should return 1', 1, calc.calc('1'));
        testIt('"1,2" string should return 3', 3, calc.calc('1,2'));
        testIt('"1,2,3,4,5" string should return 15', 15, calc.calc('1,2,3,4,5'));
        testIt('"1\\n2,3" string should return 6', 6, calc.calc('1\n2,3'));
    });

    describe('Unknown amount of numbers', function () {
        testIt('"1,2,3,4,5" string should return 15', 15, calc.calc('1,2,3,4,5'));
    });

    describe('Newline and comma as delimeter', function () {
        testIt('"1\\n2,3" string should return 6', 6, calc.calc('1\n2,3'));
        testItException('"1,\\n" string should return error', Error, function () {
            calc.calc('1,\n');
        });
    });

    describe('Custom delimeter', function () {
        testIt('"//;\\n1;2" string should return 3', 3, calc.calc('//;\n1;2'));
        testIt('"//,\\n1,2" string should return 3', 3, calc.calc('//,\n1,2'));
    });

    describe('Negative number not allowed', function () {
        testItException('"1,-3" string should return error', Error, function () {
            calc.calc('1,-3');
        });
        testItException('"1,-3,10,-36" string should return error', Error, function () {
            calc.calc('1,-3,10,-36');
        });
    });

    describe('Number bigger than 1000 is ignored', function () {
        //
    });

    describe('Negative number not allowed', function () {
        //
    });

    describe('Delimeter with any length', function () {
        //
    });

    describe('Multiple Delimeters', function () {
        //
    });
});

function testIt(string, expectedResult, whatToTest) {
    "use strict";

    it(string, function() {
        assert.strictEqual(whatToTest, expectedResult);
    });
}

function testItException(string, expectedException, whatToTest) {
    "use strict";

    it(string, function() {
        assert.throws(whatToTest, expectedException);
    });
}
