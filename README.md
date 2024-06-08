
# To Remarkable

This plugin automates the process of converting Markdown files to PDF and uploading them to a Remarkable tablet. This plugin uses [rmapi](https://github.com/juruen/rmapi) to interact with the Remarkable cloud.

## Requirements

- `pandoc`: for converting Markdown to PDF.
- `rmapi`: for uploading files to Remarkable.
- `inotify-tools`: for watching directory changes.

## Installation

1. **Install Dependencies**:
   ```sh
   sudo apt-get update
   sudo apt-get install pandoc inotify-tools
   ```

2. **Install `rmapi`**:
   Follow the instructions on the [rmapi GitHub page](https://github.com/juruen/rmapi) to install and configure `rmapi`.You need to run `rmapi` once to create the device and user token. Refer to the [rmapi tutorial](https://github.com/juruen/rmapi/blob/master/docs/tutorial-print-macosx.md#run-rmapi-for-first-time) for more details.

2. **Install the Plugin**:
   - You can install the plugin from the Obsidian community plugins section by searching for "To Remarkable".
   - Alternatively, copy the plugin files to your Obsidian plugins directory (`.obsidian/plugins/obsidian-remarkable`).

   ```sh
   mkdir -p ~/.obsidian/plugins/obsidian-remarkable
   cp -r path/to/your/plugin/files/* ~/.obsidian/plugins/obsidian-remarkable
   ```

3. **Enable the Plugin**:
   - Open Obsidian.
   - Go to `Settings` > `Community plugins`.
   - Disable `Safe mode`.
   - Enable the `To Remarkable` plugin.

## Usage

1. **Configure the Remarkable Directory**:
   - The default directory for watching is set to `~/Documents/Remarkable`.
   - You can change this directory in the plugin settings within Obsidian:
     - Open Obsidian.
     - Go to `Settings` > `To Remarkable`.
     - Set the "Remarkable Directory" to the directory you want to watch.

2. **Copy Files to the Watched Directory**:
   - Copy your Markdown (`.md`) or PDF (`.pdf`) files to the specified directory.
   - The plugin will automatically detect new or modified files, convert Markdown files to PDF, and upload all PDFs to your Remarkable device.
   - Files will be deleted from the directory after successful upload.

## License

This project is licensed under the MIT License.
