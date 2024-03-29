// vite.config.js
import { defineConfig } from 'vite'
import cleanup from 'rollup-plugin-cleanup';

export default defineConfig({
    build: {
        emptyOutDir: false,
        minify: false,
        target: 'esnext',
        rollupOptions: {
            output: {
                entryFileNames: 'source.[format].js'
            },
            plugins: [
                cleanup({
                    comments: 'all'
                })
            ]
        },
        lib: {
            entry: 'browser.js',
            name: 'srt2vtt',
            // the proper extensions will be added
            fileName: 'main',
            formats: ['es']
        }
    }
})