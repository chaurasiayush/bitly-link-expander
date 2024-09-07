let BITLY_ACCESS_TOKEN;
// Function to expand a Bitly link using the Bitly API
async function expandBitlyLink(shortUrl) {
    const apiUrl = 'https://api-ssl.bitly.com/v4/expand';

    try {
        // Send a request to the Bitly API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${BITLY_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "bitlink_id": shortUrl.replace('https://', '')  // Remove 'https://' for Bitly API
            })
        });

        const data = await response.json();

        if (response.ok) {
            return data.long_url;
        } else {
            console.error(`Error expanding ${shortUrl}:`, data);
            return shortUrl; // In case of error, keep the original short URL
        }
    } catch (error) {
        console.error(`Network error: Could not expand ${shortUrl}:`, error);
        return shortUrl; // Return original in case of error
    }
}

// Function to parse, expand, and replace all bit.ly links on the page
async function expandAndReplaceBitlyLinks() {
    // Get all anchor elements on the page
    const allLinks = document.querySelectorAll('a');

    // Filter out only the links that contain 'bit.ly'
    const bitlyLinks = Array.from(allLinks).filter(link => link.href.includes('bit.ly'));
    
    console.log(`found ${bitlyLinks.length} bitly links`);
    
    if (bitlyLinks.length > 0) {
        console.log(bitlyLinks);
        console.log('Expanding and replacing them now...');
        for (const link of bitlyLinks) {
            const bitlyUrl = link.href;
            const expandedUrl = await expandBitlyLink(bitlyUrl);

            // Replace the href of the link with the expanded URL
            link.href = expandedUrl;
        }
    } else {
        console.log('No bit.ly links found on this page.');
    }
}

chrome.storage.local.get(['bitlyAccessToken'], function(result) {
    BITLY_ACCESS_TOKEN = result.bitlyAccessToken;
    if(!BITLY_ACCESS_TOKEN) {
        console.error('Bitly Expander: Setup Bitly Access Token first');
        return;
    }
    console.log('Access token retrieved');
    setTimeout(expandAndReplaceBitlyLinks, 10000);
});

