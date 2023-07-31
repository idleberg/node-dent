declare namespace NsisDent {
	function createFormatter(options?: Options): (fileContents: string) => string;

	type Options = {
		endOfLines?: 'crlf' | 'lf';
		indentSize?: number;
		trimEmptyLines?: boolean;
		useTabs?: boolean;
	}
}

export = NsisDent;
export as namespace NsisDent;
