// This is module Utilities. It contains all utilities functions.
// It has some internal private functions that are inaccessible from outside.
// It reveals only the outermost functions to the public and hide others.

// Module pattern, encapsulation, state and organization using Javascript closures.

var Utilities = (function() {
    'use strict';

    // This function is to parse and return regex from the expression.
    // It will detect and handle the simple case.
    // Difficult case returns false.

    function getDelimeterRegex(expression) {
        // it's either comma or newline, but shouldn't be both

        if (expression.match(/,\n|\n,/)) {
            throw new Error('Input expression contain invalid delimeter');
        } else {
            return /,|\n/g;
        }
    }

    // This function is to parse and return regex from the expression.
    // It will handle the difficult case.

    function getNumbersFromComplexDelimeter(expression) {

        var delimeterPart = processComplexExpression(expression)[0];
        var regex;

        if (delimeterPart.indexOf('][') > -1) {
            // custom 2 delimeter

            // remove first [ and last ]
            delimeterPart = delimeterPart.substring(1, delimeterPart.length - 1);

            // split by ][
            var delimetersArr = delimeterPart.split('][');

            // compose regex with those delimeters
            for (var i = 0, len = delimetersArr.length; i < len; i++) {
                delimetersArr[i] = delimetersArr[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            }

            regex = new RegExp(delimetersArr.join('|'), 'g');
        } else {

            // one delimeter
            regex = new RegExp(delimeterPart.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
        }

        return regex;
    }

    // get rid of the '//' at the beginning and split into 2 parts.
    function processComplexExpression(expression) {
        return expression.substring(2, expression.length).split('\n');
    }

    // check if first 2 chars are // - difficult case detection
    function checkComplexCase(expression) {

        if (expression.substring(0, 2) === '//') {
            return true;
        } else {
            return false;
        }
    }

    return {
        // This function return arr of int numbers from expression
        getNumbers: function(expression) {

            var delimeter;

            if (!checkComplexCase(expression)) {
                // trying to get the delimeter using basic approach

                delimeter = getDelimeterRegex(expression);
            } else {
                // if basic fails, try complex

                delimeter = getNumbersFromComplexDelimeter(expression);

                // complex case need processed expression string.
                expression = processComplexExpression(expression)[1];
            }

            var arr = expression.split(delimeter);

            for (var i = 0, len = arr.length; i < len; i++) {
                arr[i] = parseInt(arr[i], 10) || 0;
            }

            return arr;
        },

        // This function calc sum from arr of int
        sum: function(nums) {
            var total = 0;
            var negativePool = []; // pool contain negative error if any, else empty

            for (var i = 0, len = nums.length || 0; i < len; i++) {
                if (nums[i] < 0) {
                    // negative number, pour it into pool
                    negativePool.push(nums[i] + '');
                } else {
                    if (nums[i] > 1000) {
                        // bigger than 1000 numbers assume 0.
                        nums[i] = 0;
                    }
                    total += nums[i];
                }
            }

            // if there is anything in pool, throw error.
            if (negativePool.length) {
                throw new Error('Negatives not allowed: ' + negativePool.join());
            }

            return total;
        }
    };
})();

// This is constructor to create an export Calculator
function Calc() {
    'use strict';

    this.calc = function(expression) {

        if (!expression) {
            // if expression is null/undefined/empty, return 0
            return 0;
        } else {
            var arr = Utilities.getNumbers(expression);
            return Utilities.sum(arr);
        }
    } || undefined;
}

// export the object for use.
module.exports = new Calc();
