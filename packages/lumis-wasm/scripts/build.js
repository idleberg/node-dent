import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PARSER_NAME = 'tree-sitter-nsis';
const GRAMMAR_NAME = 'nsis';

const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const parserRoot = dirname(fileURLToPath(import.meta.resolve('tree-sitter-nsis/wasm')));

function sha256(data) {
	return createHash('sha256').update(data).digest('hex');
}

function readQuery(name) {
	// Lumis compiles queries with Tree-sitter's regex engine, which rejects inline flags
	return readFileSync(join(parserRoot, 'queries', `${name}.scm`), 'utf-8').replaceAll('(?i)', '');
}

const { name, version } = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf-8'));
const { version: upstreamVersion } = JSON.parse(readFileSync(join(parserRoot, 'package.json'), 'utf-8'));

const wasm = readFileSync(join(parserRoot, `${PARSER_NAME}.wasm`));

const languages = {
	nsis: {
		aliases: ['nsi', 'nsh'],
		highlights: readQuery('highlights'),
	},
};

const manifest = {
	packageName: name,
	version,
	definitionHash: sha256(JSON.stringify(languages)),
	parser: {
		name: PARSER_NAME,
		grammarName: GRAMMAR_NAME,
		upstreamVersion,
		sha256: sha256(wasm),
		size: wasm.byteLength,
	},
	languages,
};

writeFileSync(join(packageRoot, `${PARSER_NAME}.wasm`), wasm);
writeFileSync(join(packageRoot, 'lumis.json'), `${JSON.stringify(manifest, null, '\t')}\n`);
writeFileSync(join(packageRoot, 'index.js'), `export default new URL('./${PARSER_NAME}.wasm', import.meta.url);\n`);
writeFileSync(join(packageRoot, 'index.d.ts'), 'declare const wasmUrl: URL;\nexport default wasmUrl;\n');

console.log(`${name}@${version} — ${PARSER_NAME} ${upstreamVersion} (${wasm.byteLength} bytes)`);
