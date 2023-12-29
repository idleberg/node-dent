import { detectNewline } from 'detect-newline';
import { platform } from 'node:os';
import { rules } from './rules.js';

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
    endOfLines: platform() === 'win32' ? 'crlf' : 'lf',
    indentSize: defaultIndentation,
    trimEmptyLines: true,
    useTabs: true,
    ...options
  };

  if (mergedOptions.useTabs === false && mergedOptions.indentSize) {
    if (isNaN(mergedOptions.indentSize) || mergedOptions.indentSize <= 0) {
      throw Error('The indentSize option expects a positive integer');
    }
  }

  /**
   * Formats the given file contents using the Dent formatting style.
   *
   * @param {string} fileContents - The contents of the file to be formatted.
   * @returns {string} The formatted file contents.
   */
  function format(fileContents: string): string {
    let indentationLevel = 0;
    let switchIndentationLevel = 0;

    const lineEndings = detectEOL(fileContents);
    const formattedLines: string[] = [];

    const lines: string[] = mergedOptions.trimEmptyLines === true
      ? fileContents
        .trim()
        .replaceAll(/^(\s*\r?\n){2,}/gm, lineEndings)
        .split(lineEndings)
      : fileContents
        .split(lineEndings);

    lines.forEach(line => {
      const keyword: string = line
        .trim()
        .split(' ')
        .at(0) ?? '';

      if (keyword.toLowerCase() === '${Switch}') {
        switchIndentationLevel = indentationLevel;
      }

      switch (true) {
        case keyword.toLowerCase() === '${EndSwitch}':
          indentationLevel = switchIndentationLevel;
          formattedLines.push(appendLine(line, indentationLevel));
          indentationLevel = indentationLevel === 0
            ? 0
            : indentationLevel - 1;
          break;

        case rules.specialIndenters.includes(keyword.toLowerCase()):
          formattedLines.push(appendLine(line, indentationLevel - 1));
          break;

        case rules.specialDedenters.includes(keyword.toLowerCase()):
          formattedLines.push(appendLine(line, indentationLevel));
          indentationLevel--;
          break;

        case rules.indenters.includes(keyword.toLowerCase()):
          formattedLines.push(appendLine(line, indentationLevel));
          indentationLevel++;
          break;

        case rules.dedenters.includes(keyword.toLowerCase()):
          indentationLevel = indentationLevel === 0
            ? 0
            : indentationLevel - 1;

          formattedLines.push(appendLine(line, indentationLevel));
          break;

        default:
          formattedLines.push(appendLine(line, indentationLevel));
          break;
      }
    });

    return formattedLines.join(lineEndings);
  }

  /**
   * Appends the given line with the specified indentation level.
   *
   * @param {string} line - The line to append.
   * @param {number} level - The indentation level.
   * @returns {string} The appended line with the specified indentation.
   */
  function appendLine(line: string, level: number): string {
    return (line.length
      ? `${getIndentChar(level)}${line.trim()}`
      : ''
    );
  }

  /**
   * Detects the end-of-line characters used in the input.
   *
   * @param {string} input - The input string.
   * @returns {string} The detected end-of-line characters.
   */
  function detectEOL(input: string): string {
    if (mergedOptions.endOfLines) {
      return mergedOptions.endOfLines === 'crlf'
        ? '\r\n'
        : '\n';
    }

    const newLine = detectNewline(input);

    if (newLine !== undefined) {
      return newLine;
    } else {
      return (platform() === 'win32'
        ? '\r\n'
        : '\n'
      );
    }
  }

  /**
   * Returns the indentation characters based on the specified level.
   *
   * @param {number} level - The indentation level.
   * @returns {string} The indentation characters.
   */
  function getIndentChar(level: number): string {
    return (mergedOptions.useTabs
      ? '\t'.repeat(mergedOptions.indentSize || defaultIndentation)
      : ' '.repeat(mergedOptions.indentSize || defaultIndentation)
    ).repeat(level);
  }

  return format;
}
