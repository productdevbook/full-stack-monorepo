module.exports = {
  settings: {
    next: {
      rootDir: ["apps/api/*/"],
    },
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin", "import", "prettier"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": 0,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    "require-await": "off",
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "import/no-cycle": 0,
  },
};
