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
	assert.is(result, 'nsDialogs::Create /nounload 1018\n');
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

// --- Parameter casing ---

test('Slash flag is normalised to uppercase', () => {
	const format = createFormatter();
	const result = format('CopyFiles /silent "src" "dst"\n');
	assert.is(result, 'CopyFiles /SILENT "src" "dst"\n');
});

test('Slash flag already uppercase is preserved', () => {
	const format = createFormatter();
	const result = format('Delete /REBOOTOK "file.exe"\n');
	assert.is(result, 'Delete /REBOOTOK "file.exe"\n');
});

test('Lowercase slash flag stays lowercase', () => {
	const format = createFormatter();
	const result = format('File /R "data"\n');
	assert.is(result, 'File /r "data"\n');
});

test('Registry root key is normalised to uppercase', () => {
	const format = createFormatter();
	const result = format('DeleteRegKey hklm "Software\\Demo"\n');
	assert.is(result, 'DeleteRegKey HKLM "Software\\Demo"\n');
});

test('MessageBox flags are normalised to uppercase', () => {
	const format = createFormatter();
	const result = format('MessageBox mb_yesno "Sure?"\n');
	assert.is(result, 'MessageBox MB_YESNO "Sure?"\n');
});

test('Pipe-separated MessageBox flags are each normalised', () => {
	const format = createFormatter();
	const result = format('MessageBox mb_ok|mb_iconexclamation "Hello"\n');
	assert.is(result, 'MessageBox MB_OK|MB_ICONEXCLAMATION "Hello"\n');
});

test('Boolean parameter is normalised to lowercase', () => {
	const format = createFormatter();
	const result = format('Unicode TRUE\n');
	assert.is(result, 'Unicode true\n');
});

test('Enum parameter is normalised to lowercase', () => {
	const format = createFormatter();
	const result = format('SetCompressor LZMA\n');
	assert.is(result, 'SetCompressor lzma\n');
});

test('Parameterised prefix flag is normalised', () => {
	const format = createFormatter();
	const result = format('VIAddVersionKey /lang=1033 "ProductName" "Demo"\n');
	assert.is(result, 'VIAddVersionKey /LANG=1033 "ProductName" "Demo"\n');
});

test('Quoted string arguments are not normalised', () => {
	const format = createFormatter();
	const result = format('Name "TRUE"\n');
	assert.is(result, 'Name "TRUE"\n');
});

test('Variable arguments are not normalised', () => {
	const format = createFormatter();
	const result = format('SetOutPath $INSTDIR\n');
	assert.is(result, 'SetOutPath $INSTDIR\n');
});

test('Unknown bare arguments are not normalised', () => {
	const format = createFormatter();
	const result = format('File myfile.txt\n');
	assert.is(result, 'File myfile.txt\n');
});

test('ShowWindow constant is normalised to uppercase', () => {
	const format = createFormatter();
	const result = format('CreateShortcut /NoWorkingDir "lnk" "target" "" "" 0 sw_shownormal\n');
	assert.is(result, 'CreateShortcut /NoWorkingDir "lnk" "target" "" "" 0 SW_SHOWNORMAL\n');
});

test('MessageBox return value is normalised to uppercase', () => {
	const format = createFormatter();
	const result = format('MessageBox MB_YESNO "Sure?" idyes done\n');
	assert.is(result, 'MessageBox MB_YESNO "Sure?" IDYES done\n');
});

test('Spaced pipe flags are collapsed to compact form', () => {
	const format = createFormatter();
	const result = format('MessageBox MB_YESNO | MB_DEFBUTTON2 "Sure?"\n');
	assert.is(result, 'MessageBox MB_YESNO|MB_DEFBUTTON2 "Sure?"\n');
});

test('Spaced pipe flags with wrong casing are normalised and collapsed', () => {
	const format = createFormatter();
	const result = format('MessageBox mb_ok | mb_iconexclamation "Hello"\n');
	assert.is(result, 'MessageBox MB_OK|MB_ICONEXCLAMATION "Hello"\n');
});

test('Multiple spaced pipe flags are all collapsed', () => {
	const format = createFormatter();
	const result = format('MessageBox MB_YESNO | MB_ICONQUESTION | MB_DEFBUTTON2 "Sure?"\n');
	assert.is(result, 'MessageBox MB_YESNO|MB_ICONQUESTION|MB_DEFBUTTON2 "Sure?"\n');
});

// --- Block comments ---

test('Single-line block comment is preserved', () => {
	const format = createFormatter();
	const result = format('/* hello */\n');
	assert.is(result, '/* hello */\n');
});

test('Single-line block comment is indented inside a block', () => {
	const format = createFormatter();
	const result = format('Function .onInit\n/* hello */\nFunctionEnd\n');
	assert.is(result, 'Function .onInit\n\t/* hello */\nFunctionEnd\n');
});

test('JSDoc-style block comment preserves star alignment', () => {
	const format = createFormatter();
	const result = format('Function .onInit\n/**\n * description\n */\nNop\nFunctionEnd\n');
	assert.is(result, 'Function .onInit\n\t/**\n\t * description\n\t */\n\tNop\nFunctionEnd\n');
});

test('Multi-line block comment is re-indented inside a block', () => {
	const format = createFormatter();
	const result = format('Function .onInit\n/*\n line one\n line two\n*/\nNop\nFunctionEnd\n');
	assert.is(result, 'Function .onInit\n\t/*\n\t line one\n\t line two\n\t */\n\tNop\nFunctionEnd\n');
});

test('Multi-line block comment at top level has no indentation', () => {
	const format = createFormatter();
	const result = format('/*\n line one\n line two\n*/\n');
	assert.is(result, '/*\n line one\n line two\n */\n');
});

test('Multi-line block comment with space indentation', () => {
	const format = createFormatter({ useTabs: false, indentSize: 2 });
	const result = format('Function .onInit\n/*\n  first\n  second\n*/\nFunctionEnd\n');
	assert.is(result, 'Function .onInit\n  /*\n   first\n   second\n   */\nFunctionEnd\n');
});

// --- Blank lines around blocks ---

test('No blank line between nested openers (parent→child)', () => {
	const format = createFormatter();
	const result = format('Section "test"\n${If} 1 == 1\nNop\n${EndIf}\nSectionEnd\n');
	assert.is(result, 'Section "test"\n\t${If} 1 == 1\n\t\tNop\n\t${EndIf}\nSectionEnd\n');
});

test('Blank line before block opener when preceded by non-block', () => {
	const format = createFormatter();
	const result = format('Section "test"\nNop\n${If} 1 == 1\nNop\n${EndIf}\nSectionEnd\n');
	assert.is(result, 'Section "test"\n\tNop\n\n\t${If} 1 == 1\n\t\tNop\n\t${EndIf}\nSectionEnd\n');
});

test('Blank line after block closer when followed by non-block', () => {
	const format = createFormatter();
	const result = format('Section "test"\n${If} 1 == 1\nNop\n${EndIf}\nNop\nSectionEnd\n');
	assert.is(result, 'Section "test"\n\t${If} 1 == 1\n\t\tNop\n\t${EndIf}\n\n\tNop\nSectionEnd\n');
});

test('No blank line between nested closers (child→parent)', () => {
	const format = createFormatter();
	const result = format('Section "test"\n${If} 1 == 1\nNop\n${EndIf}\nSectionEnd\n');
	// ${EndIf} followed by SectionEnd — both closers, no blank
	assert.ok(!result.includes('${EndIf}\n\nSectionEnd'));
});

test('Blank line between sibling blocks (close→open)', () => {
	const format = createFormatter();
	const result = format('Section "a"\nNop\nSectionEnd\nSection "b"\nNop\nSectionEnd\n');
	assert.is(result, 'Section "a"\n\tNop\nSectionEnd\n\nSection "b"\n\tNop\nSectionEnd\n');
});

test('No double blank when blank already exists before block', () => {
	const format = createFormatter({ trimEmptyLines: true });
	const result = format('Section "test"\nNop\n\n${If} 1 == 1\nNop\n${EndIf}\nSectionEnd\n');
	assert.is(result, 'Section "test"\n\tNop\n\n\t${If} 1 == 1\n\t\tNop\n\t${EndIf}\nSectionEnd\n');
});

test.run();
