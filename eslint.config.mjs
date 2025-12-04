// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

// export default eslintConfig;
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules override
  {
    rules: {
      // Allow 'any'
      "@typescript-eslint/no-explicit-any": "off",

      // Allow unused variables
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Optional:
      // Disable unused imports rule (if you want)
      "unused-imports/no-unused-imports": "off",
    },
  },
];
