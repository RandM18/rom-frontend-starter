export default {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  rules: {
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "font-family-no-duplicate-names": true,
    "selector-class-pattern": "^[a-z0-9\\-]+$",
    "rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment", "first-nested"],
      },
    ],
  },
};
