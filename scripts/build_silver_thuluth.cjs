const fs = require('fs');
const { execSync } = require('child_process');
const opentype = require('opentype.js');

const thuluthBuf = fs.readFileSync('/System/Library/Fonts/Supplemental/Diwan Thuluth.ttf');
const thuluth = opentype.parse(thuluthBuf.buffer.slice(thuluthBuf.byteOffset, thuluthBuf.byteOffset + thuluthBuf.byteLength));

function getScaledPath(p, cx, cy, targetH) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let c of p.commands) {
    if (c.x !== undefined) { minX = Math.min(minX, c.x); maxX = Math.max(maxX, c.x); }
    if (c.y !== undefined) { minY = Math.min(minY, c.y); maxY = Math.max(maxY, c.y); }
  }
  const scale = targetH / (maxY - minY);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  let d = '';
  for (let c of p.commands) {
    if (c.type === 'M') d += `M${((c.x - midX)*scale + cx).toFixed(2)} ${((c.y - midY)*scale + cy).toFixed(2)}`;
    else if (c.type === 'L') d += `L${((c.x - midX)*scale + cx).toFixed(2)} ${((c.y - midY)*scale + cy).toFixed(2)}`;
    else if (c.type === 'Q') d += `Q${((c.x1 - midX)*scale + cx).toFixed(2)} ${((c.y1 - midY)*scale + cy).toFixed(2)} ${((c.x - midX)*scale + cx).toFixed(2)} ${((c.y - midY)*scale + cy).toFixed(2)}`;
    else if (c.type === 'C') d += `C${((c.x1 - midX)*scale + cx).toFixed(2)} ${((c.y1 - midY)*scale + cy).toFixed(2)} ${((c.x2 - midX)*scale + cx).toFixed(2)} ${((c.y2 - midY)*scale + cy).toFixed(2)} ${((c.x - midX)*scale + cx).toFixed(2)} ${((c.y - midY)*scale + cy).toFixed(2)}`;
    else if (c.type === 'Z') d += 'Z';
  }
  return d;
}

const pY = thuluth.getPath('ي', 0, 0, 100);
const pM = thuluth.getPath('م', 0, 0, 100);

// Optical placement in 1024x1024:
// Inner bed center is (502, 575)
// Right: 'ي' (Yousef) at cx = 625, cy = 565, height = 210
// Left: 'م' (Malak) at cx = 380, cy = 585, height = 230
const dY = getScaledPath(pY, 625, 565, 210);
const dM = getScaledPath(pM, 380, 585, 230);

// Base image: seal_silver_base.png
const imgBase64 = fs.readFileSync('scripts/seal_silver_base.png').toString('base64');

// Crop tightly to seal: [106, 98, 800, 800]
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="106 98 800 800" width="800" height="800">
  <defs>
    <!-- White Gold / Platinum / Brilliant Silver Gradient -->
    <linearGradient id="silverSurface" x1="15%" y1="10%" x2="85%" y2="90%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="22%" stop-color="#f2f5f8" />
      <stop offset="50%" stop-color="#dce3ea" />
      <stop offset="78%" stop-color="#b6c4d1" />
      <stop offset="100%" stop-color="#8fa3b5" />
    </linearGradient>

    <!-- Crisp metallic bevel rim stroke -->
    <linearGradient id="silverRim" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#d4dee8" />
      <stop offset="75%" stop-color="#6e8294" />
      <stop offset="100%" stop-color="#3b4d5c" />
    </linearGradient>

    <!-- Specular highlight edge along top-left -->
    <linearGradient id="silverSpecular" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#486581" stop-opacity="0.7" />
    </linearGradient>

    <!-- Embossed drop shadow into the wax -->
    <filter id="silverShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="3" dy="6" stdDeviation="5" flood-color="#24070c" flood-opacity="0.85" />
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#140205" flood-opacity="0.65" />
    </filter>

    <!-- Outer seal shadow -->
    <filter id="outerSealShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#3a0b12" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#180205" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Wax Seal with silver tiara & filigree border -->
  <g filter="url(#outerSealShadow)">
    <image href="data:image/png;base64,${imgBase64}" x="0" y="0" width="1024" height="1024" />
  </g>

  <!-- Separated Arabic calligraphy monogram in 3D embossed silver / white gold -->
  <g filter="url(#silverShadow)">
    <!-- Base letter fills with darker silver bevel rim -->
    <path d="${dM}" fill="url(#silverSurface)" stroke="url(#silverRim)" stroke-width="5.5" stroke-linejoin="round" />
    <path d="${dY}" fill="url(#silverSurface)" stroke="url(#silverRim)" stroke-width="5.5" stroke-linejoin="round" />

    <!-- Top-left specular gleam -->
    <path d="${dM}" fill="none" stroke="url(#silverSpecular)" stroke-width="1.8" />
    <path d="${dY}" fill="none" stroke="url(#silverSpecular)" stroke-width="1.8" />
  </g>
</svg>`;

fs.writeFileSync('scripts/silver_thuluth_stamp.svg', svg);
execSync('qlmanage -t -s 800 -o scripts/ scripts/silver_thuluth_stamp.svg');
console.log('Saved scripts/silver_thuluth_stamp.svg and PNG');
