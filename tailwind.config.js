/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0C294F", // Deep navy (primary)
          800: "#194072", // Dark blue
          700: "#2B6CB0", // Royal blue
          600: "#3182CE",
          100: "#EBF8FF",
          50: "#F7FAFC",
        },
        slate: {
          bg: "#EDF2F7",   // Light background
          text: "#0C294F", // Primary text
          muted: "#718096",// Secondary text
          border: "#CBD5E0"// Borders
        },
        gold: {
          500: "#C59B27",
          600: "#A8821C",
          100: "#FEFCF3"
        }
      },
      fontFamily: {
        sans: ["Inter", "Open Sans", "system-ui", "sans-serif"],
        serif: ["'Times New Roman'", "Times", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(12, 41, 79, 0.05), 0 1px 2px 0 rgba(12, 41, 79, 0.03)",
        card: "0 4px 6px -1px rgba(12, 41, 79, 0.07), 0 2px 4px -1px rgba(12, 41, 79, 0.04)",
        elevated: "0 10px 15px -3px rgba(12, 41, 79, 0.1), 0 4px 6px -2px rgba(12, 41, 79, 0.05)",
      }
    },
  },
  plugins: [],
};
