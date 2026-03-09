import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/test/**",
    "tests/**",
    "vitest.config.ts",
  ]),
  {
    files: ['**/NDADocument.tsx', '**/ErrorBoundary.tsx'],
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['tests/**/*.ts', 'tests/**/*.tsx', 'src/test/**/*.ts', 'src/test/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]);

export default eslintConfig;
