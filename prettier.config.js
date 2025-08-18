/** @type {import("prettier").Config} */
const config = {
  singleQuote: false,
  tabWidth: 2,
  printWidth: 80,
  semi: true,
  trailingComma: "all",
  arrowParens: "always",
  htmlWhitespaceSensitivity: "ignore",
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-prisma",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: [
    "<THIRD_PARTY_TS_TYPES>",
    "<TS_TYPES>^[./]",
    "^@/types",
    "^next",
    "^react$",
    "^@/providers",
    "^@/hooks",
    "^./hooks",
    "^@/common",
    "<THIRD_PARTY_MODULES>",
    "^@/store",
    "^@/assets",
    "^@/components",
    "^[./]",
    ".*\\.(css|scss|sass)$",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
