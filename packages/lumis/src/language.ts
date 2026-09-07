import type { Language, WasmRef } from '@lumis-sh/lumis';

export type RuntimeWasmInput = Uint8Array | ArrayBuffer | string | URL;

export type LanguageOptions = {
	wasm?: WasmRef | RuntimeWasmInput;
};

/** The Lumis language package holding the parser and its matching queries. */
export const packageName = '@nsis/lumis-wasm';

export const nsis: Language = {
	id: 'nsis',
	aliases: ['nsi', 'nsh'],
	packageName,
};

export function createLanguage(options?: LanguageOptions): Language {
	return options?.wasm === undefined ? { ...nsis } : { ...nsis, wasm: options.wasm };
}
