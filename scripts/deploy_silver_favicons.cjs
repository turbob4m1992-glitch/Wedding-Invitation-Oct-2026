const fs = require('fs');
const { execSync } = require('child_process');

// 1. Copy master SVG to public/favicon.svg
fs.copyFileSync('scripts/silver_thuluth_stamp_v2.svg', 'public/favicon.svg');
console.log('Updated public/favicon.svg');

// 2. Generate master PNG from the SVG at 1024x1024
execSync('qlmanage -t -s 1024 -o scripts/ public/favicon.svg');
execSync('mv scripts/favicon.svg.png scripts/master_silver_1024.png');

// 3. Generate Apple Touch Icon with soft luxury card background
const appleSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="106 98 800 800" width="800" height="800">
  <rect x="106" y="98" width="800" height="800" rx="160" fill="#fcf8f8" />
  <circle cx="506" cy="498" r="390" fill="#f6ecec" opacity="0.6" />
  <image href="data:image/png;base64,${fs.readFileSync('scripts/master_silver_1024.png').toString('base64')}" x="106" y="98" width="800" height="800" />
</svg>`;
fs.writeFileSync('scripts/apple_touch_silver.svg', appleSvg);
execSync('qlmanage -t -s 512 -o scripts/ scripts/apple_touch_silver.svg');
execSync('mv scripts/apple_touch_silver.svg.png scripts/apple_silver_512.png');

// 4. Downscale all sizes using sips
console.log('Generating PNG resolutions...');
execSync('sips -z 16 16 scripts/master_silver_1024.png --out public/favicon-16x16.png');
execSync('sips -z 32 32 scripts/master_silver_1024.png --out public/favicon-32x32.png');
execSync('sips -z 48 48 scripts/master_silver_1024.png --out scripts/favicon-48x48.png');
execSync('sips -z 180 180 scripts/apple_silver_512.png --out public/apple-touch-icon.png');
execSync('sips -z 192 192 scripts/master_silver_1024.png --out public/android-chrome-192x192.png');
execSync('sips -z 512 512 scripts/master_silver_1024.png --out public/android-chrome-512x512.png');

// 5. Generate multi-resolution ICO
console.log('Generating public/favicon.ico...');
execSync('magick public/favicon-16x16.png public/favicon-32x32.png scripts/favicon-48x48.png public/favicon.ico');

console.log('All silver / white gold favicon assets created successfully!');
