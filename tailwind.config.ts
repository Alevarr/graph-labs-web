import { colors, nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      minHeight: {
        "screen-without-navbar": "calc(100vh - 64px)",
      },
      colors: {
        "almost-white": "#f9f9f9",
      },
      boxShadow: {
        "ambient-white":
          "2px 2px 20px rgba(0, 0, 0, 0.1), -10px -10px 10px white",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              "50": "#f0fdf5",
              "100": "#dcfce8",
              "200": "#bbf7d1",
              "300": "#86efad",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803c",
              "800": "#166533",
              "900": "#14532b",
              DEFAULT: "#22c55e",
              foreground: "white",
            },
            secondary: {
              "50": "#fef2c0",
              "100": "#fbd976",
              "200": "#f7d794",
              "300": "#f5cc6c",
              "400": "#f4c05e",
              "500": "#f2b85c",
              "600": "#f1a75d",
              "700": "#ef9f5c",
              "800": "#ed964d",
              "900": "#e7944c",
              DEFAULT: "#f2b85c",
              foreground: "white",
            },
            // background: "white",
          },
        },
        dark: {
          colors: {
            primary: {
              "50": "#f0fdf5",
              "100": "#dcfce8",
              "200": "#bbf7d1",
              "300": "#86efad",
              "400": "#4ade80",
              "500": "#22c55e",
              "600": "#16a34a",
              "700": "#15803c",
              "800": "#166533",
              "900": "#14532b",
              DEFAULT: "#22c55e",
              foreground: "white",
            },
            secondary: {
              "50": "#fef2c0",
              "100": "#fbd976",
              "200": "#f7d794",
              "300": "#f5cc6c",
              "400": "#f4c05e",
              "500": "#f2b85c",
              "600": "#f1a75d",
              "700": "#ef9f5c",
              "800": "#ed964d",
              "900": "#e7944c",
              DEFAULT: "#f2b85c",
              foreground: "white",
            },
            // background: "white",
          },
        },
      },
      layout: {
        radius: {
          small: "6px", // rounded-small
          medium: "8px", // rounded-medium
          large: "10px", // rounded-large
        },
      },
    }),
  ],
};
