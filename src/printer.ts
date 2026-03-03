import { canonicalCasing } from './canonical-casing.ts';
import type { Comment, CommentNode, CSTNode, InstructionNode, LabelNode } from './parser.ts';
import { rules } from './rules.ts';

export interface PrinterOptions {
	useTabs: boolean;
	indentSize: number;
	trimEmptyLines: boolean;
	eol: string;
}

/**
 * Renders a flat list of CST nodes back into formatted NSIS source text.
 *
 * Applies canonical keyword casing, whitespace normalisation,
 * blank-line collapsing, and tree-depth-based indentation.
 */
export function print(nodes: CSTNode[], options: PrinterOptions): string {
	let level = 0;
	let switchLevel = 0;
	const lines: string[] = [];

	const processedNodes = options.trimEmptyLines ? trimAndCollapseBlanks(nodes) : nodes;

	for (const node of processedNodes) {
		switch (node.type) {
			case 'blank':
				lines.push('');
				break;

			case 'comment':
				lines.push(printComment(node, level, options));
				break;

			case 'label':
				lines.push(printLabel(node, level, options));
				break;

			case 'instruction': {
				const kw = node.keyword.toLowerCase();

				// biome-ignore lint/suspicious/noTemplateCurlyInString: NSIS definition
				if (kw === '${switch}') {
					switchLevel = level;
				}

				// biome-ignore lint/suspicious/noTemplateCurlyInString: NSIS definition
				if (kw === '${endswitch}') {
					level = switchLevel;
					lines.push(printInstruction(node, level, options));
				} else if (rules.specialIndenters.includes(kw)) {
					lines.push(printInstruction(node, level - 1, options));
				} else if (rules.specialDedenters.includes(kw)) {
					lines.push(printInstruction(node, level, options));
					level = Math.max(0, level - 1);
				} else if (rules.indenters.includes(kw)) {
					lines.push(printInstruction(node, level, options));
					level++;
				} else if (rules.dedenters.includes(kw)) {
					level = Math.max(0, level - 1);
					lines.push(printInstruction(node, level, options));
				} else {
					lines.push(printInstruction(node, level, options));
				}
				break;
			}
		}
	}

	return lines.join(options.eol) + options.eol;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function indentStr(level: number, options: PrinterOptions): string {
	const char = options.useTabs ? '\t' : ' '.repeat(options.indentSize);
	return char.repeat(level);
}

function printComment(node: CommentNode, level: number, options: PrinterOptions): string {
	const prefix = indentStr(level, options);

	if (node.style === 'block') {
		return `${prefix}/*${node.value}*/`;
	}

	const marker = node.style === 'hash' ? '#' : ';';
	return `${prefix}${marker} ${node.value}`;
}

function printLabel(node: LabelNode, level: number, options: PrinterOptions): string {
	let line = `${indentStr(level, options)}${node.name}:`;

	if (node.comment) {
		line += ` ${printTrailingComment(node.comment)}`;
	}

	return line;
}

function printInstruction(node: InstructionNode, level: number, options: PrinterOptions): string {
	const keyword = canonicalCasing.get(node.keyword.toLowerCase()) ?? node.keyword;
	const parts = node.args.length > 0 ? `${keyword} ${node.args.join(' ')}` : keyword;
	let line = `${indentStr(level, options)}${parts}`;

	if (node.comment) {
		line += ` ${printTrailingComment(node.comment)}`;
	}

	return line;
}

function printTrailingComment(comment: Comment): string {
	const marker = comment.style === 'hash' ? '#' : ';';
	return `${marker} ${comment.value}`;
}

/**
 * Strips leading/trailing blank nodes and collapses consecutive blanks
 * to at most one.
 */
function trimAndCollapseBlanks(nodes: CSTNode[]): CSTNode[] {
	let start = 0;
	while (start < nodes.length && (nodes[start] as CSTNode).type === 'blank') start++;

	let end = nodes.length - 1;
	while (end >= start && (nodes[end] as CSTNode).type === 'blank') end--;

	const result: CSTNode[] = [];
	let prevBlank = false;

	for (let i = start; i <= end; i++) {
		const node = nodes[i] as CSTNode;
		if (node.type === 'blank') {
			if (!prevBlank) {
				result.push(node);
				prevBlank = true;
			}
		} else {
			result.push(node);
			prevBlank = false;
		}
	}

	return result;
}
