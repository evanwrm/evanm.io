module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {}
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    primary: "#4b6bfb",
                    secondary: "#7b92b2",
                    accent: "#67cba0",
                    neutral: "#181a2a",
                    "base-100": "#ffffff",
                    "--rounded-box": "0.25rem",
                    "--rounded-btn": ".125rem",
                    "--rounded-badge": ".125rem"
                }
            },
            {
                dark: {
                    primary: "#7dd3fc",
                    secondary: "#ed3b53",
                    accent: "#ede40c",
                    neutral: "#171618",
                    "base-100": "#171717",
                    info: "#66c6ff",
                    success: "#87d039",
                    warning: "#e2d562",
                    error: "#ff6f6f",
                    "--rounded-box": "0.25rem",
                    "--rounded-btn": ".125rem",
                    "--rounded-badge": ".125rem"
                }
            }
        ]
    }
};
