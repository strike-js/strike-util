# strike-util 

A set of utility classes, interfaces, and functions for web applications written in TypeScript. 

## Interfaces 

* Dictionary

	An interface to provide typings for object literal in TypeScript applications. 

	```typescript
		import {Dictionary} from 'strikejs-util'; 
		
		let obj:Dictionary<number> = {
			"key1":1,
			"key2":2,
			"key3":3
		} 
		
	```


## Functions

### 1. `getDataAt(object,path,sep)`
A function that takes an object and return a value from a path within the object. 

```typescript

import {getDataAt} from 'strikejs-util'; 

var obj = {
	name:{
		firstName:"Suhail",
		lastName:"Abood"
	}
}

getDataAt(obj,'name.firstName','.'); //returns "Suhail"

getDataAt(obj,'name/lastName','/'); //returns "Abood" 


```

### 2. `setDataAt(object,path,newValue,sep)` 
A function that takes an object and sets a value within the object given a path. 

```typescript

import {setDataAt} from 'strikejs-util'; 

var obj = {
	name:{
		firstName:"Suhail",
		lastName:"Abood"
	}
}; 

setDataAt(obj,'name.firstName','John'); //changes obj.name.firstName = "John"; 

setDataAt(obj,'name/lastName','Doe','/'); //changes obj.name.lastName = "Doe"; 


```

### 3. `extractArgumentsFromFunction`
A function that extracts the names of a function's arguments. 

```typescript

import {extractArgumentsFromFunction} from 'strikejs-util'; 

function myFunction(arg1,arg2,testArg1,testArg2){
	//blah blah blah
}

extractArgumentsFromFunctioN(myFunction); // returns ['arg1','arg2','testArg1','testArg2']


```

### 4. `curry` 
A function that supports partial functions execution by currying the function's parameter. 

```typescript

import {curry} from 'strikejs-util'; 

function myFunction(v,w,x,y,z){
	console.log(v,w,x,y,z); 
}

var t = curry(myFunction,1,2,3,4); 

t(5); //logs 1,2,3,4,5 

//or we can do 

var xx = curry(myFunction); 
xx(1,2)
xx(22,33)
x(44); //logs 1 2 22 33 44 


```

### 5. `identity` 
A function that returns its first paramters. 

```typescript

import {identity} from 'strikjs-util'; 

identity(100);//returns 100 


```

### 6. `repeat` 
A function that repeats a string given number of times. 

```typescript 

import {repeat} from 'strikejs-util'; 

repeat("x",10); //xxxxxxxxxx


```

### 7. `format` 
A function to format strings using ES6 placeholders. 

```typescript

import {format} from 'strikejs-util'; 

format("This is just a ${placeholder1} and this one is ${placeholder2} another test",{
	placeholder1:"test",
	placeholder2:"yet"
}); //This is just a test and this one is yet another test


```

### 8. `printf` 
A C-Style printf function. 

```typescript

import {printf} from 'strikejs-util'; 

printf("My name is %s and I'm %d","Suhail",18); //returns "My name is Suhail and I'm 18"


```

### 9. `createFormatter` 

Returns a custom C-style string formatter that can be extended for more formats. 

```typescript

import {createFormatter} from 'strikejs-util'; 

let formatter = createFormatter(); 

formatter.addFormat("upper",function(param){
	return param.toUpperCase();
)}; 

formatter.format("My name is %upper","Suhail"); //returns "My name is SUHAIL" 

```

## Polyfills

The library also provides some polyfills taken from the JavaScript community, these are:

### 1. `requestAnimationFramePolyfill` 
Installs a polyfill for `requestAnimationFrame` and `cancelAnimationFrame`. 
### 2. `objectAssignPolyfill`
Installs a polyfill for `Object.assign`. 