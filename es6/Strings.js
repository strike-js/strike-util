/**
 * Repeats a string given number of times.
 * @param {string} str the string to repeat
 * @param {number} n times to to repeat the string.
 * @returns {string} the string repeated.
 */
/**
 * Repeats a string given number of times.
 * @param {string} str the string to repeat
 * @param {number} n times to to repeat the string.
 * @returns {string} the string repeated.
 */ export function repeat(str, n) {
    let r = [];
    let i = 0;
    for (; i < n; i++) {
        r.push(str);
    }
    return r.join("");
}
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
export function format(value, replacements) {
    if (!replacements) {
        return value;
    }
    return value.replace(/\$\{(.*?)\}/g, function (k, e) {
        return (replacements && replacements[e]) || k;
    });
}
/**
 * Predefined formatters
 */
const FORMATTERS = {
    "typeof": (item) => {
        return typeof item;
    },
    "skip": (item) => {
        return "";
    },
    "d": (item, extra) => {
        if (extra && extra.charAt(0) === ".") {
            return item.toFixed(+extra.substr(1));
        }
        else if (/^[0-9]+$/.test(extra)) {
            let len = parseInt(extra);
            let v = item + "";
            if (v.length < len) {
                return repeat("0", len - v.length) + v;
            }
            return v;
        }
        else if (/^[0-9]+\.[0-9]+$/.test(extra)) {
            let kk = extra.split('.').map(v => parseInt(v));
            let ik = kk[0];
            let fk = kk[1];
            let v = parseInt(item) + "";
            if (v.length < ik) {
                v = repeat("0", ik - v.length) + v;
            }
            let ff = parseFloat(item) - parseInt(item);
            return (v + "") + ff.toFixed(fk).substr(1);
        }
        return item;
    },
    "x": (item) => {
        return "0x" + item.toString(16);
    },
    "o": (item) => {
        if (typeof item === "object") {
            if (item.toJSON) {
                return JSON.stringify(item.toJSON());
            }
            return item.toString();
        }
        return item;
    },
    "s": (item) => {
        return item;
    }
};
/**
 * Create a string formatter that can be extended with new formats.
 *
 * @export
 * @returns
 */
export function createFormatter() {
    let formats = ['[0-9]+?\.[0-9]+?d', '[0-9]+?d', '\.[0-9]+?d', 'd', 'x', 's', 'o', 'typeof', 'skip'];
    let customFormats = {};
    function fmt(format, ...args) {
        let regex = new RegExp("%(" + formats.join("|") + ")");
        let final = args.reduce((prev, current, cIdx) => {
            return prev.replace(regex, (all, a) => {
                let len = a.length, f = a.charAt(len - 1), fn = FORMATTERS[a] || customFormats[a];
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
        addFormat(f, fn) {
            customFormats[f] = fn;
            formats.push(f);
        },
        addFormatFirst(f, fn) {
            customFormats[f] = fn;
            formats.unshift(f);
        },
        format: fmt
    };
}
/**
 * Formats strings using C-style printf function.
 *
 * @export
 * @param {string} format
 * @param {...any[]} args
 * @returns
 */
export function printf(format, ...args) {
    let final = args.reduce((prev, current, cIdx) => {
        return prev.replace(/%([0-9]+?\.[0-9]+?d|[0-9]+?d|\.[0-9]+?d|d|x|s|o|typeof|skip)/, (all, a) => {
            let len = a.length, f = a.charAt(len - 1);
            return (FORMATTERS[a] && FORMATTERS[a](current)) || (FORMATTERS[f] && FORMATTERS[f](current, a.substr(0, len - 1)));
        });
    }, format);
    return final;
}
