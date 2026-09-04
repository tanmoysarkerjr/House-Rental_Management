import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 1. Import path
import Navbar from "./components/Navbar.jsx";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 2. Define '@' as a shortcut for the 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
});