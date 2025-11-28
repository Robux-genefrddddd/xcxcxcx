export function BackgroundPlusPattern() {
  // SVG with "+" pattern, encoded as data URL
  const svgPattern = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text x='16' y='16' text-anchor='middle' dominant-baseline='central' fill='rgba(255,255,255,0.05)' font-size='11' font-family='system-ui, -apple-system, sans-serif' font-weight='400'>+</text></svg>`;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundColor: '#0c0c0c',
        backgroundImage: `url("${svgPattern}")`,
        backgroundSize: '32px 32px',
        backgroundPosition: '0 0',
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
