import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                "primary-dark": "var(--color-primary-dark)",
                background: "var(--color-background)",
                surface: "var(--color-surface)",
                "surface-hover": "var(--color-surface-hover)",
                border: "var(--color-border)",
            },
            fontFamily: {
                display: ["var(--font-display)", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "var(--radius)",
                lg: "calc(var(--radius) + 4px)",
                xl: "calc(var(--radius) + 8px)",
            },
        },
    },
    plugins: [],
};
export default config;