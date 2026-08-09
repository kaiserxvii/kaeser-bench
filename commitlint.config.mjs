export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [1, "always", 120],
    "footer-max-line-length": [1, "always", 120],
    "header-max-length": [2, "always", 100],
  },
  helpUrl: "https://github.com/kaiserxvii/kaeser-bench/blob/main/docs/commit-style.md",
};
