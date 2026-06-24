/* global process */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const SFX_DIR = 'F:\\SFX & More\\Ocular Creative Collection';

function sfxMiddlewarePlugin() {
  return {
    name: 'sfx-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const requestUrl = req.url || '';
        if (!requestUrl.startsWith('/api/sfx-')) {
          next();
          return;
        }

        let url;
        try {
          url = new URL(requestUrl, 'http://localhost');
        } catch {
          next();
          return;
        }
        
        // Endpoint 1: Browse directories and files in local SFX library
        if (url.pathname === '/api/sfx-browse') {
          try {
            const relPath = url.searchParams.get('dir') || '';
            const targetDir = path.join(SFX_DIR, relPath);
            
            // Safety check: ensure targetDir stays within SFX_DIR
            if (!targetDir.startsWith(SFX_DIR)) {
              res.statusCode = 403;
              res.end('Access denied');
              return;
            }
            
            if (!fs.existsSync(targetDir)) {
              res.statusCode = 404;
              res.end('Directory not found');
              return;
            }
            
            const entries = fs.readdirSync(targetDir, { withFileTypes: true });
            const result = entries
              .map(entry => {
                const fullPath = path.join(targetDir, entry.name);
                return {
                  name: entry.name,
                  isDir: entry.isDirectory(),
                  size: entry.isFile() ? fs.statSync(fullPath).size : 0
                };
              })
              .filter(entry => entry.isDir || entry.name.endsWith('.wav') || entry.name.endsWith('.mp3'));
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (err) {
            res.statusCode = 500;
            res.end(String(err));
          }
          return;
        }

        // Endpoint 2: Stream audio file from local SFX library
        if (url.pathname === '/api/sfx-file') {
          try {
            const relPath = url.searchParams.get('file') || '';
            const targetFile = path.join(SFX_DIR, relPath);
            
            // Safety check: ensure targetFile stays within SFX_DIR
            if (!targetFile.startsWith(SFX_DIR)) {
              res.statusCode = 403;
              res.end('Access denied');
              return;
            }
            
            if (!fs.existsSync(targetFile) || !fs.statSync(targetFile).isFile()) {
              res.statusCode = 404;
              res.end('File not found');
              return;
            }
            
            const ext = path.extname(targetFile).toLowerCase();
            const contentType = ext === '.mp3' ? 'audio/mpeg' : 'audio/wav';
            res.setHeader('Content-Type', contentType);
            fs.createReadStream(targetFile).pipe(res);
          } catch (err) {
            res.statusCode = 500;
            res.end(String(err));
          }
          return;
        }

        // Endpoint 3: Copy audio file from local SFX library to project public directory
        if (url.pathname === '/api/sfx-copy') {
          try {
            const relPath = url.searchParams.get('file') || '';
            const targetFile = path.join(SFX_DIR, relPath);
            
            // Safety check: ensure targetFile stays within SFX_DIR
            if (!targetFile.startsWith(SFX_DIR)) {
              res.statusCode = 403;
              res.end('Access denied');
              return;
            }
            
            if (!fs.existsSync(targetFile) || !fs.statSync(targetFile).isFile()) {
              res.statusCode = 404;
              res.end('File not found');
              return;
            }
            
            // Determine project public sfx directory
            const destDir = path.join(process.cwd(), 'public', 'sfx');
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true });
            }
            
            const filename = path.basename(targetFile);
            const destFile = path.join(destDir, filename);
            fs.copyFileSync(targetFile, destFile);
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              url: `/sfx/${filename}`,
              name: filename
            }));
          } catch (err) {
            res.statusCode = 500;
            res.end(String(err));
          }
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), sfxMiddlewarePlugin()],
});
