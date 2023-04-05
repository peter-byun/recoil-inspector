module.exports = {
  parserOptions: {
    sourceType: "module",
  },
  extends: ["turbo", "prettier", "prettier-plugin-sort-imports"],
  rules: {
    "react/jsx-key": "off",
  },
};
