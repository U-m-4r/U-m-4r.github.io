const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation for PNG
function crc32(buf) {
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makePngChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const toCrc = buf.slice(4, 8 + len);
  buf.writeUInt32BE(crc32(toCrc), 8 + len);
  return buf;
}

function createPng(width, height, getPixel) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  const ihdrChunk = makePngChunk('IHDR', ihdr);

  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row.writeUInt8(0, 0); // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y);
      const px = 1 + x * 4;
      row.writeUInt8(r, px);
      row.writeUInt8(g, px + 1);
      row.writeUInt8(b, px + 2);
      row.writeUInt8(a, px + 3);
    }
    rawRows.push(row);
  }
  const idatData = zlib.deflateSync(Buffer.concat(rawRows));
  const idatChunk = makePngChunk('IDAT', idatData);
  const iendChunk = makePngChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

// Windows XP arrow pointer (32x32, hotspot 0,0)
const ARROW_ROWS = [
  "B                               ",
  "BB                              ",
  "BWB                             ",
  "BWWB                            ",
  "BWWWB                           ",
  "BWWWWB                          ",
  "BWWWWWB                         ",
  "BWWWWWWB                        ",
  "BWWWWWWWB                       ",
  "BWWWWWWWWB                      ",
  "BWWWWWBBBBB                     ",
  "BWWBWWB                         ",
  "BWB BWWB                        ",
  "BB  BWWB                        ",
  "B    BWWB                       ",
  "     BWWB                       ",
  "      BWWB                      ",
  "      BWWB                      ",
  "       BB                       ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                "
];

// Windows XP hand pointer (32x32, hotspot 6,0)
const HAND_ROWS = [
  "     BBBB                       ",
  "     BWWB                       ",
  "     BWWB                       ",
  "     BWWB                       ",
  "     BWWB                       ",
  "     BWWBBBBB                   ",
  "     BWWBWWBBBB                 ",
  "     BWWBWWBWWBBBB              ",
  "     BWWBWWBWWBWWB              ",
  "     BWWBWWBWWBWWB              ",
  "     BWWBWWBWWBWWB              ",
  "     BWWWWWWWWWWWB              ",
  "BBBB BWWWWWWWWWWWB              ",
  "BWWWBBWWWWWWWWWWWB              ",
  "BWWWWBWWWWWWWWWWWB              ",
  "BBWWWWWWWWWWWWWWWB              ",
  " BBWWWWWWWWWWWWWWB              ",
  "  BWWWWWWWWWWWWWWB              ",
  "   BWWWWWWWWWWWWWB              ",
  "   BBWWWWWWWWWWWBB              ",
  "    BBWWWWWWWWWWB               ",
  "     BBWWWWWWWWB                ",
  "      BBWWWWWBB                 ",
  "        BBBBBB                  ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                ",
  "                                "
];

function getArrowPixel(x, y) {
  const ch = (ARROW_ROWS[y] && ARROW_ROWS[y][x]) || ' ';
  if (ch === 'B') return [0, 0, 0, 255]; // Black border
  if (ch === 'W') return [255, 255, 255, 255]; // White fill
  return [0, 0, 0, 0]; // Transparent
}

function getHandPixel(x, y) {
  const ch = (HAND_ROWS[y] && HAND_ROWS[y][x]) || ' ';
  if (ch === 'B') return [0, 0, 0, 255]; // Black border
  if (ch === 'W') return [255, 255, 255, 255]; // White fill
  return [0, 0, 0, 0]; // Transparent
}

const publicDir = path.resolve(__dirname, '..', 'public');

// 1. Generate Arrow cursor PNG
const arrowPng = createPng(32, 32, getArrowPixel);
fs.writeFileSync(path.join(publicDir, 'cursor-arrow.png'), arrowPng);
fs.writeFileSync(path.join(publicDir, 'cursor.png'), arrowPng);

// 2. Generate Hand cursor PNG
const handPng = createPng(32, 32, getHandPixel);
fs.writeFileSync(path.join(publicDir, 'cursor-pointer.png'), handPng);

console.log('Cursor assets created successfully in public directory!');
