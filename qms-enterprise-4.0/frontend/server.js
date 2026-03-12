import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const port = Number(process.env.PORT || 5173);
const root = new URL('.', import.meta.url).pathname;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

http.createServer((req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url;
  const fullPath = join(root, path);
  const filePath = existsSync(fullPath) ? fullPath : join(root, 'index.html');
  const ext = extname(filePath);
  res.setHeader('Content-Type', mime[ext] || 'text/plain; charset=utf-8');
  res.end(readFileSync(filePath));
}).listen(port, () => {
  console.log(`QMS frontend running at http://localhost:${port}`);
});
