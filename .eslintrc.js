module.exports = {
  extends: ["next", "prettier", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@next/next/no-img-element": "off",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  ignorePatterns: [
    "node_modules",
    "dist",
    ".next",
    "coverage",
    "cache",
    "next-env.d.ts",
    "analyze",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@next/next/no-img-element": "off",
  },
};
