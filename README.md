# @nsis/dent

> An opinionated code formatter for NSIS scripts

[![License](https://img.shields.io/github/license/idleberg/node-dent?color=blue&style=for-the-badge)](https://github.com/idleberg/node-dent/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@nsis/dent?style=for-the-badge)](https://www.npmjs.org/package/@nsis/dent)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/node-dent/default.yml?style=for-the-badge)](https://github.com/idleberg/node-dent/actions)

## Installation

`npm install @nsis/dent`

## Usage

```ts
import { Dent } from '@nsis/dent';

const dent = new Dent(/* user options */);

dent.format(`
	# Look ma, no indentation
	Name "Demo"
	Section
	Nop
	Section
`);
```

### Options

#### `options.endOfLines`

Type: `"crlf" | "lf"`  
Default: `"crlf"` on Windows, `"lf"` elsewhere  

#### `options.indentSize`

Type: `number`  
Default: `2`  

#### `options.trimEmptyLines`

Type: `boolean`  
Default: `true`  

#### `options.useTabs`

Type: `boolean`  
Default: `true`  

:info: [Why defaulting to tabs is good for accessibility reasons](https://github.com/prettier/prettier/issues/7475#issuecomment-668544890)

## About

`dent` is a very simple-minded formatter for NSIS. It does not use an AST or anything fancy like that. At least not for now!

## Related

- [`dent` CLI](https://github.com/idleberg/node-dent-cli)

## License

This work is licensed under [The MIT License](LICENSE)
  