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