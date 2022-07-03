const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...fontFamily.sans],
                mono: ["Fira Code", ...fontFamily.mono]
            }
        }
    },
    plugins: [require("daisyui"), require("@tailwindcss/typography")],
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#66cc8a",
                    secondary: "#ea5234",
                    accent: "#223d30",
                    neutral: "#181a2a",
                    "base-100": "#ffffff",
                    "--rounded-box": "0.5rem",
                    "--rounded-btn": ".25rem"
                }
            },
            {
                dark: {
                    primary: "#7dd3fc",
                    secondary: "#ed3b53",
                    accent: "#13acf2",
                    neutral: "#171618",
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
