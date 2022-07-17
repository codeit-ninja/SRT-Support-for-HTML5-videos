// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        emptyOutDir: false,
        target: 'esnext',
        rollupOptions: {
            output: {
                entryFileNames: 'main.[format].js'
            }
        },
        lib: {
            entry: 'browser.js',
            name: 'srt2vtt',
            // the proper extensions will be added
            fileName: 'main',
            formats: ['iife']
        }
    }
})