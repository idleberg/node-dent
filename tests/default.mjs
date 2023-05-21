import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { dirname, resolve } from 'node:path';
import { promises as fs } from 'node:fs';
import { Dent } from '../dist/index.mjs';

const __dirname = resolve(dirname(''));

test('Tab indentation', async t => {
	const dent = new Dent();

	const fixture = await fs.readFile(
		resolve(__dirname, 'tests/fixtures/indentation.nsi'),
		'utf8'
	);

	const expected = await fs.readFile(
		resolve(__dirname, 'tests/expected/tab-indentation.nsi'),
		'utf8'
	);

	// FIXME there should be no need to trim
	assert.is(dent.format(fixture), expected.trim());
});

test('Space indentation', async t => {
	const dent = new Dent({
		useTabs: false
	});

	const fixture = await fs.readFile(
		resolve(__dirname, 'tests/fixtures/indentation.nsi'),
		'utf8'
	);

	const expected = await fs.readFile(
		resolve(__dirname, 'tests/expected/space-indentation.nsi'),
		'utf8'
	);

	// FIXME there should be no need to trim
	assert.is(dent.format(fixture), expected.trim());
});

test('Empty lines', async t => {
	const dent = new Dent();

	const fixture = await fs.readFile(
		resolve(__dirname, 'tests/fixtures/empty-lines.nsi'),
		'utf8'
	);

	const expected = await fs.readFile(
		resolve(__dirname, 'tests/expected/empty-lines.nsi'),
		'utf8'
	);

	assert.is(dent.format(fixture), expected);
});

test.run();
