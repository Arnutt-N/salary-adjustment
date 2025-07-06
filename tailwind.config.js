/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html", // สแกนไฟล์ HTML ที่อยู่ใน root เช่น index.html
    "./src/**/*.{js,ts,jsx,tsx}", // สแกนไฟล์ JS ในโฟลเดอร์ src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
