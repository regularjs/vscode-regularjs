// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Formatter } from "regularjs-beautify";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(_: vscode.ExtensionContext) {
  vscode.languages.registerDocumentRangeFormattingEditProvider("javascript", {
    provideDocumentRangeFormattingEdits(
      document: vscode.TextDocument,
      range: vscode.Range
    ): vscode.TextEdit[] {
      const code = document.getText(range);
      const space = code.match(/^\s*/);
      let indent = 2;
      if (space && space[0]) {
        indent = space[0].length & ~1;
      }
      const formatter = new Formatter(
        code,
        document.fileName,
        range.start.line,
        { baseIndent: indent, printWidth: 80 }
      );
      return [vscode.TextEdit.replace(range, formatter.run())];
    }
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
