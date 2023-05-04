const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "!./node_modules"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                mono: ["var(--font-mono)", ...fontFamily.mono]
            }
        }
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#ed3b53",
                    secondary: "#13acf2",
                    accent: "#e9411a",
                    neutral: "#eaeaea",
                    "base-100": "#ffffff",
                    "base-200": "#ededed",
                    "base-300": "#dbdbdb",
                    "--rounded-box": "0.5rem",
                    "--rounded-btn": ".25rem"
                }
            },
            {
                dark: {
                    primary: "#ed3b53",
                    secondary: "#13acf2",
                    accent: "#e9411a",
                    neutral: "#1a1a1a",
                    "base-100": "#070707",
                    "base-200": "#151515",
                    "base-300": "#232323",
                    info: "#66c6ff",
                    success: "#87d039",
                    warning: "#e2d562",
                    error: "#ff6f6f",
                    "--rounded-box": "0.5rem",
                    "--rounded-btn": ".25rem"
                }
            }
        ]
    }
};
