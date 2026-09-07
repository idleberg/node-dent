import { configureLanguagePackageResolver, configureWasmResolver, createHighlighter } from '@lumis-sh/lumis';
import { htmlLinked } from '@lumis-sh/lumis/formatters';
import { beforeAll, describe, expect, it } from 'vitest';
import { nsis } from './index.ts';

// Lumis resolves a language package by walking up from its own install location, which only reaches
// @nsis/lumis-wasm through hoisting, and silently falls back to the CDN when it doesn't. Point it at
// the workspace copy so this exercises the working tree rather than whatever is published.
beforeAll(() => {
	configureLanguagePackageResolver(() => import.meta.resolve('@nsis/lumis-wasm/lumis.json'));
	configureWasmResolver(() => import.meta.resolve('@nsis/lumis-wasm/tree-sitter-nsis.wasm'));
});

describe('highlight', () => {
	it('should highlight NSIS source', async () => {
		const highlighter = await createHighlighter({ languages: [nsis] });
		const output = highlighter.highlight('; comment\nName "Example"\n', htmlLinked({ language: nsis }));

		expect(highlighter.languages).toContain('nsis');
		expect(output).toContain('<span class="l-comment">; comment</span>');
		expect(output).toContain('<span class="l-keyword">Name</span>');
		expect(output).toContain('l-string');
	});
});
