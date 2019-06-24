'use strict';

import * as vscode from 'vscode';
import * as VHDLFormatter from './VHDLFormatter/VHDLFormatter';
import * as config from "./config";

function getDocumentRange(document: vscode.TextDocument) {
	var start = new vscode.Position(0, 0);
	var lastLine = document.lineCount - 1;
	var end = new vscode.Position(lastLine, document.lineAt(lastLine).text.length);
	return new vscode.Range(start, end);
}

export function activate(context: vscode.ExtensionContext) {
	vscode.languages.registerDocumentFormattingEditProvider('vhdl', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			var range = getDocumentRange(document);
			var content = document.getText(range);
			var result: vscode.TextEdit[] = [];
			var beautifierSettings = config.getConfig();
			var formatted = VHDLFormatter.beautify(content, beautifierSettings);
			if (formatted) {
				result.push(new vscode.TextEdit(range, formatted));
			}
			return result;
		}
	});
}
