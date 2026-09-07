import { describe, expect, it } from 'vitest';
import { createLanguage, packageName } from './index.ts';

describe('createLanguage', () => {
	it('should return a language with correct id', () => {
		const lang = createLanguage();

		expect(lang.id).toBe('nsis');
	});

	it('should return the expected aliases', () => {
		const lang = createLanguage();

		expect(lang.aliases).toEqual(['nsi', 'nsh']);
	});

	it('should point at the language package', () => {
		const lang = createLanguage();

		expect(lang.packageName).toBe(packageName);
	});

	// Lumis rejects a language that carries its own queries, they live in the package
	it('should not carry query fields', () => {
		const lang = createLanguage();

		expect(lang).not.toHaveProperty('highlights');
		expect(lang).not.toHaveProperty('injections');
		expect(lang).not.toHaveProperty('locals');
		expect(lang).not.toHaveProperty('brackets');
	});

	it('should omit wasm by default', () => {
		const lang = createLanguage();

		expect(lang).not.toHaveProperty('wasm');
	});

	it('should pass through a custom wasm option', () => {
		const wasm = new Uint8Array([1, 2, 3]);
		const lang = createLanguage({ wasm });

		expect(lang.wasm).toBe(wasm);
	});

	it('should accept a string URL as wasm', () => {
		const wasm = 'https://example.com/tree-sitter-nsis.wasm';
		const lang = createLanguage({ wasm });

		expect(lang.wasm).toBe(wasm);
	});

	it('should accept a URL object as wasm', () => {
		const wasm = new URL('https://example.com/tree-sitter-nsis.wasm');
		const lang = createLanguage({ wasm });

		expect(lang.wasm).toBe(wasm);
	});
});
