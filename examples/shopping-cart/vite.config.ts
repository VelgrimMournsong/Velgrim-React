import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['@velgrim/core', '@velgrim/rxjs']
    },
    resolve: {
        dedupe: ['react', 'react-dom']
    },
    server: {
        host: '127.0.0.1',
        port: 3000
    },
    preview: {
        host: '127.0.0.1',
        port: 4173
    }
});
