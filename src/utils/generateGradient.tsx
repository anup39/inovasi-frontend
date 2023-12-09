function generateGradient(startColor, endColor, steps) {
  const start = parseInt(startColor.slice(1), 16);
  const end = parseInt(endColor.slice(1), 16);

  const r1 = (start >> 16) & 255,
    g1 = (start >> 8) & 255,
    b1 = start & 255;
  const r2 = (end >> 16) & 255,
    g2 = (end >> 8) & 255,
    b2 = end & 255;

  const gradient = [];
  for (let i = 0; i < steps; i++) {
    const r = Math.floor(r1 + (i * (r2 - r1)) / (steps - 1));
    const g = Math.floor(g1 + (i * (g2 - g1)) / (steps - 1));
    const b = Math.floor(b1 + (i * (b2 - b1)) / (steps - 1));
    const color = `#${((r << 16) | (g << 8) | b)
      .toString(16)
      .padStart(6, "0")}`;
    gradient.push(color);
  }
  return gradient;
}

export default generateGradient;
