import { platform } from 'node:os';
import { detectNewline } from 'detect-newline';
import { parse } from './parser.js';
import { print } from './printer.js';

const defaultIndentation = 2;

/**
 * Formats the given file contents using the Dent formatting style.
 *
 * @param {NsisDent.Options} options - The options for the Dent formatter.
 * @returns {function(string): string} The formatting function.
 * @throws {Error} Throws an error if the options are invalid.
 */
export function createFormatter(options: NsisDent.Options = {}): (fileContents: string) => string {
	const mergedOptions: NsisDent.Options = {
		indentSize: defaultIndentation,
		trimEmptyLines: true,
		useTabs: true,
		...options,
	};

	if (mergedOptions.useTabs === false) {
		if (!mergedOptions.indentSize || Number.isNaN(mergedOptions.indentSize) || mergedOptions.indentSize <= 0) {
			throw Error('The indentSize option expects a positive integer');
		}
	}

	/**
	 * Formats the given file contents using the Dent formatting style.
	 *
	 * Parses the input into a CST, then prints it back with canonical
	 * casing, normalised whitespace, and tree-depth-based indentation.
	 *
	 * @param {string} fileContents - The contents of the file to be formatted.
	 * @returns {string} The formatted file contents.
	 */
	function format(fileContents: string): string {
		const nodes = parse(fileContents);
		const eol = detectEOL(fileContents);

		return print(nodes, {
			useTabs: mergedOptions.useTabs ?? true,
			indentSize: mergedOptions.indentSize ?? defaultIndentation,
			trimEmptyLines: mergedOptions.trimEmptyLines ?? true,
			eol,
		});
	}

	/**
	 * Determines the desired end-of-line characters for the output.
	 *
	 * @param {string} input - The input string (used as fallback for detection).
	 * @returns {string} The end-of-line characters to use in the output.
	 */
	function detectEOL(input: string): string {
		if (mergedOptions.endOfLines) {
			return mergedOptions.endOfLines === 'crlf' ? '\r\n' : '\n';
		}

		const detected = detectNewline(input);
		return detected ?? (platform() === 'win32' ? '\r\n' : '\n');
	}

	return format;
}
