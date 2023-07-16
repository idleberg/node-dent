declare namespace NsisDent {
	type Options = {
		endOfLines?: 'crlf' | 'lf';
		indentSize?: number;
		trimEmptyLines?: boolean;
		useTabs?: boolean;
	}
}

export = NsisDent;
export as namespace NsisDent;

