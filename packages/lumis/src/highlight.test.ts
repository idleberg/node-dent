import { createHighlighter } from '@lumis-sh/lumis';
import { htmlLinked } from '@lumis-sh/lumis/formatters';
import { describe, expect, it } from 'vitest';
import { nsis } from './index.ts';

// Resolves @nsis/lumis-wasm end to end: manifest shape, parser checksum, grammar name and queries
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
