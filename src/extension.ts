import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
	const themes = vscode.extensions.all.filter(
		ext => ext.packageJSON.contributes?.themes
	)

	let disposable = vscode.commands.registerCommand(
		'random-theme-asco.helloWorld',
		() => {
			vscode.window.showInformationMessage(
				'Hello World from random-theme-asco!'
			)
		}
	)

	context.subscriptions.push(disposable)
}

export function deactivate() {}
