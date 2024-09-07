# Bitly Link Expander Chrome Extension

## Overview

The **Bitly Link Expander** Chrome extension automatically detects `bit.ly` shortened URLs on any webpage, expands them to their full-length URLs using the Bitly API, and replaces the shortened links with the expanded URLs. This helps users quickly see the full destination of shortened links without needing to click on them.

## Features

- **Automatic Expansion**: Automatically expands `bit.ly` links found on any webpage.
- **Link Replacement**: Replaces the shortened `bit.ly` URLs with their expanded versions in the page’s content.
- **Secure Token Storage**: Uses Chrome’s `storage.local` to securely store and manage the Bitly API access token.

## Prerequisites

- **Google Chrome**: The extension is designed for Google Chrome.
- **Bitly Account**: You need a Bitly account to obtain an API access token.

## Setup Instructions

### 1. Obtain Bitly API Access Token

1. **Sign up** for a Bitly account at [bitly.com](https://bitly.com/).
2. **Generate an API access token**:
   - Go to your [Bitly API settings](https://app.bitly.com/settings/api/) and create a new OAuth token.
   - Copy the token as you'll need it for the extension.

### 2. Clone the Repository

```bash
git clone https://github.com/
```

### 3. Load the Extension into Chrome

1. **Open Chrome** and go to `chrome://extensions/`.
2. **Enable Developer Mode** by toggling the switch in the top right corner.
3. **Click "Load unpacked"** and select the folder where you created your extension.
4. The extension will be loaded, and the script will run on every page load.
5. Run this script once to store your `ACCESS_TOKEN` in browser's `storage.local`.

```javascript
chrome.storage.local.set({ bitlyAccessToken: 'YOUR_ACCESS_TOKEN' }, function() {
    console.log('Access token stored securely.');
});
```

## Usage

Once installed, the extension will automatically run on every webpage you visit. It will detect `bit.ly` links, expand them using the Bitly API, and replace the shortened URLs with their expanded counterparts.


## Troubleshooting

- **No Expansion:** Ensure that the API token is correctly set and valid. Check for any console errors in Chrome’s DevTools for debugging.
