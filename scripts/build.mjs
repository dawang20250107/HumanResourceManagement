import { cpSync, mkdirSync, copyFileSync } from 'node:fs';
mkdirSync('dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
cpSync('src', 'dist/src', { recursive: true });
console.log('Static product shell copied to dist/. Install Vite dependencies in a network-enabled environment for bundled output.');
