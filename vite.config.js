import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        govEmp: resolve(__dirname, "gov-emp.html"),
        civilServant: resolve(__dirname, 'civil-servant.html'),
        comingSoon: resolve(__dirname, "coming-soon.html"),
      },
    },
  },
})
