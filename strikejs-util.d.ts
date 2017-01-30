declare module "strikejs-util"{

    /**
     * A dummy function that returns whatever it gets passed to it. 
     */
    export function identity<T>(v:T):T;


    /**
     * An interface representing an object literal 
     * 
     * @export
     * @interface Dictionary
     * @template V
     */
    export interface Dictionary<V>{
        [arg:string]:V
    }


    /**
     * Extracts the names of the parameters from functions
     * 
     * @export
     * @param {Function} fn the function to extract its parameters' names.
     * @returns {Array<string>} array of parameters names  
     */
    export function extractArgumentsFromFunction(fn: Function): any ;


    /**
     * A utility function to support function parameters currying. 
     * @param {Function} fn the function to curry its parameters 
     * @return {Function} a curry function. 
     */
    export function curry<T>(fn:(...args:any[])=>T,...args:any[]):(...args:any[])=>T;

    /**
     * Returns value at a given key with in an object literal. 
     * 
     * @export
     * @param {object} object the object to use 
     * @param {string} path the path to return its value 
     * @param {string} p path separator, defaults to '.'
     * @returns {any} the value at the given key 
     */
    export function getDataAt<T>(object: any, path: string, p: string): T ;

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
    export function setDataAt(object: any, path: string, value: any, p: string): any ;

    /**
     * Installs requestAnimationFramePolyfill on browsers that do not support it. 
     */
    export function requestAnimationFramePolyfill();

    /**
     * Installs a polyfill for Object.assign on browsers that do not support it. 
     */
    export function objectAssignPolyfill();

    /**
     * Repeats a string given number of times.
     * @param {string} str the string to repeat 
     * @param {number} n times to to repeat the string. 
     * @returns {string} the string repeated. 
     */
    export function repeat(str:string,n:number):string;

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
    export function format(value: string, replacements: any): string ;

    export interface StringFormatter{
        addFormat(f:string,fn:any);
        addFormatFirst(f:string,fn:any);
        format(format:string,...args:any[]):string;
    }
    /**
     * Create a string formatter that can be extended with new formats. 
     * 
     * @export
     * @returns
     */
    export function createFormatter():StringFormatter;

    /**
     * Formats strings using C-style printf function. 
     * 
     * @export
     * @param {string} format
     * @param {...any[]} args
     * @returns
     */
    export function printf(format:string,...args:any[]);

    export interface Pool<T> {
        get():T;
        put(...args:T[]);
        destroy():void;
    }

    /**
     * Creates an object pool for better memory efficiency. 
     * 
     * @export
     * @returns
     */
    export function createPool<T>(createNewFn:()=>T):Pool<T>;
}