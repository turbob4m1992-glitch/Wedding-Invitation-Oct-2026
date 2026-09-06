const fs = require('fs');
const { execSync } = require('child_process');
const opentype = require('opentype.js');

const fontList = [
  { name: 'Aref Ruqaa Bold', path: 'scripts/fonts/ArefRuqaa-Bold.ttf' },
  { name: 'El Messiri Bold', path: 'scripts/fonts/ElMessiri-Bold.ttf' },
  { name: 'Farisi', path: '/System/Library/Fonts/Supplemental/Farisi.ttf' },
  { name: 'Al Bayan Bold', path: '/System/Library/Fonts/Supplemental/AlBayan.ttc' },
  { name: 'Waseem', path: '/System/Library/Fonts/Supplemental/Waseem.ttc' },
  { name: 'Mishafi', path: '/System/Library/Fonts/Supplemental/Mishafi.ttf' }
];

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
    if (c.type === 'M') d += `M${((c.x - midX)*scale + cx).toFixed(1)} ${((c.y - midY)*scale + cy).toFixed(1)}`;
    else if (c.type === 'L') d += `L${((c.x - midX)*scale + cx).toFixed(1)} ${((c.y - midY)*scale + cy).toFixed(1)}`;
    else if (c.type === 'Q') d += `Q${((c.x1 - midX)*scale + cx).toFixed(1)} ${((c.y1 - midY)*scale + cy).toFixed(1)} ${((c.x - midX)*scale + cx).toFixed(1)} ${((c.y - midY)*scale + cy).toFixed(1)}`;
    else if (c.type === 'C') d += `C${((c.x1 - midX)*scale + cx).toFixed(1)} ${((c.y1 - midY)*scale + cy).toFixed(1)} ${((c.x2 - midX)*scale + cx).toFixed(1)} ${((c.y2 - midY)*scale + cy).toFixed(1)} ${((c.x - midX)*scale + cx).toFixed(1)} ${((c.y - midY)*scale + cy).toFixed(1)}`;
    else if (c.type === 'Z') d += 'Z';
  }
  return d;
}

let svgItems = '';
let row = 0;

for (let item of fontList) {
  try {
    const buf = fs.readFileSync(item.path);
    const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
    
    const pY = font.getPath('ي', 0, 0, 100);
    const pM = font.getPath('م', 0, 0, 100);

    const yCenter = 70 + row * 110;
    // Right is Y (Yousef) at x = 380, Left is M (Malak) at x = 260
    const dY = getScaledPath(pY, 380, yCenter, 70);
    const dM = getScaledPath(pM, 260, yCenter, 70);

    svgItems += `
      <g>
        <rect x="10" y="${yCenter - 45}" width="480" height="95" rx="8" fill="${row % 2 === 0 ? '#fdfbfb' : '#ffffff'}" stroke="#eee" />
        <text x="30" y="${yCenter + 6}" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#666">${item.name}</text>
        <path d="${dM}" fill="#833b43" />
        <path d="${dY}" fill="#833b43" />
      </g>
    `;
    row++;
  } catch (err) {
    console.error(`Error loading ${item.name}:`, err.message);
  }
}

const totalHeight = 80 + row * 110;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="${totalHeight}" viewBox="0 0 500 ${totalHeight}">
  <rect width="100%" height="100%" fill="#f4f0f0" />
  ${svgItems}
</svg>`;

fs.writeFileSync('scripts/font_sheet.svg', svg);
execSync('qlmanage -t -s 600 -o scripts/ scripts/font_sheet.svg');
console.log('Saved font sheet comparison');
