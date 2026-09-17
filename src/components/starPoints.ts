/** Points of an eight-pointed star (khatam), as a 16-vertex polygon. */
export const starPoints = (cx: number, cy: number, outer: number, inner = outer * 0.62) =>
  Array.from({ length: 16 }, (_, i) => {
    const a = ((i * 22.5 - 90) * Math.PI) / 180;
    const r = i % 2 ? inner : outer;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
