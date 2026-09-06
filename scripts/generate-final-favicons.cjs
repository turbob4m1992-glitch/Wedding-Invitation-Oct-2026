const fs = require('fs');
const { execSync } = require('child_process');
const opentype = require('opentype.js');

console.log('Loading Amiri font...');
const amiriBuffer = fs.readFileSync('node_modules/@fontsource/amiri/files/amiri-arabic-700-normal.woff');
const font = opentype.parse(amiriBuffer.buffer.slice(amiriBuffer.byteOffset, amiriBuffer.byteOffset + amiriBuffer.byteLength));

const pY = font.getPath('ي', 0, 0, 100);
const pM = font.getPath('م', 0, 0, 100);

function transformNormal(pathObj, targetCenterX, targetCenterY, targetHeight) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let c of pathObj.commands) {
    if (c.x !== undefined) {
      minX = Math.min(minX, c.x);
      maxX = Math.max(maxX, c.x);
    }
    if (c.y !== undefined) {
      minY = Math.min(minY, c.y);
      maxY = Math.max(maxY, c.y);
    }
  }

  const currentHeight = maxY - minY;
  const scale = targetHeight / currentHeight;
  const currentCenterX = (minX + maxX) / 2;
  const currentCenterY = (minY + maxY) / 2;

  let d = '';
  for (let c of pathObj.commands) {
    if (c.type === 'M') {
      const x = ((c.x - currentCenterX) * scale + targetCenterX).toFixed(2);
      const y = ((c.y - currentCenterY) * scale + targetCenterY).toFixed(2);
      d += `M${x} ${y}`;
    } else if (c.type === 'L') {
      const x = ((c.x - currentCenterX) * scale + targetCenterX).toFixed(2);
      const y = ((c.y - currentCenterY) * scale + targetCenterY).toFixed(2);
      d += `L${x} ${y}`;
    } else if (c.type === 'Q') {
      const x1 = ((c.x1 - currentCenterX) * scale + targetCenterX).toFixed(2);
      const y1 = ((c.y1 - currentCenterY) * scale + targetCenterY).toFixed(2);
      const x = ((c.x - currentCenterX) * scale + targetCenterX).toFixed(2);
      const y = ((c.y - currentCenterY) * scale + targetCenterY).toFixed(2);
      d += `Q${x1} ${y1} ${x} ${y}`;
    } else if (c.type === 'C') {
      const x1 = ((c.x1 - currentCenterX) * scale + targetCenterX).toFixed(2);
      const y1 = ((c.y1 - currentCenterY) * scale + targetCenterY).toFixed(2);
      const x2 = ((c.x2 - currentCenterX) * scale + targetCenterX).toFixed(2);
      const y2 = ((c.y2 - currentCenterY) * scale + targetCenterY).toFixed(2);
      const x = ((c.x - currentCenterX) * scale + targetCenterX).toFixed(2);
      const y = ((c.y - currentCenterY) * scale + targetCenterY).toFixed(2);
      d += `C${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
    } else if (c.type === 'Z') {
      d += 'Z';
    }
  }
  return d;
}

// Optical alignment:
// Center is 256, 256.
// Meem (Malak) on left: center x=184, y=260, height=130
// Yaa (Yousef) on right: center x=328, y=252, height=122
const dM = transformNormal(pM, 184, 260, 130);
const dY = transformNormal(pY, 328, 252, 122);

function generateSVG({ includeBackground = false } = {}) {
  const bgElement = includeBackground
    ? `<rect width="512" height="512" rx="96" fill="#fcf8f8" />
       <circle cx="256" cy="256" r="248" fill="#f7ebeb" opacity="0.5" />`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Outer wax radial gradient with warm highlight at top-left -->
    <radialGradient id="waxBg" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#db7c85" />
      <stop offset="35%" stop-color="#b85963" />
      <stop offset="70%" stop-color="#8e3841" />
      <stop offset="100%" stop-color="#6a2027" />
    </radialGradient>

    <!-- Inner pressed wax bed -->
    <radialGradient id="waxBed" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#b1545e" />
      <stop offset="65%" stop-color="#8e353e" />
      <stop offset="100%" stop-color="#6c2128" />
    </radialGradient>

    <!-- Outer wax rim highlight/shadow -->
    <linearGradient id="rimLight" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#ffeacc" stop-opacity="0.55" />
      <stop offset="40%" stop-color="#fff5ea" stop-opacity="0.1" />
      <stop offset="70%" stop-color="#000000" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.5" />
    </linearGradient>

    <!-- Debossed inner step shadow -->
    <linearGradient id="bedShadow" x1="25%" y1="15%" x2="75%" y2="85%">
      <stop offset="0%" stop-color="#3a0e13" stop-opacity="0.75" />
      <stop offset="50%" stop-color="#3a0e13" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#fbb4bc" stop-opacity="0.35" />
    </linearGradient>

    <!-- Monogram royal champagne gold gradient -->
    <linearGradient id="monogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fffbee" />
      <stop offset="25%" stop-color="#fae5c3" />
      <stop offset="65%" stop-color="#e4ba85" />
      <stop offset="100%" stop-color="#c89659" />
    </linearGradient>

    <!-- Monogram drop/press shadow -->
    <filter id="monogramShadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="2" dy="3" stdDeviation="1.5" flood-color="#380b10" flood-opacity="0.75" />
    </filter>

    <!-- Seal base drop shadow -->
    <filter id="sealShadow" x="-15%" y="-15%" width="130%" height="135%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#3a0c11" flood-opacity="0.42" />
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#180205" flood-opacity="0.3" />
    </filter>
  </defs>

  ${bgElement}

  <!-- Base wax seal drop shadow & outer disc -->
  <circle cx="256" cy="248" r="232" fill="url(#waxBg)" filter="url(#sealShadow)" />

  <!-- Outer rim bevel & highlight -->
  <circle cx="256" cy="248" r="230" fill="none" stroke="url(#rimLight)" stroke-width="4.5" />

  <!-- Wax puddle edge lip (subtle pressed wax ridge) -->
  <circle cx="256" cy="248" r="212" fill="none" stroke="#52171d" stroke-width="3" opacity="0.5" />
  <circle cx="256" cy="250" r="210" fill="none" stroke="#f8b4bc" stroke-width="1.8" opacity="0.3" />

  <!-- Inner debossed seal bed -->
  <circle cx="256" cy="252" r="202" fill="url(#waxBed)" />
  <circle cx="256" cy="252" r="202" fill="none" stroke="url(#bedShadow)" stroke-width="4" />

  <!-- Monogram Art with debossed shadow + raised face -->
  <g filter="url(#monogramShadow)">
    <!-- Double concentric rings -->
    <circle cx="256" cy="252" r="176" fill="none" stroke="url(#monogramGrad)" stroke-width="8.5" />
    <circle cx="256" cy="252" r="154" fill="none" stroke="url(#monogramGrad)" stroke-width="3.8" opacity="0.85" />

    <!-- Vertical Diamond finials -->
    <path d="M256 124 L267 138 L256 152 L245 138 Z" fill="url(#monogramGrad)" />
    <path d="M256 352 L267 366 L256 380 L245 366 Z" fill="url(#monogramGrad)" />

    <!-- Center hairline divider -->
    <rect x="254" y="166" width="4" height="172" rx="2" fill="url(#monogramGrad)" opacity="0.75" />

    <!-- The two initials: Meem (left) and Yaa (right) -->
    <path d="${dM}" fill="url(#monogramGrad)" />
    <path d="${dY}" fill="url(#monogramGrad)" />
  </g>

  <!-- Top-left sheen/reflection on the seal face -->
  <ellipse cx="210" cy="150" rx="135" ry="65" transform="rotate(-25 210 150)" fill="#ffffff" opacity="0.09" pointer-events="none" />
</svg>`;
}

// 1. Write public/favicon.svg
const faviconSvg = generateSVG({ includeBackground: false });
fs.writeFileSync('public/favicon.svg', faviconSvg);
console.log('Saved public/favicon.svg');

// 2. Write temp SVG for apple touch icon with background
const appleSvg = generateSVG({ includeBackground: true });
fs.writeFileSync('scripts/apple-touch.svg', appleSvg);

// Render high-res PNGs with qlmanage (WebKit)
console.log('Rendering master PNGs via WebKit...');
execSync('qlmanage -t -s 512 -o scripts/ public/favicon.svg scripts/apple-touch.svg');
execSync('mv scripts/favicon.svg.png scripts/master-512.png');
execSync('mv scripts/apple-touch.svg.png scripts/apple-master-512.png');

// Resize into production assets using sips
console.log('Generating production PNG assets...');
execSync('sips -z 16 16 scripts/master-512.png --out public/favicon-16x16.png');
execSync('sips -z 32 32 scripts/master-512.png --out public/favicon-32x32.png');
execSync('sips -z 48 48 scripts/master-512.png --out scripts/favicon-48x48.png');
execSync('sips -z 180 180 scripts/apple-master-512.png --out public/apple-touch-icon.png');
execSync('sips -z 192 192 scripts/master-512.png --out public/android-chrome-192x192.png');
execSync('sips -z 512 512 scripts/master-512.png --out public/android-chrome-512x512.png');

// Generate multi-resolution ICO (16, 32, 48)
console.log('Generating public/favicon.ico...');
execSync('magick public/favicon-16x16.png public/favicon-32x32.png scripts/favicon-48x48.png public/favicon.ico');

// Generate public/site.webmanifest
const manifest = {
  name: 'يوسف و مَلَك | دعوة زفاف',
  short_name: 'يوسف & مَلَك',
  description: 'دعوة زفاف يوسف و مَلَك | 9 أكتوبر 2026',
  start_url: '/',
  display: 'standalone',
  background_color: '#fcf8f8',
  theme_color: '#9c4a52',
  icons: [
    {
      src: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png'
    },
    {
      src: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png'
    },
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};

fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2) + '\n');
console.log('Saved public/site.webmanifest');

console.log('All favicon assets generated successfully!');
