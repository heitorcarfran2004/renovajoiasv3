const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Minify HTML (Simple safe minification)
// Remove whitespaces between tags, but keep content spaces.
// Be careful with <pre> or similar, but this is a landing page.
// We will simply collapse multiple spaces to one in text nodes if possible, but safer to just
// remove newlines and extra spaces between tags.
// Note: Next.js output is already compact.
// We will focus on the structure first.

// 2. Add loading="lazy" and decoding="async" to images
// Regex to find img tags
content = content.replace(/<img\s+([^>]+)>/gi, (match, attributes) => {
    // Check if loading or decoding attributes exist
    let newAttributes = attributes;

    if (!/loading=['"]/.test(attributes)) {
        newAttributes += ' loading="lazy"';
    }
    if (!/decoding=['"]/.test(attributes)) {
        newAttributes += ' decoding="async"';
    }

    return `<img ${newAttributes}>`;
});

// 3. Optimize Scripts
// Ensure external scripts have async or defer (except known critical ones if any)
// The user scripts (UTMify) already have them.
// Next.js scripts have 'async'.

// 4. Preloading Fonts is already there.

// 5. Minify content
// Remove comments that are not Next.js hydration comments (<!--$--> etc) or license comments?
// Actually, safe to just remove newlines/tabs added by formatting tools.
// The file I read had newlines added by 'view_file' tool for existing content? No, view_file adds numbering.
// The previous writes added some formatting. 
// Let's simple collapse whitespace > 1 to 1 space.

// content = content.replace(/\s+/g, ' '); // Too aggressive, destroys text content spacing.

// Let's remove newlines between tags: >\s+< -> ><
content = content.replace(/>\s+</g, '><');

// 6. Compress assets?
// We can't compress the files here as they are treated as static.
// But we ensures index.html is lighter.

// 7. Fix any duplicate or unnecessary preloads if found (clean up).
// I noticed multiple dns-prefetch in previous output, looks fine.

// Write back
fs.writeFileSync(indexPath, content, 'utf8');
console.log('Optimized index.html with lazy loading and minification.');
