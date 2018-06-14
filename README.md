## Description
 
Wagon.js is a very small module loader (1.4k) that tuns on top of jQuery. It has very simple usage and you don't need to use any additional wrapper to require.

Its syntax may please either CommonJS or AMD users.

## Usage 

Firstly, call jQuery by ```<script>```, right after call ```wagon.min.js```.

### Creating the module



```javascript
// modules/myModule.js

var dependencie = Wagon.require('modules/dependence.js') // this module inherits from another

var private = 'private var value';
var public = 'public var value';

var inheritFromDependencie = dependencie.public; // inherits var from dependencie

function privateFunction(a, b) {
	return a + b;
}

function publicFunction() { // public function that shows internal vars
    console.log(private);
    console.log(privateFunction(1, 1));
}

var wrapper = { // wrap your public vars on a plain object or function
	public: public,
    publicFunction: publicFunction,
    inheritFromDependencie: inheritFromDependencie
}

Wagon.exports(wrapper) // IMPORTANT: this method accepts ONLY ONE ARGUMENT and it must be a PLAIN OBJECT or a single FUNCTION

```

### Requiring the module and defining path's

```javascript
// index.html

Wagon.setModule("myModule", "modules/myModule.js"); // optional path shotcurt

var myModule = Wagon.require("myModule"); // you can write full path or just type the modules name relative to path as its setted above

myModule.publicFunction() // logs 2 and "private var value";
console.log(myModule.public) // logs "public var value"
console.log(myModule.inheritFromDependencie) // logs inherited var pro dependencie
	     
```
