"use strict";
/**
 * Repeats a string given number of times.
 * @param {string} str the string to repeat
 * @param {number} n times to to repeat the string.
 * @returns {string} the string repeated.
 */
function repeat(str, n) {
    var r = [];
    var i = 0;
    for (; i < n; i++) {
        r.push(str);
    }
    return r.join("");
}
exports.repeat = repeat;
/**
 * A function to format a string using placeholder.
 *
 * @export
 * @param {string} value (description)
 * @param {*} replacements (description)
 * @returns {string} (description)
 *
 * @example
 * ```javascript
 *  var str = 'My firstname is ${firstName} and my last is ${lastName}';
 *  var ff = format(str,{firstName:'Suhail', lastName:'Abood'});
 *  //ff is now 'My firstname is Suhail and my last is Abood'
 * ```
 */
function format(value, replacements) {
    if (!replacements) {
        return value;
    }
    return value.replace(/\$\{(.*?)\}/g, function (k, e) {
        return (replacements && replacements[e]) || k;
    });
}
exports.format = format;
/**
 * Predefined formatters
 */
var FORMATTERS = {
    "typeof": function (item) {
        return typeof item;
    },
    "skip": function (item) {
        return "";
    },
    "d": function (item, extra) {
        if (extra && extra.charAt(0) === ".") {
            return item.toFixed(+extra.substr(1));
        }
        else if (/^[0-9]+$/.test(extra)) {
            var len = parseInt(extra);
            var v = item + "";
            if (v.length < len) {
                return repeat("0", len - v.length) + v;
            }
            return v;
        }
        else if (/^[0-9]+\.[0-9]+$/.test(extra)) {
            var kk = extra.split('.').map(function (v) { return parseInt(v); });
            var ik = kk[0];
            var fk = kk[1];
            var v = parseInt(item) + "";
            if (v.length < ik) {
                v = repeat("0", ik - v.length) + v;
            }
            var ff = parseFloat(item) - parseInt(item);
            return (v + "") + ff.toFixed(fk).substr(1);
        }
        return item;
    },
    "x": function (item) {
        return "0x" + item.toString(16);
    },
    "o": function (item) {
        if (typeof item === "object") {
            if (item.toJSON) {
                return JSON.stringify(item.toJSON());
            }
            return item.toString();
        }
        return item;
    },
    "s": function (item) {
        return item;
    }
};
/**
 * Create a string formatter that can be extended with new formats.
 *
 * @export
 * @returns
 */
function createFormatter() {
    var formats = ['[0-9]+?\.[0-9]+?d', '[0-9]+?d', '\.[0-9]+?d', 'd', 'x', 's', 'o', 'typeof', 'skip'];
    var customFormats = {};
    function fmt(format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var regex = new RegExp("%(" + formats.join("|") + ")");
        var final = args.reduce(function (prev, current, cIdx) {
            return prev.replace(regex, function (all, a) {
                var len = a.length, f = a.charAt(len - 1), fn = FORMATTERS[a] || customFormats[a];
                if (fn) {
                    return fn(current, '');
                }
                fn = FORMATTERS[f] || customFormats[f];
                if (fn) {
                    return fn(current, a.substr(0, len - 1));
                }
            });
        }, format);
        return final;
    }
    return {
        addFormat: function (f, fn) {
            customFormats[f] = fn;
            formats.push(f);
        },
        addFormatFirst: function (f, fn) {
            customFormats[f] = fn;
            formats.unshift(f);
        },
        format: fmt
    };
}
exports.createFormatter = createFormatter;
/**
 * Formats strings using C-style printf function.
 *
 * @export
 * @param {string} format
 * @param {...any[]} args
 * @returns
 */
function printf(format) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var final = args.reduce(function (prev, current, cIdx) {
        return prev.replace(/%([0-9]+?\.[0-9]+?d|[0-9]+?d|\.[0-9]+?d|d|x|s|o|typeof|skip)/, function (all, a) {
            var len = a.length, f = a.charAt(len - 1);
            return (FORMATTERS[a] && FORMATTERS[a](current)) || (FORMATTERS[f] && FORMATTERS[f](current, a.substr(0, len - 1)));
        });
    }, format);
    return final;
}
exports.printf = printf;
