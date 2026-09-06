const fs = require('fs');
const { execSync } = require('child_process');
const opentype = require('opentype.js');

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

// In 1024x1024:
// Inner bed center: (502, 575)
// Target positions:
// Left 'م' (Malak): targetCenterX = 390, targetCenterY = 585, height = 185
// Right 'ي' (Yousef): targetCenterX = 615, targetCenterY = 575, height = 175
const dM = transformNormal(pM, 390, 585, 185);
const dY = transformNormal(pY, 615, 575, 175);

// Read seal cutout as base64
const imgBase64 = fs.readFileSync('scripts/seal_circle_cutout.png').toString('base64');

function makeComposite(withDivider, filename) {
  const dividerSvg = withDivider ? `
    <!-- Center hairline divider with diamond finial -->
    <rect x="500" y="445" width="4" height="250" rx="2" fill="url(#goldSurface)" filter="url(#goldShadow)" />
    <!-- Diamond finials -->
    <path d="M502 418 L512 432 L502 446 L492 432 Z" fill="url(#goldSurface)" filter="url(#goldShadow)" />
    <path d="M502 696 L512 710 L502 724 L492 710 Z" fill="url(#goldSurface)" filter="url(#goldShadow)" />
  ` : '';

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <defs>
    <!-- Gold gradient matching tiara and ornate border -->
    <linearGradient id="goldSurface" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#fffce8" />
      <stop offset="25%" stop-color="#fae7b5" />
      <stop offset="55%" stop-color="#dfb25f" />
      <stop offset="85%" stop-color="#be8933" />
      <stop offset="100%" stop-color="#915f18" />
    </linearGradient>

    <!-- Bevel rim stroke gradient -->
    <linearGradient id="goldRim" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#ffe8a8" />
      <stop offset="40%" stop-color="#a87424" />
      <stop offset="100%" stop-color="#5a3308" />
    </linearGradient>

    <!-- Drop shadow filter for embossed gold -->
    <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#24070c" flood-opacity="0.8" />
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#140205" flood-opacity="0.6" />
    </filter>

    <!-- Highlight stroke filter -->
    <linearGradient id="specularLight" x1="25%" y1="15%" x2="75%" y2="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
      <stop offset="40%" stop-color="#fffbee" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#734208" stop-opacity="0.6" />
    </linearGradient>
  </defs>

  <!-- 1. The original gorgeous wax seal stamp -->
  <image href="data:image/png;base64,${imgBase64}" x="0" y="0" width="1024" height="1024" />

  ${dividerSvg}

  <!-- 2. Separated Arabic letters in embossed 3D gold -->
  <g filter="url(#goldShadow)">
    <!-- Base letter fills with darker gold edge bevel -->
    <path d="${dM}" fill="url(#goldSurface)" stroke="url(#goldRim)" stroke-width="5" stroke-linejoin="round" />
    <path d="${dY}" fill="url(#goldSurface)" stroke="url(#goldRim)" stroke-width="5" stroke-linejoin="round" />

    <!-- Inner highlight sheen -->
    <path d="${dM}" fill="none" stroke="url(#specularLight)" stroke-width="1.8" />
    <path d="${dY}" fill="none" stroke="url(#specularLight)" stroke-width="1.8" />
  </g>
</svg>`;

  fs.writeFileSync(filename, svg);
}

makeComposite(false, 'scripts/composite_no_divider.svg');
makeComposite(true, 'scripts/composite_with_divider.svg');

console.log('Rendering composites via WebKit...');
execSync('qlmanage -t -s 1024 -o scripts/ scripts/composite_no_divider.svg scripts/composite_with_divider.svg');
console.log('Done rendering!');
