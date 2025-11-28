export function BackgroundPlusPattern() {
  // Premium "+" pattern SVG with proper encoding and visibility
  const svgPattern = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><text x='20' y='20' text-anchor='middle' dominant-baseline='central' fill='rgba(255,255,255,0.07)' font-size='14'>+</text></svg>`;

  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{
        backgroundColor: '#0c0c0c',
        backgroundImage: `url("${svgPattern}")`,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
      }}
    />
  );
}
