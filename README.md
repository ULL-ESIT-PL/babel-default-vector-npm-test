## What is this?

> [!CAUTION]
> This is a work in progress. The syntax and the semantic of the proposed extension to JavaScript are not yet fully defined. The packages are published in the GitHub registry, but they are not yet ready for production.


This is a repo illustrating how to use 
Adrian Mora's set of packages [published in the GitHub registry](https://github.com/orgs/ULL-ESIT-PL/packages) inside the [ull-esit-pl](https://github.com/ULL-ESIT-PL/) organization. These packages extend the JavaScript language with a new kind of functions. The packages are:

- The JS parser modified: [@ull-esit-pl/parser-default-vector](https://github.com/orgs/ULL-ESIT-PL/packages/npm/package/parser-default-vector)
- The AST transformation plugin: [@ull-esit-pl/babel-plugin-default-vector](https://github.com/orgs/ULL-ESIT-PL/packages/npm/package/babel-plugin-default-vector) 


### The proposed Syntax and Semantic

These packages extend JS  with a new syntax for arrays. And in the future also for Objects. Here is an example of such syntax:

```js 
function @@ foo(bar) {
  return bar * 2;
}
```

These *assignable* functions can be later modified  using the assign expression:

```js
foo(10) = 5;
```

Here is the full code for our "hello" default-vector-plugin example:

`➜  babel-npm-test git:(main) cat example.js`
```js
function @@ foo(bar) {
  return bar * 2;
}
foo(10) = 5;

console.log(foo(10)); //  5
console.log(foo(5));  // 10
```

Testing Adrian Mora's [@ull-esit-pl/parser-default-vector](https://github.com/orgs/ULL-ESIT-PL/packages/npm/package/parser-default-vector) set of packages [published in the GitHub registry](https://github.com/orgs/ULL-ESIT-PL/packages) inside the [ull-esit-pl](https://github.com/ULL-ESIT-PL/) organization.




## Install

Here are the node and npm versions I have used to test the packages:

```bash
➜  babel-npm-test node --version
v20.5.0
➜  babel-npm-test npm --version
9.8.0
```

These packages use the GitHub registry instead of the npm registry. Therefore, remember
to set the registry entry in your `.npmrc` file:

```bash
➜  babel-npm-test git:(main) ✗ cat ~/.npmrc | grep '@ull-esit-pl:'
@ull-esit-pl:registry=https://npm.pkg.github.com
```

or set an entry `registry` in your `package.json` file:

```bash
➜  babel-npm-test git:(main) ✗ jq '.registry' package.json 
"https://npm.pkg.github.com"
```

Then you can proceed to install the packages:

```
npm i -D @babel/cli@7.10 @ull-esit-pl/babel-plugin-default-vector-plugin @ull-esit-pl/babel-plugin-default-vector-support @ull-esit-pl/parser-default-vector 
```

Your package.json `devDependencies` section will look similar to this:

`➜  babel-npm-test jq '.devDependencies' package.json`
```json
{
  "@babel/cli": "^7.10.1",
  "@ull-esit-pl/babel-plugin-default-vector-plugin": "^1.0.1",
  "@ull-esit-pl/babel-plugin-default-vector-support": "^1.0.0",
  "@ull-esit-pl/parser-default-vector": "^1.0.0"
}
```


## Compiling the code

To compile the example above add a `babel.config.js` to your workspace folder:

`➜  babel-npm-test git:(main) cat babel.config.js`
```js
module.exports = {
  "plugins": [
    "@ull-esit-pl/babel-plugin-default-vector-plugin"
  ],
}
```

and then compile it using the installed packages:

```js
➜  babel-npm-test npx babel  example.js
```
This will output the compiled code to the console:

```bash                                                      
const {
  assign,
  functionObject
} = require("@ull-esit-pl/babel-plugin-default-vector-support");
const foo = functionObject(function (bar) {
  return bar * 2;
});
assign(foo, [10], 5);
console.log(foo(10));
console.log(foo(5));
```

If you want to save it to a file, use the `-o` option.

## Running

You can pipe the output to `node`:

```bash
➜  babel-npm-test npx babel  example.js | node  -
5
10
```

or alternatively, use the `-o` option to save the output to a file and then run it:

```
➜  babel-default-vector-npm-test git:(main) npx babel  example.js -o example.cjs
➜  babel-default-vector-npm-test git:(main) ✗ node example.cjs 
5
10
```

## References

- The actual code implementation: https://github.com/ULL-ESIT-PL/babel-tanhauhau/tree/Adrian-tfg
- Our tutorial on babel: https://github.com/ULL-ESIT-PL/babel-learning/tree/main
- Some internal information: https://github.com/ULL-ESIT-PL/beca-colaboracion/tree/main

## TODO

-  README.md is the one babel has. It has to change to be specific about the extension for the three packages,
-  Add `-D` to all install instructions and remove the version number: `npm install @ull-esit-pl/babel-plugin-default-vector-plugin -D`
-  Do we need two separated packages for the plugin and the support? Can we have a single package?

## License

[MIT](https://couto.mit-license.org/)