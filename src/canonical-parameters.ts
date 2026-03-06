/**
 * Maps lowercase parameter values to their canonical casing as documented
 * in the official NSIS documentation.
 *
 * Source: `makensis -CMDHELP` output.
 *
 * Convention:
 * - Forward-slash flags generally use UPPERCASE (e.g. `/SILENT`, `/REBOOTOK`)
 *   with some lowercase exceptions (e.g. `/r`, `/a`, `/nonfatal`)
 * - Bare-word enum values generally use lowercase (e.g. `true`, `false`, `auto`)
 * - MessageBox constants, registry hives, and ShowWindow constants use
 *   UPPERCASE with prefixes (e.g. `MB_OK`, `HKLM`, `SW_SHOWNORMAL`)
 */
export const canonicalParameters: Map<string, string> = new Map([
	// --- Forward-slash flags (UPPERCASE) ---
	['/silent', '/SILENT'],
	['/filesonly', '/FILESONLY'],
	['/rebootok', '/REBOOTOK'],
	['/short', '/SHORT'],
	['/sd', '/SD'],
	['/branding', '/BRANDING'],
	['/final', '/FINAL'],
	['/solid', '/SOLID'],
	['/global', '/GLOBAL'],
	['/bom', '/BOM'],
	['/italic', '/ITALIC'],
	['/underline', '/UNDERLINE'],
	['/strike', '/STRIKE'],
	['/enablecancel', '/ENABLECANCEL'],
	['/overwrite', '/OVERWRITE'],
	['/replace', '/REPLACE'],
	['/noerrors', '/NOERRORS'],
	['/regedit5', '/REGEDIT5'],
	['/exeresource', '/EXERESOURCE'],
	['/stringid', '/STRINGID'],
	['/resizetofit', '/RESIZETOFIT'],
	['/resizetofitwidth', '/RESIZETOFITWIDTH'],
	['/resizetofitheight', '/RESIZETOFITHEIGHT'],
	['/trimleft', '/TRIMLEFT'],
	['/trimright', '/TRIMRIGHT'],
	['/trimcenter', '/TRIMCENTER'],
	['/windows', '/windows'],
	['/nonfatal', '/NONFATAL'],
	['/nocustom', '/NOCUSTOM'],
	['/uninstnocustom', '/UNINSTNOCUSTOM'],
	['/componentsonlyoncustom', '/COMPONENTSONLYONCUSTOM'],
	['/uninstcomponentsonlyoncustom', '/UNINSTCOMPONENTSONLYONCUSTOM'],
	['/fileexists', '/FILEEXISTS'],
	['/rawnl', '/RAWNL'],
	['/productversion', '/ProductVersion'],

	// Forward-slash flags (PascalCase)
	['/noworkingdir', '/NoWorkingDir'],

	// Forward-slash flags (lowercase)
	['/r', '/r'],
	['/a', '/a'],
	['/e', '/e'],
	['/o', '/o'],
	['/x', '/x'],
	['/ifempty', '/ifempty'],
	['/ifnosubkeys', '/ifnosubkeys'],
	['/ifnovalues', '/ifnovalues'],
	['/nounload', '/nounload'],
	['/plugin', '/plugin'],

	// Compiler command flags (lowercase)
	['/ifndef', '/ifndef'],
	['/redef', '/redef'],
	['/date', '/date'],
	['/utcdate', '/utcdate'],
	['/file', '/file'],
	['/intfmt', '/intfmt'],
	['/math', '/math'],
	['/ignorecase', '/ignorecase'],
	['/packed', '/packed'],
	['/target', '/target'],

	// --- Boolean values ---
	['true', 'true'],
	['false', 'false'],
	['on', 'on'],
	['off', 'off'],

	// --- Enum values (lowercase) ---
	['auto', 'auto'],
	['force', 'force'],
	['try', 'try'],
	['leave', 'leave'],
	['none', 'none'],
	['all', 'all'],
	['current', 'current'],
	['default', 'default'],
	['lastused', 'lastused'],
	['normal', 'normal'],
	['silent', 'silent'],
	['silentlog', 'silentlog'],
	['hide', 'hide'],
	['show', 'show'],
	['nevershow', 'nevershow'],
	['listonly', 'listonly'],
	['textonly', 'textonly'],
	['both', 'both'],
	['ifnewer', 'ifnewer'],
	['ifdiff', 'ifdiff'],
	['user', 'user'],
	['highest', 'highest'],
	['admin', 'admin'],
	['notset', 'notset'],
	['top', 'top'],
	['left', 'left'],
	['bottom', 'bottom'],
	['right', 'right'],
	['smooth', 'smooth'],
	['colored', 'colored'],
	['checkbox', 'checkbox'],
	['radiobuttons', 'radiobuttons'],
	['transparent', 'transparent'],
	['push', 'push'],
	['pop', 'pop'],
	['enable', 'enable'],
	['disable', 'disable'],
	['warning', 'warning'],
	['error', 'error'],
	['open', 'open'],
	['print', 'print'],
	['custom', 'custom'],
	['license', 'license'],
	['components', 'components'],
	['directory', 'directory'],
	['instfiles', 'instfiles'],
	['uninstconfirm', 'uninstConfirm'],

	// Compression algorithms
	['zlib', 'zlib'],
	['bzip2', 'bzip2'],
	['lzma', 'lzma'],

	// FileOpen modes
	['r', 'r'],
	['w', 'w'],
	['a', 'a'],

	// CPU targets
	['x86', 'x86'],
	['amd64', 'amd64'],

	// --- Registry root keys ---
	['hkcr', 'HKCR'],
	['hkcr32', 'HKCR32'],
	['hkcr64', 'HKCR64'],
	['hklm', 'HKLM'],
	['hklm32', 'HKLM32'],
	['hklm64', 'HKLM64'],
	['hkcu', 'HKCU'],
	['hkcu32', 'HKCU32'],
	['hkcu64', 'HKCU64'],
	['hku', 'HKU'],
	['hkcc', 'HKCC'],
	['hkdd', 'HKDD'],
	['hkpd', 'HKPD'],
	['shctx', 'SHCTX'],

	// --- MessageBox mode flags ---
	['mb_ok', 'MB_OK'],
	['mb_okcancel', 'MB_OKCANCEL'],
	['mb_abortretryignore', 'MB_ABORTRETRYIGNORE'],
	['mb_retrycancel', 'MB_RETRYCANCEL'],
	['mb_yesno', 'MB_YESNO'],
	['mb_yesnocancel', 'MB_YESNOCANCEL'],
	['mb_iconexclamation', 'MB_ICONEXCLAMATION'],
	['mb_iconinformation', 'MB_ICONINFORMATION'],
	['mb_iconquestion', 'MB_ICONQUESTION'],
	['mb_iconstop', 'MB_ICONSTOP'],
	['mb_usericon', 'MB_USERICON'],
	['mb_topmost', 'MB_TOPMOST'],
	['mb_setforeground', 'MB_SETFOREGROUND'],
	['mb_right', 'MB_RIGHT'],
	['mb_defbutton1', 'MB_DEFBUTTON1'],
	['mb_defbutton2', 'MB_DEFBUTTON2'],
	['mb_defbutton3', 'MB_DEFBUTTON3'],
	['mb_defbutton4', 'MB_DEFBUTTON4'],

	// MessageBox return values
	['idok', 'IDOK'],
	['idcancel', 'IDCANCEL'],
	['idyes', 'IDYES'],
	['idno', 'IDNO'],
	['idabort', 'IDABORT'],
	['idretry', 'IDRETRY'],
	['idignore', 'IDIGNORE'],

	// --- ShowWindow constants ---
	['sw_shownormal', 'SW_SHOWNORMAL'],
	['sw_showmaximized', 'SW_SHOWMAXIMIZED'],
	['sw_showminimized', 'SW_SHOWMINIMIZED'],
	['sw_hide', 'SW_HIDE'],
	['sw_show', 'SW_SHOW'],

	// --- Hotkey modifiers ---
	['alt', 'ALT'],
	['control', 'CONTROL'],
	['ext', 'EXT'],
	['shift', 'SHIFT'],

	// --- File attributes ---
	['archive', 'ARCHIVE'],
	['hidden', 'HIDDEN'],
	['offline', 'OFFLINE'],
	['readonly', 'READONLY'],
	['system', 'SYSTEM'],
	['temporary', 'TEMPORARY'],

	// --- FileSeek modes ---
	['set', 'SET'],
	['cur', 'CUR'],
	['end', 'END'],

	// --- GetWinVer fields ---
	['major', 'MAJOR'],
	['minor', 'MINOR'],
	['build', 'BUILD'],
	['servicepack', 'SERVICEPACK'],

	// --- ManifestSupportedOS values ---
	['winvista', 'WinVista'],
	['win7', 'Win7'],
	['win8', 'Win8'],
	['win8.1', 'Win8.1'],
	['win10', 'Win10'],

	// --- ChangeUI dialog identifiers ---
	['dlg_id', 'dlg_id'],

	// --- SendMessage STR: prefix is handled separately ---
]);

/**
 * Maps lowercase prefixes of parameterised flags (e.g. `/LANG=`, `/TIMEOUT=`)
 * to their canonical casing. Only the prefix (up to and including `=`) is
 * normalised; the value after `=` is left untouched.
 */
export const canonicalParameterPrefixes: Map<string, string> = new Map([
	['/lang=', '/LANG='],
	['/timeout=', '/TIMEOUT='],
	['/charset=', '/CHARSET='],
	['/imgid=', '/IMGID='],
	['/customstring=', '/CUSTOMSTRING='],
	['/uninstcustomstring=', '/UNINSTCUSTOMSTRING='],
	['/oname=', '/oname='],
]);
