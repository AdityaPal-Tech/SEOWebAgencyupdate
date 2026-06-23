const sharp = require('sharp');
const path = require('path');

const width = 1200;
const height = 630;

// SVG overlay with branding text
const svgOverlay = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)" />

  <!-- Grid pattern overlay -->
  <g opacity="0.08">
    <line x1="0" y1="157.5" x2="${width}" y2="157.5" stroke="white" stroke-width="1" />
    <line x1="0" y1="315" x2="${width}" y2="315" stroke="white" stroke-width="1" />
    <line x1="0" y1="472.5" x2="${width}" y2="472.5" stroke="white" stroke-width="1" />
    <line x1="300" y1="0" x2="300" y2="${height}" stroke="white" stroke-width="1" />
    <line x1="600" y1="0" x2="600" y2="${height}" stroke="white" stroke-width="1" />
    <line x1="900" y1="0" x2="900" y2="${height}" stroke="white" stroke-width="1" />
  </g>

  <!-- Accent glow -->
  <ellipse cx="1000" cy="100" rx="400" ry="300" fill="url(#accent)" />

  <!-- Main text -->
  <text x="80" y="220" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="900" fill="white" letter-spacing="-1">
    SEOWebAgency
  </text>
  <text x="80" y="290" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="rgba(255,255,255,0.85)" letter-spacing="0">
    AI-Powered SEO &amp; Digital Growth
  </text>

  <!-- Tagline -->
  <text x="80" y="370" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="500" fill="rgba(255,255,255,0.7)" letter-spacing="0.5">
    Websites  ·  SEO  ·  AI Automation  ·  Lead Generation
  </text>

  <!-- Location badge -->
  <rect x="80" y="420" width="260" height="40" rx="20" fill="rgba(255,255,255,0.15)" />
  <text x="95" y="447" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="rgba(255,255,255,0.9)">
    Meerut, Uttar Pradesh, India
  </text>

  <!-- Bottom bar accent -->
  <rect x="0" y="580" width="${width}" height="5" fill="rgba(6,182,212,0.5)" />
</svg>
`;

async function generate() {
  try {
    // Create a base gradient image
    const baseImage = sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 99, g: 102, b: 241, alpha: 1 },
      },
    });

    // Composite SVG overlay on top
    const svgBuffer = Buffer.from(svgOverlay);
    const outputPath = path.join(process.cwd(), 'public', 'og-image.png');

    await baseImage
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`OG image generated: ${outputPath}`);
  } catch (err) {
    console.error('Error generating OG image:', err);
    process.exit(1);
  }
}

generate();
