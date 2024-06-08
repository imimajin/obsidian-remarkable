import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, normalizePath } from 'obsidian';
import * as fs from 'fs';
import { exec } from 'child_process';

interface RemarkablePluginSettings {
	remarkableDir: string;
}

const DEFAULT_SETTINGS: RemarkablePluginSettings = {
	remarkableDir: `${process.env.HOME}/Documents/Remarkable`
}

export default class ObsidianToRemarkablePlugin extends Plugin {
	settings: RemarkablePluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Obsidian to Remarkable', (evt: MouseEvent) => {
			new Notice('Obsidian to Remarkable plugin activated!');
		});
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Obsidian to Remarkable');

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new RemarkableSettingTab(this.app, this));

		// Start watching the directory
		this.startWatching();
	}

	onunload() {
		// Add any cleanup logic here
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	startWatching() {
		const remarkableDir = this.settings.remarkableDir;

		fs.watch(remarkableDir, (eventType, filename) => {
			if (filename && eventType === 'change') {
				const filePath = `${remarkableDir}/${filename}`;
				this.handleFileChange(filePath);
			}
		});

		new Notice(`Watching directory: ${remarkableDir}`);
	}

	handleFileChange(filePath: string) {
		if (fs.existsSync(filePath)) {
			const ext = filePath.split('.').pop();
			if (ext === 'md') {
				this.convertMarkdownToPDF(filePath);
			} else if (ext === 'pdf') {
				this.uploadPDF(filePath);
			}
		} else {
			new Notice(`File ${filePath} does not exist, skipping.`);
		}
	}

	convertMarkdownToPDF(filePath: string) {
		const pdfFile = filePath.replace('.md', '.pdf');
		exec(`pandoc "${filePath}" -o "${pdfFile}"`, (error, stdout, stderr) => {
			if (error) {
				new Notice(`Failed to convert ${filePath} to PDF: ${stderr}`);
				return;
			}
			new Notice(`Converted ${filePath} to ${pdfFile}`);
			this.uploadPDF(pdfFile);
		});
	}

	uploadPDF(pdfFile: string) {
		exec(`rmapi put "${pdfFile}"`, (error, stdout, stderr) => {
			if (error) {
				new Notice(`Failed to upload ${pdfFile} to Remarkable: ${stderr}`);
				return;
			}
			new Notice(`Successfully uploaded ${pdfFile} to Remarkable`);
			fs.unlinkSync(pdfFile);
		});
	}
}

class RemarkableSettingTab extends PluginSettingTab {
	plugin: ObsidianToRemarkablePlugin;

	constructor(app: App, plugin: ObsidianToRemarkablePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Remarkable Directory')
			.setDesc('The directory to watch for Markdown and PDF files to upload to Remarkable')
			.addText(text => text
				.setPlaceholder('Enter directory path')
				.setValue(this.plugin.settings.remarkableDir)
				.onChange(async (value) => {
					this.plugin.settings.remarkableDir = normalizePath(value);
					await this.plugin.saveSettings();
				}));
	}
}
