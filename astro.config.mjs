import { defineConfig } from 'astro/config'

import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },

  server: {
    port: 4321,
    host: true,
  },

  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
})
