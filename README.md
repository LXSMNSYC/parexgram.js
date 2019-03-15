# parser.js

🔠 Parsing Expression Grammars for JS

| Platform | Build Status |
| --- | --- |
| Linux | [![Build Status](https://travis-ci.org/LXSMNSYC/parser.js.svg?branch=master)](https://travis-ci.org/LXSMNSYC/parser.js) |
| Windows | [![Build status](https://ci.appveyor.com/api/projects/status/2hs8vhxown8y8k8v?svg=true)](https://ci.appveyor.com/project/LXSMNSYC/parser-js) |


[![codecov](https://codecov.io/gh/LXSMNSYC/parser.js/branch/master/graph/badge.svg)](https://codecov.io/gh/LXSMNSYC/parser.js)

## Install

NPM

```bash
npm i parser-js
```

CDN

```html
<script style="https://cdn.jsdelivr.net/npm/parser-js/dist/index.min.js"></script>
```

## Usage

### Loading the module

#### CommonJS

```js
const Parser = require('parser-js);
```

#### Browser

The Browser version provides an object named 'Parser' which you can use to access the provided classes.

### Using the classes

#### Feed

Feed serves as the consumable string for the Parser. Matchers relies on a Feed for extracting/consuming strings. If a Matcher successfully consumes the Feed prefix, the Feed value changes.

```js
const feed = new Feed('some expression');
```

#### CharSet

CharSet is a Matcher class which extracts an exact sequence of a string from the Feed prefix.

If a CharSet attempts to consume the Feed, it will return the exact match if the match was successful, otherwise, the CharSet will return an undefined result.

```js
const feed = new Feed('some expression');
console.log(new CharSet('some').parse(feed)); // some
```

#### Range

Range is a Matcher class which extracts a single character from the Feed prefix if the character lies within the Character range.

If a Range attempts to consume the Feed, it will return the character that matches, otherwise, undefined is returned.

```js
const feed = new Feed('some expression');
console.log(new Range('a', 'z').parse(feed)); // s
```

#### Sequence

Sequence is a Matcher class which extracts an exact sequence of matches given a sequence of matchers from a Feed prefix.

If a CharSet attempts to consume the Feed, it will return the exact matches inside of an array if the match was successful, otherwise, the CharSet will return an undefined result.

```js
const feed = new Feed('some expression');
const alpha = new Range('a', 'z');
console.log(new Sequence([alpha, alpha]).parse(feed)); // ['s', 'o'];
```

#### Alternation

Alternation is a Matcher class which extracts an exact match given a sequence of matchers from a Feed prefix. Unlike Sequence, Alternation will only return one of the matchers result.

```js
const feed = new Feed('some expression');
const alpha = new Range('a', 'z');
console.log(new Alternation([alpha, alpha]).parse(feed)); // 's';
```

#### Quantifier

Quantifier is a Matcher class which extracts a series of matches by a given matcher from a Feed prefix. Given a range, if a Quantifier collects an amount of matches between the given range, the Quantifier returns an array of those matches, whereas if the Quantifier collects an amount less than the minimum boundary of the range, the Quantifier returns undefined.

```js
const feed = new Feed('some expression');
const alpha = new Range('a', 'z');
console.log(new Quantifier(alpha, 0).parse(feed)); // ['s', 'o', 'm', 'e']
```

## Documentation

Online Documentation can be found  at the [official Doc Site](https://lxsmnsyc.github.io/parser.js/).

## Examples

* [Arithmetic Parser](https://github.com/LXSMNSYC/parser.js/tree/master/example/arithmetic)

## Build

Clone the repo then run:

```bash
npm install
```

To build the docs, coverages, commonjs and browser module:

```bash
npm run build
```
