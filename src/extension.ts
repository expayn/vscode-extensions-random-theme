import * as vscode from 'vscode'

const getRandomInt = (min: number, max: number): number => {
	min = Math.ceil(min)
	max = Math.floor(max)

	return Math.floor(Math.random() * (max - min)) + min
}

interface ITheme {
	id: string
	label: string
	[key: string]: string
	uiTheme: string
}

export function activate(context: vscode.ExtensionContext) {
	const themes = vscode.extensions.all
		.filter(ext => ext.packageJSON.contributes?.themes)
		.reduce((acc, theme) => {
			const themesInfo: ITheme[] = theme.packageJSON.contributes.themes

			return acc.concat(themesInfo.map(theme => theme.id || theme.label))
		}, [] as string[])

	const disposable = vscode.commands.registerCommand(
		'simple-yt-random-theme.random-theme',
		async () => {
			const randomTheme = themes[getRandomInt(0, themes.length)]
			const userSettings = vscode.workspace.getConfiguration()

			await userSettings.update('workbench.colorTheme', randomTheme, true)

			vscode.window.showInformationMessage(`Тема изменена на ${randomTheme}`)
		}
	)

	context.subscriptions.push(disposable)
}

export function deactivate() {}
