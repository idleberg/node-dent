# @nsis/lumis

> NSIS language support for the Lumis syntax highlighter.

![License](https://img.shields.io/npm/l/@nsis%2Flumis?style=for-the-badge)
[![Version](https://img.shields.io/npm/v/@nsis/lumis?style=for-the-badge)](https://www.npmjs.org/package/@nsis/lumis)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/nsis-org/ci.yml?style=for-the-badge)](https://github.com/idleberg/nsis-org/actions)

**Latest version supported: NSIS v3.12**

[Demo Time](https://idleberg.github.io/nsis-org/lumis/) 🙌

## Installation

```bash
$ npm install @nsis/lumis
```

## Usage

```typescript
import { highlight } from "@lumis-sh/lumis";
import { htmlInline } from "@lumis-sh/lumis/formatters";
import { nsis } from "@nsis/lumis";

const html = await highlight(
  'Name "Example"\nOutFile "example.exe"',
  htmlInline({ language: nsis, theme: yourTheme }),
);
```

The parser and its highlight queries ship in [`@nsis/lumis-wasm`](../lumis-wasm#readme), which is installed as a dependency. Lumis loads it from `node_modules`, falling back to jsDelivr. To serve it from your own bundle instead — in a browser, say — point Lumis at your copies:

```typescript
import { configureLanguagePackageResolver, configureWasmResolver } from "@lumis-sh/lumis";
import manifestUrl from "@nsis/lumis-wasm/lumis.json?url";
import parserUrl from "@nsis/lumis-wasm/tree-sitter-nsis.wasm?url";

configureLanguagePackageResolver(() => manifestUrl);
configureWasmResolver(() => parserUrl);
```

> [!NOTE]
> Requires Lumis v0.7 or later. Earlier versions took the highlight queries inline on the language object, which v0.7 rejects.

## License

Released under [The MIT License](LICENSE).
