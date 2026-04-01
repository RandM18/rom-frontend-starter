// stylelint.config.js
export default {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "color-no-invalid-hex": true,
    "font-family-no-duplicate-names": true,
    "block-no-empty": true,
    "selector-class-pattern": "^[a-z0-9\\-]+$",
  },
};
