const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const scriptsToInject = `
<script
  src="https://cdn.utmify.com.br/scripts/utms/latest.js"
  data-utmify-prevent-xcod-sck
  data-utmify-prevent-subids
  async
  defer
></script>
 
<script>
  window.pixelId = "694bb5509fe8acc7fc000d00";
  var a = document.createElement("script");
  a.setAttribute("async", "");
  a.setAttribute("defer", "");
  a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
  document.head.appendChild(a);
</script>
 
<script>!function(i,n){i._plt=i._plt||(n&&n.timeOrigin?n.timeOrigin+n.now():Date.now())}(window,performance);</script>
<link rel="preload" href="https://scripts.converteai.net/bd33477a-b73d-43e1-b94d-c72778031794/players/694bb4e387bdd2a5aeacd155/v4/player.js" as="script">
<link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js" as="script">
<link rel="preload" href="https://cdn.converteai.net/bd33477a-b73d-43e1-b94d-c72778031794/694bb4de7fac75e58d23c5e9/main.m3u8" as="fetch">
<link rel="dns-prefetch" href="https://cdn.converteai.net">
<link rel="dns-prefetch" href="https://scripts.converteai.net">
<link rel="dns-prefetch" href="https://images.converteai.net">
<link rel="dns-prefetch" href="https://api.vturb.com.br">
`;

// Insert after <head>
content = content.replace('<head>', '<head>' + scriptsToInject);

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Injected tracking and optimization scripts into index.html');
