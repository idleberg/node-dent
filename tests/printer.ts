import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { createFormatter } from '../src/dent.ts';

// --- Canonical casing ---

test('Lowercased instruction is normalised to canonical casing', () => {
	const format = createFormatter();
	const result = format('name "demo"\n');
	assert.is(result, 'Name "demo"\n');
});

test('Uppercased instruction is normalised to canonical casing', () => {
	const format = createFormatter();
	const result = format('OUTFILE "demo.exe"\n');
	assert.is(result, 'OutFile "demo.exe"\n');
});

test('Mixed-case instruction is normalised to canonical casing', () => {
	const format = createFormatter();
	const result = format('SetOUTPATH "$INSTDIR"\n');
	assert.is(result, 'SetOutPath "$INSTDIR"\n');
});

test('Compiler command casing is normalised to lowercase', () => {
	const format = createFormatter();
	const result = format('!INCLUDE "LogicLib.nsh"\n');
	assert.is(result, '!include "LogicLib.nsh"\n');
});

test('Block keyword casing is normalised', () => {
	const format = createFormatter();
	const result = format('FUNCTION .onInit\nNop\nFUNCTIONEND\n');
	assert.is(result, 'Function .onInit\n\tNop\nFunctionEnd\n');
});

test('Section keyword casing is normalised', () => {
	const format = createFormatter();
	const result = format('SECTION "test"\nNop\nSECTIONEND\n');
	assert.is(result, 'Section "test"\n\tNop\nSectionEnd\n');
});

test('Plugin call casing is preserved (not in canonical map)', () => {
	const format = createFormatter();
	const result = format('nsDialogs::Create /NOUNLOAD 1018\n');
	assert.is(result, 'nsDialogs::Create /NOUNLOAD 1018\n');
});

// --- Whitespace normalisation ---

test('Multiple spaces between tokens are collapsed to one', () => {
	const format = createFormatter();
	const result = format('MessageBox    MB_OK    "Hello"\n');
	assert.is(result, 'MessageBox MB_OK "Hello"\n');
});

test('Leading whitespace is removed', () => {
	const format = createFormatter();
	const result = format('    Name "demo"\n');
	assert.is(result, 'Name "demo"\n');
});

test('Trailing whitespace is removed', () => {
	const format = createFormatter();
	const result = format('Name "demo"   \n');
	assert.is(result, 'Name "demo"\n');
});

// --- Blank line collapsing ---

test('Multiple consecutive blank lines collapsed to one (trimEmptyLines: true)', () => {
	const format = createFormatter({ trimEmptyLines: true });
	const result = format('Name "a"\n\n\n\nOutFile "b"\n');
	assert.is(result, 'Name "a"\n\nOutFile "b"\n');
});

test('Leading blank lines are stripped (trimEmptyLines: true)', () => {
	const format = createFormatter({ trimEmptyLines: true });
	const result = format('\n\nName "demo"\n');
	assert.is(result, 'Name "demo"\n');
});

test('Trailing blank lines are stripped (trimEmptyLines: true)', () => {
	const format = createFormatter({ trimEmptyLines: true });
	const result = format('Name "demo"\n\n\n');
	assert.is(result, 'Name "demo"\n');
});

test('Blank lines preserved when trimEmptyLines is false', () => {
	const format = createFormatter({ trimEmptyLines: false });
	const result = format('Name "a"\n\n\n\nOutFile "b"\n');
	assert.is(result, 'Name "a"\n\n\n\nOutFile "b"\n');
});

// --- Trailing comments ---

test('Instruction trailing comment is preserved in output', () => {
	const format = createFormatter();
	const result = format('Nop ; do nothing\n');
	assert.is(result, 'Nop ; do nothing\n');
});

test('Instruction trailing hash comment is preserved in output', () => {
	const format = createFormatter();
	const result = format('Nop # do nothing\n');
	assert.is(result, 'Nop # do nothing\n');
});

// --- Labels ---

test('Labels are printed with colon', () => {
	const format = createFormatter();
	const result = format('Function .onInit\nmyLabel:\nNop\nFunctionEnd\n');
	assert.is(result, 'Function .onInit\n\tmyLabel:\n\tNop\nFunctionEnd\n');
});

test('Label with trailing comment', () => {
	const format = createFormatter();
	const result = format('Function .onInit\ndone: ; end\nFunctionEnd\n');
	assert.is(result, 'Function .onInit\n\tdone: ; end\nFunctionEnd\n');
});

// --- Indentation styles ---

test('Space indentation with custom size', () => {
	const format = createFormatter({ useTabs: false, indentSize: 4 });
	const result = format('Function .onInit\nNop\nFunctionEnd\n');
	assert.is(result, 'Function .onInit\n    Nop\nFunctionEnd\n');
});

test.run();
