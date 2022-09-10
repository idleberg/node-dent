export const rules = {
    indenters: [
        '!if',
        '!ifdef',
        '!ifmacrodef',
        '${Case}',
        '${Case2}',
        '${Case3}',
        '${Case4}',
        '${Case5}',
        '${CaseElse}',
        '${Default}',
        '${Do}',
        '${DoUntil}',
        '${DoWhile}',
        '${For}',
        '${ForEach}',
        '${If}',
        '${IfCmd}',
        '${IfNot}',
        '${IfNotThen}',
        '${Select}',
        '${Switch}',
        '${Unless}',
        '!ifmacrondef',
        '!ifndef',
        '!macro',
        '${MementoSection}',
        '${MementoUnselectedSection}',
        'Function',
        'PageEx',
        'Section',
        'SectionGroup'
    ],
    dedenters: [
        '!endif',
        '!macroend',
        '${EndIf}',
        '${EndSelect}',
        '${EndSwitch}',
        '${EndWhile}',
        '${Loop}',
        '${LoopUntil}',
        '${LoopWhile}',
        '${MementoSectionEnd}',
        '${Next}',
        '${While}',
        'FunctionEnd',
        'PageExEnd',
        'SectionEnd',
        'SectionGroupEnd'
    ],
    // These follow indenters, but aren't indented themselves
    specialIndenters: [
        '${AndIf}',
        '${AndIfNot}',
        '${AndUnless}',
        '${OrIf}',
        '${OrIfNot}',
        '${OrUnless}',
				'!else',
				'!elseif',
				'${Else}',
				'${ElseIf}',
				'${ElseIfNot}',
				'${ElseUnless}'
    ]
};
