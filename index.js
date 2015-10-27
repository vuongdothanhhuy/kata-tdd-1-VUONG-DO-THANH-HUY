var Utilities = {
    getNumbers: function (expression) {
        'use strict';

        var delimeter = this.getDelimeterRegex(expression);

        if (delimeter === false) {
            return this.getNumbersFromComplexDelimeter(expression);
        } else {
            var arr = expression.split(delimeter);

            for (var i = 0, len = arr.length; i < len; i++) {
                arr[i] = parseInt(arr[i], 10) || 0;
            }

            return arr;
        }

    },

    getDelimeterRegex: function (expression) {
        'use strict';

        // check if first 2 chars are //
        if (expression.substring(0, 2) === '//') {
            return false;
        } else {
            // it's either comma or newline, but shouldn't be both
            if (expression.match(/,\n|\n,/)) {
                throw new Error('Input expression contain invalid delimeter');
            } else {
                return /,|\n/g;
            }
        }
    },

    getNumbersFromComplexDelimeter: function (expression) {
        'use strict';

        expression = expression.substring(2, expression.length).split('\n');
        var delimeterPart = expression[0];
        var stringPart = expression[1];
        var regex = new RegExp(delimeterPart, 'g');

        var arr = stringPart.split(regex);

        for (var i = 0, len = arr.length; i < len; i++) {
            arr[i] = parseInt(arr[i], 10) || 0;
        }
        return arr;
    },

    sum: function (nums) {
        'use strict';

        var total = 0;
        var negativePool = [];

        for (var i = 0, len = nums.length || 0; i < len; i++) {
            if (nums[i] < 0) {
                negativePool.push(nums[i] + '');
            } else {
                total += nums[i];
            }
        }

        if (negativePool.length) {
            throw new Error('Negative number not allow: ' + negativePool.join());
        }

        return total;
    }
};

module.exports = {
    calc: function (expression) {
        'use strict';

        // case 1: if expression is null/undefined/empty, return 0
        if (!expression) {
            return 0;
        } else {
            var arr = Utilities.getNumbers(expression);
            return Utilities.sum(arr);
        }
    }
};
