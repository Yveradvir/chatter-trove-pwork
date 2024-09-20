import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

export default defineConfig({
    root: __dirname,
    cacheDir: "./node_modules/.vite/.",
    envDir: path.join(__dirname, ".."),

    server: {
        port: 4200,
        host: "localhost",
    },

    plugins: [react()],
    resolve: {
        alias: {
            "@core": path.resolve(__dirname, "src", "core"),
        },
    },

    build: {
        outDir: "./dist/frontend",
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
});