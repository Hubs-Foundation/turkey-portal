module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
  },
  plugins: ["react"],

  extends: ["plugin:react/recommended", "eslint:recommended"],

  settings: {
    react: {
      version: "detect",
    },
  },
};
