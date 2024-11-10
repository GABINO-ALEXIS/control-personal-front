/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      
      
      colors: {
        primario: '#014d6d',
        negro: '#000000',
        blanco: '#F8FAFC',
        gris: '#e4ecf3',
        secundario: 'e30038',
        foreground:'#014d6d'
      },
      backgroundColor: {
        blanco: '#F8FAFC',
        negro: '#1f2d52',
        primario: '#014d6d',
        secundario: 'e30038',
        gris: '#e4ecf3'
      },
      fontFamily: {
        primary: ['Poppins', 'Helvetica', 'sans-serif']
      },
      fontSize: {
        smallText: '14px'
      },
      boxShadow: {
        sombra: '0px 3px 7px rgba(47, 41, 153, .04), 0px 13px 13px rgba(108, 99, 255, .04), 0px 29px 18px rgba(108, 99, 255, .03), 0px -2px 5px rgba(47, 41, 153, .02), 0px -9px 9px rgba(108, 99, 255, .01), 0px -20px 12px rgba(108, 99, 255, .01);'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}