var assert = require('assert');
var Calc = require('./index.js');

function testIt(string, expectedResult, whatToTest) {
    'use strict';

    it(string, function() {
        assert.strictEqual(whatToTest, expectedResult);
    });
}

function testItException(string, expectedException, whatToTest) {
    'use strict';

    it(string, function() {
        assert.throws(whatToTest, expectedException);
    });
}

describe('Kaka', function() {
    'use strict';

    describe('Basic calculator', function() {
        testIt('empty string should return 0', 0, Calc.calc(''));
        testIt('"1" should return 1', 1, Calc.calc('1'));
        testIt('"1,2" string should return 3', 3, Calc.calc('1,2'));
    });

    describe('Unknown amount of numbers', function() {
        testIt('"1,2,3,4,5" string should return 15', 15, Calc.calc('1,2,3,4,5'));
        testIt('"1,2,3,4,5,6,7,8,9,10" string should return 55', 55, Calc.calc('1,2,3,4,5,6,7,8,9,10'));
    });

    describe('Newline and comma as delimeter', function() {
        testIt('"1\\n2,3" string should return 6', 6, Calc.calc('1\n2,3'));
        testIt('"1\\n2,3\\n4\\n5" string should return 15', 15, Calc.calc('1\n2,3\n4\n5'));
        testItException('"1,\\n" string should return error', Error, function() {
            Calc.calc('1,\n');
        });
    });

    describe('Custom delimeter', function() {
        testIt('"//;\\n" string should return 0', 0, Calc.calc('//;\n'));
        testIt('"//;\\n1" string should return 1', 1, Calc.calc('//;\n1'));
        testIt('"//,\\n1,2" string should return 3', 3, Calc.calc('//,\n1,2'));
        testIt('"//*\\n1*2*3*4*5" string should return 15', 15, Calc.calc('//*\n1*2*3*4*5'));
    });

    describe('Negative number not allowed', function() {
        testItException('"1,-3" string should return error', Error, function() {
            Calc.calc('1,-3');
        });
        testItException('"1,-3\\n10\\n-36" string should return error', Error, function() {
            Calc.calc('1,-3\n10\n-36');
        });
        testItException('"//@\\n1@-3@10@-36" string should return error', Error, function() {
            Calc.calc('//@\\n1@-3@10@-36');
        });
    });

    describe('Number bigger than 1000 is ignored', function() {
        testIt('"1,2,1001" string should return 3', 3, Calc.calc('1,2,1001'));
        testIt('"1,5\\n1001" string should return 6', 6, Calc.calc('1,5\n1001'));
        testIt('"//#\\n1#5#1001" string should return 6', 6, Calc.calc('//#\n1#5#1001'));
    });

    describe('Delimeter with any length', function() {
        testIt('"//***\\n1***2***5" string should return 8', 8, Calc.calc('//***\n1***2***5'));
    });

    describe('Multiple Delimeters', function() {
        testIt('"//[,][;]\\n1,2;5" string should return 8', 8, Calc.calc('//[,][;]\n1,2;5'));
        testIt('"//[***][###]\\n1***2&&&5" string should return 8', 8, Calc.calc('//[***][###]\n1***2###5'));
        testItException('"//[@][##]\\n1@-3##10@-36" string should return error', Error, function() {
            Calc.calc('//[@][##]\\n1@-3##10@-36');
        });
        testIt('"//[,][;]\\n1,2;5;2000" string should return 8', 8, Calc.calc('//[,][;]\n1,2;5;2000'));
    });
});
