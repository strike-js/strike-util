/**
 * Extracts the names of the parameters from functions
 *
 * @export
 * @param {Function} fn the function to extract its parameters' names.
 * @returns {Array<string>} array of parameters names
 */
export function extractArgumentsFromFunction(fn) {
    let deps;
    fn.toString()
        .replace(/^function[\s]+?[\S]+?\((.*?)\)/, function (e, v, k) {
        deps = (v.trim().length > 0 && v.trim().split(/[\s,]+/)) || [];
        return e;
    });
    return deps;
}
/**
 * A utility function to support function parameters currying.
 * @param {Function} fn the function to curry its parameters
 * @return {Function} a curry function.
 */
export function curry(fn, ...args) {
    let vv = args;
    var left = fn.length - args.length;
    function ret() {
        let kk = Array.prototype.slice.call(arguments, 0);
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
