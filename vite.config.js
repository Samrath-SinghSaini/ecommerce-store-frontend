import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':'http://localhost:3000',
     
    '/images':'http://localhost:3000/images',
    '/api/products':'http://localhost:3000/api/products', 
    '/api/category':'http://localhost:3000/api/category', 
    '/api/home':'http://localhost:3000/api/home'
    }
  }, 
  root:'.', 
  build:{
    outDir:'public'
  }, 
  publicDir:'public'
})
