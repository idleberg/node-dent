# @nsis/dent

> An opinionated code formatter for NSIS scripts

[![License](https://img.shields.io/github/license/idleberg/node-dent?color=blue&style=for-the-badge)](https://github.com/idleberg/node-dent/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@nsis/dent?style=for-the-badge)](https://www.npmjs.org/package/@nsis/dent)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/node-dent/default.yml?style=for-the-badge)](https://github.com/idleberg/node-dent/actions)

## Installation

`npm install @nsis/dent`

## Usage

```ts
import { createFormatter } from '@nsis/dent';

const format = createFormatter(/* user options */);

format(`
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
Default: `"crlf"` (Windows), `"lf"` (Linux, macOS)

#### `options.indentSize`

Type: `number`  
Default: `2`  

#### `options.trimEmptyLines`

Type: `boolean`  
Default: `true`  

#### `options.useTabs`

Type: `boolean`  
Default: `true`  

:white_check_mark: [Why defaulting to tabs is good for accessibility](https://github.com/prettier/prettier/issues/7475#issuecomment-668544890)

## Related

- [CLI for `dent`](https://www.npmjs.com/package/@nsis/dent-cli)

## License

This work is licensed under [The MIT License](LICENSE)
  
