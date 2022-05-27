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
                    ...require("daisyui/src/colors/themes")["[data-theme=corporate]"]
                }
            },
            {
                dark: {
                    ...require("daisyui/src/colors/themes")["[data-theme=business]"]
                }
            }
        ]
    }
};
