module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    // Add under other rules
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ["prettier"],
  rules: {
    "no-tabs": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,

    "linebreak-style": ["error", "unix"],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-absolute-path": "off",
    "no-async-promise-executor": "off",
    "import/no-extraneous-dependencies": "off",
    "vue/multi-word-component-names": 0,
    // "vue/no-multiple-template-root": "off",
    // "vue/html-self-closing": "off",
    "vue/no-v-html": 0,
    "no-console": "off",
    "no-plusplus": "off",
    "no-useless-escape": "off",
    "no-bitwise": "off",
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/ban-ts-comment": ["off"],
    // "vue/no-setup-props-destructure": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    //can config to 2 if need more then required
    "@typescript-eslint/no-unused-vars": [0],
    "no-param-reassign": ["off"],
    "vue/valid-v-slot": [
      "error",
      {
        allowModifiers: true,
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "lf",
      },
    ],
  },
};
