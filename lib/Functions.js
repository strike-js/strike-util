"use strict";
/**
 * Extracts the names of the parameters from functions
 *
 * @export
 * @param {Function} fn the function to extract its parameters' names.
 * @returns {Array<string>} array of parameters names
 */
function extractArgumentsFromFunction(fn) {
    var deps;
    fn.toString()
        .replace(/^function[\s]+?[\S]+?\((.*?)\)/, function (e, v, k) {
        deps = (v.trim().length > 0 && v.trim().split(/[\s,]+/)) || [];
        return e;
    });
    return deps;
}
exports.extractArgumentsFromFunction = extractArgumentsFromFunction;
/**
 * A utility function to support function parameters currying.
 * @param {Function} fn the function to curry its parameters
 * @return {Function} a curry function.
 */
function curry(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var vv = args;
    var left = fn.length - args.length;
    function ret() {
        if (left <= 0) {
            return fn.apply(null, vv);
        }
        var kk = Array.prototype.slice.call(arguments, 0);
        left -= kk.length;
        vv = [].concat(vv, kk);
        if (left <= 0) {
            return fn.apply(null, vv);
        }
        return ret;
    }
    if (left <= 0) {
        return fn.apply(null, vv);
    }
    return ret;
}
exports.curry = curry;
