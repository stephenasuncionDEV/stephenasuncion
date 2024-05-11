/** @type {import("prettier").Config} */
const config = {
  singleQuote: false,
  tabWidth: 2,
  printWidth: 80,
  semi: true,
  trailingComma: "all",
  arrowParens: "always",
  htmlWhitespaceSensitivity: "ignore",
  plugins: ["prettier-plugin-tailwindcss"],
};

module.exports = config;
