const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Regex to find img tags with src="/_next/image..."
// We need to capture the url parameter.
// Example: src="/_next/image?url=https%3A%2F%2Fi.imgur.com%2FzTwBkqM.png&amp;w=640&amp;q=75"

// Strategy: Replace the entire src attribute value.
// We will look for src="/_next/image?url=([^&"]+)[^"]*"

// Also remove srcset attribute as it might contain broken links too.
// srcset="/_next/image?url=... 1x, /_next/image?url=... 2x"

// Let's use a replacer function with regex.

// 1. Remove srcset attributes entirely for these images or globally if safe.
// Let's target specific images or just all img tags that look like next/image.

// Regex for src
const srcRegex = /src="\/_next\/image\?url=([^&"]+)(?:&amp;|&)[^"]*"/g;

content = content.replace(srcRegex, (match, encodedUrl) => {
    try {
        const decodedUrl = decodeURIComponent(encodedUrl);
        console.log(`Replacing ${match} with src="${decodedUrl}"`);
        return `src="${decodedUrl}"`;
    } catch (e) {
        console.error(`Failed to decode ${encodedUrl}`, e);
        return match;
    }
});

// Regex for srcset. We will just remove srcset if it contains /_next/image
const srcsetRegex = /srcset="\/_next\/image\?[^"]*"/g;
content = content.replace(srcsetRegex, '');

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Fixed images in index.html');
