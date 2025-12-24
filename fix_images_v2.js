const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// Regex for srcSet (case insensitive)
// We want to remove the whole attribute srcSet="..."
const srcSetRegex = /srcSet="[^"]*"/gi;

content = content.replace(srcSetRegex, '');

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Removed srcSet attributes from index.html');
