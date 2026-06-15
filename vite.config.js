import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Se il repo GitHub si chiama diversamente, cambia 'ATL_Vehicle'
  base: process.env.GITHUB_ACTIONS ? '/ATL_Vehicle/' : '/',
})
