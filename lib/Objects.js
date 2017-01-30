"use strict";
/**
 * Returns value at a given key with in an object literal.
 *
 * @export
 * @param {object} object the object to use
 * @param {string} path the path to return its value
 * @param {string} p path separator, defaults to '.'
 * @returns {any} the value at the given key
 */
function getDataAt(object, path, p) {
    var o = object, key, temp, pathSep = p ? p : '.', list = path.split(pathSep);
    while ((key = list.shift()) && (temp = o[key]) && (o = temp))
        ;
    return temp;
}
exports.getDataAt = getDataAt;
/**
 * Sets a value at a given key with in an object literal.
 *
 * @export
 * @param {object} object the object to use
 * @param {string} path the path to set its value
 * @param {*} value the new value
 * @param {string} sep the path separator defaults to '.'
 * @returns {object} the updated object
 */
function setDataAt(object, path, value, p) {
    var o = object, key, temp, pathSep = p ? p : '.', list = path.split(pathSep), lastKey = list.length > 0 ? list.splice(list.length - 1, 1)[0] : null;
    while ((key = list.shift()) && ((temp = o[key]) || (temp = o[key] = {})) && (o = temp))
        ;
    temp[lastKey] = value;
    return object;
}
exports.setDataAt = setDataAt;
/**
 * Creates an object pool for better memory efficiency.
 *
 * @export
 * @returns
 */
function createPool(createNewFn) {
    var objects = [];
    function get() {
        if (objects.length > 0) {
            return objects.shift();
        }
        return createNewFn();
    }
    function put() {
        var action = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            action[_i] = arguments[_i];
        }
        objects.push.apply(objects, action);
    }
    function destory() {
        objects = [];
    }
    return {
        get: get,
        put: put,
        destory: destory
    };
}
exports.createPool = createPool;
