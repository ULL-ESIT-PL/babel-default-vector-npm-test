## What is this?

> [!CAUTION]
> This is a work in progress. The syntax and the semantic of the proposed extension to JavaScript are not yet fully defined. The packages are published in the GitHub registry, but they are not yet ready for production. 
> The current version is not working. 


This is a repo illustrating how to use 
Adrian Mora's set of packages [published in the GitHub registry](https://github.com/orgs/ULL-ESIT-PL/packages) inside the [ull-esit-pl](https://github.com/ULL-ESIT-PL/) organization. These packages extend the JavaScript language with a new kind of functions. The packages are:

- The JS parser modified: [@ull-esit-pl/parser-default-vector](https://github.com/orgs/ULL-ESIT-PL/packages/npm/package/parser-default-vector)
- The AST transformation plugin: [@ull-esit-pl/babel-plugin-default-vector](https://github.com/orgs/ULL-ESIT-PL/packages/npm/package/babel-plugin-default-vector) 


### The proposed Syntax and Semantic

These packages extend JS  with a new syntax for arrays. And in the future the syntax will be extended  for Objects. Here is an example of such syntax:

```js 
let a = [1, 2, 3, else x => x * x];

console.log(a[2]);  // 3
console.log(a[5]);  // 25 (since 5 * 5 = 25)
```


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
➜  babel-default-vector-npm-test git:(main) ✗ cat ~/.npmrc | grep '@ull-esit-pl:'
@ull-esit-pl:registry=https://npm.pkg.github.com
```

or set an entry `registry` in your `package.json` file:

```bash
➜  babel-default-vector-npm-test git:(main) ✗ jq '.registry' package.json 
"https://npm.pkg.github.com"
```

Then you can proceed to install the packages:

```
npm i -D @babel/cli@7.10 @ull-esit-pl/babel-plugin-default-vector-plugin @ull-esit-pl/babel-plugin-default-vector-support @ull-esit-pl/parser-default-vector 
```

Your package.json `devDependencies` section will look similar to this:

`➜  babel-default-vector-npm-test git:(main) ✗ jq '.devDependencies' package.json`
```json
{
  "@babel/cli": "^7.10.1",
  "@ull-esit-pl/babel-plugin-default-vector": "latest",
  "@ull-esit-pl/parser-default-vector": "latest"
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
➜  babel-default-vector-npm-test git:(main) ✗ npx babel  example.js
```
This will output the compiled code to the console:

```bash                                                      
const {
  DefaultVector: DefaultVector
} = require("/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/babel-default-vector-npm-test/node_modules/@ull-esit-pl/babel-plugin-default-vector/src/support.js");
let a = new DefaultVector([1, 2, 3], x => x * x);
console.log(a[2]); // 3
console.log(a[5]); // 25 (porque 5 * 5 = 25)
```

If you want to save it to a file, use the `-o` option.

## Running

You can pipe the output to `node`:

```bash
➜  babel-default-vector-npm-test git:(main) ✗ npx babel  example.js | node
3
25
```

or alternatively, use the `-o` option to save the output to a file and then run it:

```
➜  babel-default-vector-npm-test git:(main) ✗ npx babel  example.js -o example.cjs
➜  babel-default-vector-npm-test git:(main) ✗ node example.cjs 
3
25
```

## References

- The actual code implementation: https://github.com/ULL-ESIT-PL/babel-tanhauhau/tree/Adrian-tfg
- Our tutorial on babel: https://github.com/ULL-ESIT-PL/babel-learning/tree/main
- Some internal information: https://github.com/ULL-ESIT-PL/beca-colaboracion/tree/main
- First steps on publishing a Babel package: https://github.com/ULL-ESIT-PL/babel-learning/blob/main/doc/building-publishing.md#how-to-publish-from-a-fork-of-babel
- Another description of our attempts to define the syntax and semantics of the array else clause: https://github.com/ULL-ESIT-PL/babel-learning/tree/main/src/array-else


## TODO

-  README.md is the one babel has. It has to change to be specific about the extension for the three packages,
-  Add `-D` to all install instructions and remove the version number: `npm install @ull-esit-pl/babel-plugin-default-vector-plugin -D`
-  Do we need two separated packages for the plugin and the support? Can we have a single package?

## License

[MIT](https://couto.mit-license.org/)