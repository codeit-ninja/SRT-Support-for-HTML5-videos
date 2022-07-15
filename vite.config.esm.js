// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: '[name].[format].js'
            }
        },
        lib: {
            entry: 'main.js',
            name: 'SRT-Support-for-HTML5-videos',
            // the proper extensions will be added
            fileName: 'converter',
            formats: ['esm']
        }
    }
})