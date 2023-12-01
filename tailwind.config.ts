import type { Config } from 'tailwindcss'
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'aboutComic-bg': "url('/img/background/BG.svg')",
      },
      backgroundColor: {
        'swiper-bullet-active': '#ff639b',
      },
      scale: {
        'typeComic': '1.015',
      },
      opacity: {
        '60': '0.6',
        '70': '0.7',
        '85': '0.85',
      },
      screens: {
        'xs': '340px',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes : {
        light: {
          layout: {},
          colors: {
            default: {
              DEFAULT: "#D9D9D9",
              foreground: "#000000",
            },
            primary: {
              DEFAULT: "#FF639B",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#FC274A",
              foreground: "#FFFFFF",
            },
            focus: "#FF639B"
          },
        },
        dark: {
          layout: {},
          colors: {
            default: {
              DEFAULT: "#4A4A4A",
              foreground: "#FFFFFF",
            },
            primary: {
              DEFAULT: "#FF639B",
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#FC274A",
              foreground: "#FFFFFF",
            },
            focus: "#FF639B"
          }
        },
      }
    })
  ],
}
export default config
