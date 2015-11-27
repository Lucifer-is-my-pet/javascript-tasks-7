'use strict';

function checkIfInvalid(dataToCheck) {
    if (typeof dataToCheck === 'undefined') {
        return true;
    }
    if (Object.getPrototypeOf(dataToCheck) === Array.prototype) {
        return !dataToCheck.length;
    }
    return dataToCheck < 0;
}

function checkForTypes(objectToCheck, firstType, secondType) {
    return Object.getPrototypeOf(objectToCheck) === firstType.prototype ||
        Object.getPrototypeOf(objectToCheck) === secondType.prototype;
}

exports.init = function () {
    Object.prototype.checkContainsKeys = function (keys) {
        if (checkIfInvalid(keys)) {
            return null;
        }
        if (!checkForTypes(this, Object, Array)) {
            return null;
        }
        var contains = true;
        var thisKeys = Object.keys(this);
        keys.forEach(function (key) {
            if (thisKeys.indexOf(key.toString()) === -1) {
                contains = false;
            }
        });
        return contains;
    };

    Object.prototype.checkHasKeys = function (keys) {
        if (checkIfInvalid(keys)) {
            return null;
        }
        if (!checkForTypes(this, Object, Array)) {
            return null;
        }
        var thisKeys = Object.keys(this);
        if (thisKeys.length !== keys.length) {
            return false;
        }
        var has = this.checkContainsKeys(keys);

        var stringKeys = keys.map(function (key) {
            return key.toString();
        });
        thisKeys.forEach(function (key) {
            if (stringKeys.indexOf(key) === -1) {
                has = false;
            }
        });
        return has;
    };

    Object.prototype.checkContainsValues = function (values) {
        if (checkIfInvalid(values)) {
            return null;
        }
        if (!checkForTypes(this, Object, Array)) {
            return null;
        }
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
    };

    Object.prototype.checkHasValues = function (values) {
        if (checkIfInvalid(values)) {
            return null;
        }
        if (!checkForTypes(this, Object, Array)) {
            return null;
        }
        var ownValues = [];
        for (var i in this) {
            if (this.hasOwnProperty(i)) {
                ownValues.push(this[i]);
            }
        }
        if (ownValues.length !== values.length) {
            return false;
        }

        var has = this.checkContainsValues(values);

        ownValues.forEach(function (value) {
            if (values.indexOf(value) === -1) {
                has = false;
            }
        });
        return has;
    };

    Object.prototype.checkHasValueType = function (key, type) {
        if (checkIfInvalid(key) || checkIfInvalid(type) ||
            [String, Number, Function, Array].indexOf(type) < 0) {
            return null;
        }
        if (!checkForTypes(this, Object, Array)) {
            return null;
        }
        return typeof this[key] === type.name.toLowerCase();
    };

    Object.prototype.checkHasLength = function (length) {
        if (checkIfInvalid(length)) {
            return null;
        }
        if (!checkForTypes(this, String, Array)) {
            return null;
        }
        return this.length === length;
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
        var originalString = this.replace(/\n/g, ' ');
        return originalString.split(' ').length === count;
    };

};
