/**
 * Returns value at a given key with in an object literal. 
 * 
 * @export
 * @param {object} object the object to use 
 * @param {string} path the path to return its value 
 * @param {string} p path separator, defaults to '.'
 * @returns {any} the value at the given key 
 */
export function getDataAt<T>(object: any, path: string, p: string): T {
    let o: any = object,
        key: string,
        temp: any,
        pathSep: string = p ? p : '.',
        list: string[] = path.split(pathSep);
    while ((key = list.shift()) && (temp = o[key]) && (o = temp));
    return temp;
}

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
export function setDataAt(object: any, path: string, value: any, p: string): any {
    let o: any = object,
        key: string,
        temp: any,
        pathSep: string = p ? p : '.',
        list: string[] = path.split(pathSep),
        lastKey: string = list.length > 0 ? list.splice(list.length - 1, 1)[0] : null;
    while ((key = list.shift()) && ((temp = o[key]) || (temp = o[key] = {})) && (o = temp));
    temp[lastKey] = value;
    return object; 
}