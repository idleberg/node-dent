import { detectNewline } from 'detect-newline';
import { platform } from 'node:os';
import { rules } from './rules.js'

const defaultIndentation = 2;

export type DentOptions = {
	endOfLines?: 'crlf' | 'lf';
	indentSize?: number;
	trimEmptyLines?: boolean;
	useTabs?: boolean;
}

export class Dent {
	private options: DentOptions;

	constructor(options: DentOptions = {}) {
		this.options = {
			endOfLines: platform() === 'win32' ? 'crlf' : 'lf',
			indentSize: defaultIndentation,
			trimEmptyLines: true,
			useTabs: true,
			...options
		};

		if (options.useTabs === true && options.indentSize) {
			throw Error('The indentSize option can only be mixed with useTabs');
		}

		if (options.useTabs === false && options.indentSize) {
			if (isNaN(options.indentSize) || options.indentSize <= 0) {
				throw Error('The indentSize option expects a positive integer');
			}
		}
	}

	public format(fileContents: string): string {
		let indentationLevel = 0;
		let switchIndentationLevel = 0;

		const lineEndings = this.detectEOL(fileContents);
		const formattedLines: string[] = [];

		const lines: string[] = this.options.trimEmptyLines === true
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
					formattedLines.push(this.appendLine(line, indentationLevel));
					indentationLevel = indentationLevel === 0
						? 0
						: indentationLevel - 1;
					break;

				case rules.specialIndenters.includes(keyword.toLowerCase()):
					formattedLines.push(this.appendLine(line, indentationLevel - 1));
					break;

				case rules.specialDedenters.includes(keyword.toLowerCase()):
					formattedLines.push(this.appendLine(line, indentationLevel));
					indentationLevel--;
					break;

				case rules.indenters.includes(keyword.toLowerCase()):
					formattedLines.push(this.appendLine(line, indentationLevel));
					indentationLevel++;
					break;

				case rules.dedenters.includes(keyword.toLowerCase()):
					indentationLevel = indentationLevel === 0
						? 0
						: indentationLevel - 1;

					formattedLines.push(this.appendLine(line, indentationLevel));
					break;

				default:
					formattedLines.push(this.appendLine(line, indentationLevel));
					break;
			}
		});

		return formattedLines.join(lineEndings);
	}

	private appendLine(line: string, level: number): string {
		return (line.length
			? `${this.getIndentChar().repeat(level)}${line.trim()}`
			: ''
		);
	}

	private detectEOL(input: string): string {
		if (this.options.endOfLines) {
			return this.options.endOfLines === 'crlf'
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

	private getIndentChar(): string {
		return(this.options.useTabs
			? '\t'.repeat(this.options.indentSize || defaultIndentation)
			: ' '.repeat(this.options.indentSize || defaultIndentation)
		);
	}
}
