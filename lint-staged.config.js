// @ts-check
const { quote } = require("shell-quote");
const { ESLint } = require("eslint");

const eslint = new ESLint();
const isWin = process.platform === "win32";

const escape = str => quote(str).replace(/\\@/g, "@");
const escapeFilenames = filenames =>
    filenames.map(filename => `"${isWin ? filename : escape([filename])}"`);

const rules = {
    "**/*.{json,md,mdx,css,html,yml,yaml,scss}": filenames => {
        return [`prettier --write --with-node-modules ${escapeFilenames(filenames).join(" ")}`];
    },
    "**/*.{ts,js,tsx,jsx,mjs}": filenames => {
        return [
            `prettier --write --with-node-modules ${escapeFilenames(filenames).join(" ")}`,
            `eslint --no-ignore --max-warnings=0 ${escapeFilenames(filenames)
                .filter(file => !eslint.isPathIgnored(file))
                .join(" ")}`
        ];
    }
};

module.exports = rules;
