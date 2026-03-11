/**
 * Maps lowercase parameter values to their canonical casing, scoped to the
 * instructions that accept them.
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

// ---------------------------------------------------------------------------
// Global parameters — unambiguous (/-prefixed), safe for any instruction
// ---------------------------------------------------------------------------

export const globalParameters: Map<string, string> = new Map([
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
]);

/**
 * Maps lowercase prefixes of parameterised flags (e.g. `/LANG=`, `/TIMEOUT=`)
 * to their canonical casing. Only the prefix (up to and including `=`) is
 * normalised; the value after `=` is left untouched.
 */
export const globalParameterPrefixes: Map<string, string> = new Map([
	['/lang=', '/LANG='],
	['/timeout=', '/TIMEOUT='],
	['/charset=', '/CHARSET='],
	['/imgid=', '/IMGID='],
	['/customstring=', '/CUSTOMSTRING='],
	['/uninstcustomstring=', '/UNINSTCUSTOMSTRING='],
	['/oname=', '/oname='],
]);

// ---------------------------------------------------------------------------
// Instruction-scoped parameters
// ---------------------------------------------------------------------------

const builder = new Map<string, Map<string, string>>();

function register(instructions: string[], params: [string, string][]): void {
	for (const instr of instructions) {
		const key = instr.toLowerCase();
		let map = builder.get(key);
		if (!map) {
			map = new Map();
			builder.set(key, map);
		}
		for (const [k, v] of params) {
			map.set(k, v);
		}
	}
}

// --- Boolean values ---

register([
	'AllowRootDirInstall', 'AllowSkipFiles', 'AutoCloseWindow',
	'CRCCheck', 'ManifestDPIAware', 'ManifestDisableWindowFiltering',
	'ManifestGdiScaling', 'ManifestLongPathAware', 'SetAutoClose',
	'SetDatablockOptimize', 'SetDateSave', 'SetPluginUnload',
	'Unicode', 'WindowIcon',
], [
	['true', 'true'],
	['false', 'false'],
]);

register([
	'CRCCheck', 'LogSet', 'LockWindow', 'SetCompress', 'SetDateSave',
	'SetDatablockOptimize', 'SetOverwrite', 'WindowIcon', 'XPStyle',
	'LicenseForceSelection',
], [
	['on', 'on'],
	['off', 'off'],
]);

// --- FileOpen modes ---

register(['FileOpen'], [
	['r', 'r'],
	['w', 'w'],
	['a', 'a'],
]);

// --- Compression algorithms ---

register(['SetCompressor'], [
	['zlib', 'zlib'],
	['bzip2', 'bzip2'],
	['lzma', 'lzma'],
]);

// --- CPU targets ---

register(['Target'], [
	['x86', 'x86'],
	['amd64', 'amd64'],
]);

// --- SetOverwrite modes ---

register(['SetOverwrite'], [
	['try', 'try'],
	['ifnewer', 'ifnewer'],
	['ifdiff', 'ifdiff'],
	['lastused', 'lastused'],
]);

// --- SetCompress modes ---

register(['SetCompress'], [
	['auto', 'auto'],
	['force', 'force'],
]);

// --- SilentInstall / SilentUnInstall / SetSilent ---

register(['SilentInstall'], [
	['normal', 'normal'],
	['silent', 'silent'],
	['silentlog', 'silentlog'],
]);

register(['SilentUnInstall', 'SetSilent'], [
	['normal', 'normal'],
	['silent', 'silent'],
]);

// --- ShowInstDetails / ShowUninstDetails ---

register(['ShowInstDetails', 'ShowUninstDetails'], [
	['hide', 'hide'],
	['show', 'show'],
	['nevershow', 'nevershow'],
]);

// --- SetDetailsView / DirShow ---

register(['SetDetailsView', 'DirShow'], [
	['show', 'show'],
	['hide', 'hide'],
]);

// --- SetDetailsPrint ---

register(['SetDetailsPrint'], [
	['listonly', 'listonly'],
	['textonly', 'textonly'],
	['both', 'both'],
	['none', 'none'],
	['lastused', 'lastused'],
]);

// --- RequestExecutionLevel ---

register(['RequestExecutionLevel'], [
	['none', 'none'],
	['user', 'user'],
	['highest', 'highest'],
	['admin', 'admin'],
]);

// --- AddBrandingImage ---

register(['AddBrandingImage'], [
	['top', 'top'],
	['left', 'left'],
	['bottom', 'bottom'],
	['right', 'right'],
]);

// --- InstProgressFlags ---

register(['InstProgressFlags'], [
	['smooth', 'smooth'],
	['colored', 'colored'],
]);

// --- LicenseForceSelection ---

register(['LicenseForceSelection'], [
	['checkbox', 'checkbox'],
	['radiobuttons', 'radiobuttons'],
]);

// --- SetShellVarContext ---

register(['SetShellVarContext'], [
	['all', 'all'],
	['current', 'current'],
]);

// --- DirVerify ---

register(['DirVerify'], [
	['auto', 'auto'],
	['leave', 'leave'],
]);

// --- ExecShell / ExecShellWait ---

register(['ExecShell', 'ExecShellWait'], [
	['open', 'open'],
	['print', 'print'],
]);

// --- Page / UninstPage ---

register(['Page', 'UninstPage'], [
	['custom', 'custom'],
	['license', 'license'],
	['components', 'components'],
	['directory', 'directory'],
	['instfiles', 'instfiles'],
	['uninstconfirm', 'uninstConfirm'],
]);

// --- SetCtlColors ---

register(['SetCtlColors'], [
	['transparent', 'transparent'],
]);

// --- LockWindow ---

register(['LockWindow'], [
	['on', 'on'],
	['off', 'off'],
]);

// --- SetRegView ---

register(['SetRegView'], [
	['default', 'default'],
]);

// --- Registry root keys ---

register([
	'DeleteRegKey', 'DeleteRegValue', 'EnumRegKey', 'EnumRegValue',
	'InstallDirRegKey', 'ReadRegDWORD', 'ReadRegStr',
	'WriteRegBin', 'WriteRegDWORD', 'WriteRegExpandStr',
	'WriteRegMultiStr', 'WriteRegNone', 'WriteRegStr',
], [
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
]);

// --- MessageBox flags and return values ---

register(['MessageBox'], [
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
	['idok', 'IDOK'],
	['idcancel', 'IDCANCEL'],
	['idyes', 'IDYES'],
	['idno', 'IDNO'],
	['idabort', 'IDABORT'],
	['idretry', 'IDRETRY'],
	['idignore', 'IDIGNORE'],
]);

// --- ShowWindow constants ---

register(['CreateShortcut', 'ShowWindow'], [
	['sw_shownormal', 'SW_SHOWNORMAL'],
	['sw_showmaximized', 'SW_SHOWMAXIMIZED'],
	['sw_showminimized', 'SW_SHOWMINIMIZED'],
	['sw_hide', 'SW_HIDE'],
	['sw_show', 'SW_SHOW'],
]);

// --- Hotkey modifiers (used in CreateShortcut) ---

register(['CreateShortcut'], [
	['alt', 'ALT'],
	['control', 'CONTROL'],
	['ext', 'EXT'],
	['shift', 'SHIFT'],
]);

// --- File attributes ---

register(['SetFileAttributes'], [
	['archive', 'ARCHIVE'],
	['hidden', 'HIDDEN'],
	['offline', 'OFFLINE'],
	['readonly', 'READONLY'],
	['system', 'SYSTEM'],
	['temporary', 'TEMPORARY'],
]);

// --- FileSeek modes ---

register(['FileSeek'], [
	['set', 'SET'],
	['cur', 'CUR'],
	['end', 'END'],
]);

// --- GetWinVer fields ---

register(['GetWinVer'], [
	['major', 'MAJOR'],
	['minor', 'MINOR'],
	['build', 'BUILD'],
	['servicepack', 'SERVICEPACK'],
]);

// --- ManifestSupportedOS values ---

register(['ManifestSupportedOS'], [
	['winvista', 'WinVista'],
	['win7', 'Win7'],
	['win8', 'Win8'],
	['win8.1', 'Win8.1'],
	['win10', 'Win10'],
]);

// --- ChangeUI dialog identifiers ---

register(['ChangeUI'], [
	['dlg_id', 'dlg_id'],
]);

/**
 * Instruction-scoped parameter map.
 * Key: lowercase instruction keyword → Map of lowercase param → canonical param.
 */
export const instructionParameters: ReadonlyMap<string, ReadonlyMap<string, string>> = builder;
