// Decodes committed .b64 sidecar files into their real binary form at boot.
// Binary assets (PDFs) are stored in the repo as base64 text sidecars
// (foo.pdf.b64) because this project's git push path only reliably transports
// text content; the real binary files are regenerated here on every deploy.
const fs = require('fs');
const path = require('path');

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (entry.name.endsWith('.b64')) {
      out.push(full);
    }
  }
}

const publicDir = path.join(__dirname, '..', 'public');
const b64Files = [];
walk(publicDir, b64Files);

for (const b64Path of b64Files) {
  const outPath = b64Path.slice(0, -4); // strip ".b64"
  const encoded = fs.readFileSync(b64Path, 'utf8');
  const buffer = Buffer.from(encoded, 'base64');
  fs.writeFileSync(outPath, buffer);
  console.log(`Decoded ${path.relative(publicDir, b64Path)} -> ${path.relative(publicDir, outPath)} (${buffer.length} bytes)`);
}
