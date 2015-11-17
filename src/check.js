'use strict';

function checkIfInvalid(arrayToCheck) {
    return typeof arrayToCheck === 'undefined' || arrayToCheck.length === 0;
}

exports.init = function () {
    Object.prototype.checkContainsKeys = function (keys) {
        if (checkIfInvalid(keys)) {
            return null;
        }
        if (Object.getPrototypeOf(this) === Object.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            var contains = true;
            var thisKeys = Object.keys(this);
            keys.forEach(function (key) {
                if (thisKeys.indexOf(key.toString()) === -1) {
                    contains = false;
                }
            });
            return contains;
        }
    };

    Object.prototype.checkHasKeys = function (keys) {
        if (checkIfInvalid(keys)) {
            return null;
        }
        if (Object.getPrototypeOf(this) === Object.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            if (Object.keys(this).length !== keys.length) {
                return false;
            }

            var stringKeys = keys.map(function (key) {
                return key.toString();
            });
            var contains = true;
            var thisKeys = Object.keys(this);
            stringKeys.forEach(function (key) {
                if (thisKeys.indexOf(key) === -1) {
                    contains = false;
                }
            });
            thisKeys.forEach(function (key) {
                if (stringKeys.indexOf(key) === -1) {
                    contains = false;
                }
            });
            return contains;
        }
    };

    Object.prototype.checkContainsValues = function (values) {
        if (checkIfInvalid(values)) {
            return null;
        }
        if (Object.getPrototypeOf(this) === Object.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            var ownValues = [];
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    ownValues.push(this[i]);
                }
            }
            var contains = true;
            Object.keys(values).forEach(function (key) {
                if (ownValues.indexOf(values[key]) === -1) {
                    contains = false;
                }
            });
            return contains;
        }
    };

    Object.prototype.checkHasValues = function (values) {
        if (checkIfInvalid(values)) {
            return null;
        }
        if (Object.getPrototypeOf(this) === Object.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            var ownValues = [];
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    ownValues.push(this[i]);
                }
            }
            if (ownValues.length !== values.length) {
                return false;
            }

            var contains = true;
            Object.keys(values).forEach(function (key) {
                if (ownValues.indexOf(values[key]) === -1) {
                    contains = false;
                }
            });
            ownValues.forEach(function (value) {
                if (values.indexOf(value) === -1) {
                    contains = false;
                }
            });
            return contains;
        }
    };

    Object.prototype.checkHasValueType = function (key, type) {
        if (checkIfInvalid(key) || checkIfInvalid(type) ||
            [String, Number, Function, Array].indexOf(type) < 0) {
            return null;
        }
        if (Object.getPrototypeOf(this) === Object.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            // через прототипы не получается, type всегда функция
            return typeof this[key] === type.name.toLowerCase();
        }
    };

    Object.prototype.checkHasLength = function (length) {
        if (checkIfInvalid(length)) {
            return null;
        }
        if (Object.getPrototypeOf(this) === String.prototype ||
            Object.getPrototypeOf(this) === Array.prototype) {
            return this.length === length;
        }
    };

    Function.prototype.checkHasParamsCount = function (count) {
        if (checkIfInvalid(count)) {
            return null;
        }
        return this.length === count;

    };

    String.prototype.checkHasWordsCount = function (count) {
        if (checkIfInvalid(count)) {
            return null;
        }
        var originalString = this;
        var splittedString = [];
        if (this.indexOf('\n') + 1) {
            splittedString = originalString.split('\n');
            originalString = splittedString.join(' ');
        }
        splittedString = originalString.split(' ');
        return splittedString.length === count;
    };

};
