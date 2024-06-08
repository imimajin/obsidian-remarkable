
# Obsidian to Remarkable

This plugin automates the process of converting Markdown files to PDF and uploading them to a Remarkable tablet.

## Installation

1. **Install Dependencies**:
   - Ensure you have `pandoc` and `rmapi` installed on your system.

   ### macOS
   - Install them using Homebrew:
     ```sh
     brew install pandoc
     brew install rmapi
     ```

   ### Linux
   - Install them using your package manager. For example, on Debian-based systems (like Ubuntu):
     ```sh
     sudo apt-get update
     sudo apt-get install pandoc
     ```
   - For `rmapi`, follow the instructions on the [rmapi GitHub page](https://github.com/juruen/rmapi) to install:
     ```sh
     sudo apt-get install golang-go
     go get github.com/juruen/rmapi
     ```

2. **Install the Plugin**:
   - Copy the plugin files to your Obsidian plugins directory (`.obsidian/plugins/obsidian-to-remarkable`).

   ```sh
   mkdir -p ~/.obsidian/plugins/obsidian-to-remarkable
   cp -r path/to/your/plugin/files/* ~/.obsidian/plugins/obsidian-to-remarkable/
   ```

3. **Enable the Plugin**:
   - Open Obsidian.
   - Go to `Settings` > `Community plugins`.
   - Disable `Safe mode`.
   - Enable the `Obsidian to Remarkable` plugin.

## Usage

1. **Configure the Remarkable Directory**:
   - The default directory for watching is set to `~/Documents/Remarkable`.
   - You can change this directory in the plugin settings within Obsidian:
     - Open Obsidian.
     - Go to `Settings` > `Obsidian to Remarkable Plugin`.
     - Set the "Remarkable Directory" to the directory you want to watch.

2. **Copy Files to the Watched Directory**:
   - Copy your Markdown (`.md`) or PDF (`.pdf`) files to the specified directory.
   - The plugin will automatically detect new or modified files, convert Markdown files to PDF, and upload all PDFs to your Remarkable device.
   - Files will be deleted from the directory after successful upload.

## License

This project is licensed under the MIT License.
