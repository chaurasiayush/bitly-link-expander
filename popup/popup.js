document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tokenForm');
    const tokenInput = document.getElementById('bitlyAccessToken');
    const statusMessage = document.getElementById('statusMessage');
    const deleteTokenBtn = document.getElementById('deleteTokenBtn');

    // Load existing token if available
    chrome.storage.local.get(['bitlyAccessToken'], function(result) {
        if (result.bitlyAccessToken) {
            tokenInput.value = result.bitlyAccessToken;
        }
    });

    // Handle form submission to save or update the token
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const token = tokenInput.value;

        // Save or update the token
        chrome.storage.local.set({ bitlyAccessToken: token }, function() {
            statusMessage.textContent = 'Token saved successfully!';
            setTimeout(() => statusMessage.textContent = '', 3000); // Clear the message after 3 seconds
        });
    });

    // Handle token deletion
    deleteTokenBtn.addEventListener('click', function() {
        chrome.storage.local.remove('bitlyAccessToken', function() {
            tokenInput.value = ''; // Clear the input field
            statusMessage.textContent = 'Token deleted successfully!';
            setTimeout(() => statusMessage.textContent = '', 3000); // Clear the message after 3 seconds
        });
    });
});
